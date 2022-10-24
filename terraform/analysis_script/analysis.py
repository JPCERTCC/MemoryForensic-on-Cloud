#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import sys
import git
import json
import time
import yara
import shutil
import hashlib
import datetime
import argparse
import subprocess


FPATH = os.path.dirname(os.path.abspath(__file__))
MAIN_DIR = os.path.join(FPATH, 'main')
YARA_DIR = os.path.join(FPATH, "yara_sig")
YARA_FILE = os.path.join(FPATH, "all.yara")

with open(os.path.join(FPATH, "template.html"), "r") as f:
    HTML_DATA = f.read()

with open(os.path.join(FPATH, "template.js"), "r") as f:
    JS_DATA = f.read()

with open(os.path.join(FPATH, "template.css"), "r") as f:
    CSS_DATA = f.read()

yara_repos = ["https://github.com/JPCERTCC/jpcert-yara.git",
              #"https://github.com/Neo23x0/signature-base.git",
              "https://github.com/volexity/threat-intel.git",
              "https://github.com/mandiant/red_team_tool_countermeasures.git",
              ]

memory_backet_name = os.environ['IMAGE_BACKET_NAME']
result_backet_name = os.environ['BACKET_NAME']
repo_name = os.environ['REPO_NAME']
region = os.environ['REGION']
api_gateway_url = os.environ['API_GATEWAY_URL']

parser = argparse.ArgumentParser(description="Analysis memory image using Volatility3.")
parser.add_argument(dest="file", action="store", type=str, metavar="FILE",
                    help="Memory dump file.")
parser.add_argument(dest="plugin", action="store", type=str, metavar="PLUGIN_NAME",
                    help="Set using plugin name. (if 'all', execute all plugins)")
parser.add_argument("-p", "--pid", dest="pid", action="store", type=str, metavar="PID",
                    help="Set the pid of dumpfile..")
args = parser.parse_args()

PLUGINS = ["windows.bigpools.BigPools",
           "windows.cachedump.Cachedump",
           "windows.callbacks.Callbacks",
           "windows.cmdline.CmdLine",
           "windows.driverirp.DriverIrp",
           "windows.driverscan.DriverScan",
           "windows.envars.Envars",
           "windows.filescan.FileScan",
           "windows.getservicesids.GetServiceSIDs",
           "windows.getsids.GetSIDs",
           #"windows.handles.Handles", # slow analysis
           "windows.hashdump.Hashdump",
           "windows.lsadump.Lsadump",
           #"windows.memmap.Memmap", # slow analysis
           "windows.modscan.ModScan",
           "windows.mutantscan.MutantScan",
           "windows.netscan.NetScan",
           "windows.netstat.NetStat",
           "windows.poolscanner.PoolScanner",
           "windows.privileges.Privs",
           "windows.pstree.PsTree",
           "windows.registry.certificates.Certificates", # bug?
           "windows.registry.hivelist.HiveList",
           "windows.registry.hivescan.HiveScan",
           #"windows.registry.userassist.UserAssist", # Set HIVE offset (--offset) from HiveScan
           "windows.skeleton_key_check.Skeleton_Key_Check",
           "windows.ssdt.SSDT",
           #"windows.strings.Strings", # Set pid (--pid)
           "windows.svcscan.SvcScan",
           "windows.symlinkscan.SymlinkScan",
           "windows.vadinfo.VadInfo",
           "windows.verinfo.VerInfo",
           "windows.virtmap.VirtMap",]

DUMP_PLUGINS = ["windows.pslist.PsList",
                "windows.psscan.PsScan",
                "windows.malfind.Malfind",
                "windows.modules.Modules",
                "windows.dlllist.DllList",]

def download_from_s3(filename):
    print("[+]{0} : download memory image".format(datetime.datetime.now()))
    subprocess.call('aws s3 cp s3://' + memory_backet_name + '/' + filename + ' /tmp/' + repo_name + '/ ', shell=True)

def yara_download():
    if os.path.exists(YARA_DIR) is True:
        shutil.rmtree(YARA_DIR)

    if os.path.exists(YARA_FILE) is True:
        os.remove(YARA_FILE)

    for i, yara_repo in enumerate(yara_repos):
        for j in range(1, 4):
            try:
                git.Repo.clone_from(yara_repo, os.path.join(YARA_DIR, str(i)))
                print("[+]{0} : download yara rule {1}".format(datetime.datetime.now(), yara_repo))
                break
            except git.GitCommandError as ex:
                print("[!]{0} :error:{1}: retry:{2}/3".format(datetime.datetime.now(), ex, j))
                time.sleep(10 * j)
                print("[+]{0} :retrying".format(datetime.datetime.now()))
            if j == 3:
                sys.exit("[!]{0} : Can't clone {1}".format(datetime.datetime.now(), yara_repo))

    with open(YARA_FILE, "a", encoding="utf-8") as f:
        for cur_dir, dirs, files in os.walk(YARA_DIR):
            for file in files:
                if (file.endswith(".yara") or file.endswith(".yar")) and not file.startswith("all-yara.yar"):
                    try:
                        yara.compile(os.path.abspath(os.path.join(cur_dir, file)))
                        with open(os.path.abspath(os.path.join(cur_dir, file)), "r") as fyara:
                            yara_data = fyara.read()
                        f.write(yara_data + "\n")
                    except:
                        print("[!]{0} : Can't load yara file {1}".format(datetime.datetime.now(), os.path.abspath(os.path.join(cur_dir, file))))

def get_hash(filename):
    hash = hashlib.sha256()

    with open(filename, 'rb') as f:
        while True:
            chunk = f.read(2048 * hash.block_size)
            if len(chunk) == 0:
                break

            hash.update(chunk)

    return hash.hexdigest()

def vol_analysis_plugin(filename, archive_path, plugin):
    print("[+]{0} : running analysis {1}".format(datetime.datetime.now(), plugin))
    subprocess.call("vol -r json -f " + filename + " --plugin-dirs /tmp/impfuzzy/impfuzzy_for_Volatility3 " + plugin + " > " + archive_path + "/" + plugin + ".json", shell=True)

def vol_analysis_yara(filename, archive_path):
    print("[+]{0} : running analysis yarascan.YaraScan".format(datetime.datetime.now()))
    subprocess.call("vol -r json -f " + filename + " yarascan.YaraScan --yara-file " + YARA_FILE + " > " + archive_path + "/yarascan.YaraScan.json", shell=True)

def vol_analysis_ps(filename, archive_path):
    for plugin in DUMP_PLUGINS:
        print("[+]{0} : running analysis {1}".format(datetime.datetime.now(), plugin))
        subprocess.call("vol -c config.json -r json " + plugin + " --dump > " + archive_path + "/" + plugin + ".json", shell=True)
    subprocess.call("mv *.dmp " + archive_path, shell=True)

def vol_analysis_timeline(filename, archive_path):
    print("[+]{0} : running analysis timeliner.Timeliner".format(datetime.datetime.now()))
    subprocess.call("vol -r json -f " + filename + " timeliner.Timeliner > " + archive_path + "/timeliner.Timeliner.json", shell=True)

def vol_analysis_printkey(filename, archive_path):
    print("[+]{0} : running analysis windows.registry.printkey.PrintKey".format(datetime.datetime.now()))
    with open(os.path.join(archive_path, "windows.registry.hivelist.HiveList.json"), "r") as f:
        json_load = json.load(f)
    for data in json_load:
        offset = "0x{:x}".format(data["Offset"])
        print("[+]{0} : running analysis windows.registry.printkey.PrintKey {1}".format(datetime.datetime.now(), offset))
        subprocess.call("vol -c config.json -r json windows.registry.printkey.PrintKey --offset=" + offset + " --recurse > " + archive_path + "/windows.registry.printkey.PrintKey." + offset + ".json", shell=True)

def vol_analysis(filename, archive_path):
    subprocess.call("vol --write-config -r json -f " + filename + " windows.info.Info > " + archive_path + "/windows.info.Info.json", shell=True)

    for plugin in PLUGINS:
        print("[+]{0} : running analysis {1}".format(datetime.datetime.now(), plugin))
        subprocess.call("vol -c config.json -r json " + plugin + " > " + archive_path + "/" + plugin + ".json", shell=True)

def vol_analysis_dumpfile(filename, archive_path, pid):
    print("[+]{0} : running analysis windows.dumpfiles.DumpFiles".format(datetime.datetime.now()))
    subprocess.call("vol -r json -f " + filename + " windows.dumpfiles.DumpFiles --pid " + pid, shell=True)
    subprocess.call("zip -e --password=infected " + archive_path + "/" + pid + ".zip file*", shell=True)

def main():
    download_from_s3(args.file)

    print("[+]{0} : Start analysis".format(datetime.datetime.now()))

    memfile = os.path.join(FPATH, args.file)
    if os.path.isfile(memfile):
        print("[+]{0} : Lode file {1}".format(datetime.datetime.now(), memfile))
    else:
        sys.exit("[!]{0} : Can't load file {1}".format(datetime.datetime.now(), memfile))

    id = get_hash(memfile)
    archive_path = os.path.join(MAIN_DIR, id)

    if os.path.exists(MAIN_DIR) is False:
        os.mkdir(MAIN_DIR)

    if os.path.exists(archive_path) is False:
        os.mkdir(archive_path)
        print("[+]{0} : Created directory {1}".format(datetime.datetime.now(), archive_path))

    if args.plugin in "all":
        yara_download()
        vol_analysis(memfile, archive_path)
        vol_analysis_ps(memfile, archive_path)
        vol_analysis_timeline(memfile, archive_path)
        vol_analysis_yara(memfile, archive_path)
        vol_analysis_printkey(memfile, archive_path)
    if args.plugin in "dumpfiles":
        vol_analysis_dumpfile(memfile, archive_path, args.pid)
    if args.plugin in "impfuzzy":
        vol_analysis_plugin(memfile, archive_path, "pehash.ImpFuzzy")
    if args.plugin in "imphash":
        vol_analysis_plugin(memfile, archive_path, "pehash.ImpHash")

    print("[+]{0} : Finished analysis".format(datetime.datetime.now()))

    # create result page
    with open(os.path.join(archive_path, "index.html"), "w", encoding="utf-8") as f:
        f.write(HTML_DATA.format(**{"hash": args.file}))

    with open(os.path.join(archive_path, "script.js"), "w", encoding="utf-8") as f:
        f.write(JS_DATA.format(**{"api_gateway_url": api_gateway_url}))

    with open(os.path.join(archive_path, "tree-boxes.css"), "w", encoding="utf-8") as f:
        f.write(CSS_DATA)

    time.sleep(1)
    subprocess.call('aws s3 cp /tmp/' + repo_name + '/main s3://' + result_backet_name + '/ --exclude "*" --include "*.html" --include "*.json" --include "*.js" --include "*.zip" --include "*.css" --include "*.dmp" --recursive ', shell=True)
    print("[+]{0} : Uploaded result".format(datetime.datetime.now()))

if __name__ == "__main__":
    main()
