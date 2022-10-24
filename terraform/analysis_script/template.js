$.fn.dataTable.moment('YYYY-MM-DDThh:mm:ss');

function queryTimeliner() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Accessed Date</th><th>Changed Date</th><th>Created Date</th><th>Description</th><th>Modified Date</th><th>Plugin</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "timeliner.Timeliner.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Accessed Date'}},
      {{data: 'Changed Date'}},
      {{data: 'Created Date'}},
      {{data: 'Description'}},
      {{data: 'Modified Date'}},
      {{data: 'Plugin'}},
    ],
  }});
}}

function queryBigPools() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Allocation</th><th>NumberOfBytes</th><th>PoolType</th><th>Tag</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.bigpools.BigPools.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Allocation'}},
      {{data: 'NumberOfBytes'}},
      {{data: 'PoolType'}},
      {{data: 'Tag'}},
    ],
  }});
}}

function queryCachedump() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Username</th><th>Domain</th><th>Domain name</th><th>Hash</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.cachedump.Cachedump.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Username'}},
      {{data: 'Domain'}},
      {{data: 'Domain name'}},
      {{data: 'Hash'}},
    ],
  }});
}}

function queryCallbacks() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Callback</th><th>Detail</th><th>Module</th><th>Symbol</th><th>Type</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.callbacks.Callbacks.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Callback'}},
      {{data: 'Detail'}},
      {{data: 'Module'}},
      {{data: 'Symbol'}},
      {{data: 'Type'}},
    ],
  }});
}}

function queryCmdLine() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Args</th><th>PID</th><th>Process</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.cmdline.CmdLine.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Args'}},
      {{data: 'PID'}},
      {{data: 'Process'}},
    ],
  }});
}}

function queryDllList() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Base</th><th>LoadTime</th><th>Name</th><th>PID</th><th>Path</th><th>Process</th><th>Size</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    "fnRowCallback": function(nRow, aData, iDisplayIndex) {{
            $('td:eq(3)', nRow).html('<a href="' + aData["File output"] + '" target="_blank">' + aData["PID"] + '</a>');
            return nRow;
        }},
    ajax: {{
      "url": "windows.dlllist.DllList.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Base'}},
      {{data: 'LoadTime'}},
      {{data: 'Name'}},
      {{data: 'PID'}},
      {{data: 'Path'}},
      {{data: 'Process'}},
      {{data: 'Size'}},
    ],
  }});
}}

function queryDriverIrp() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Address</th><th>Driver Name</th><th>IRP</th><th>Module</th><th>Symbol</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.driverirp.DriverIrp.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Address'}},
      {{data: 'Driver Name'}},
      {{data: 'IRP'}},
      {{data: 'Module'}},
      {{data: 'Symbol'}},
    ],
  }});
}}

function queryDriverScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Driver Name</th><th>Name</th><th>Service Key</th><th>Size</th><th>Start</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.driverscan.DriverScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Driver Name'}},
      {{data: 'Name'}},
      {{data: 'Service Key'}},
      {{data: 'Size'}},
      {{data: 'Start'}},
    ],
  }});
}}

function queryEnvars() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Block</th><th>PID</th><th>Process</th><th>Value</th><th>Variable</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.envars.Envars.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Block'}},
      {{data: 'PID'}},
      {{data: 'Process'}},
      {{data: 'Value'}},
      {{data: 'Variable'}},
    ],
  }});
}}

function queryFileScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Name</th><th>Offset</th><th>Size</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.filescan.FileScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Name'}},
      {{data: 'Offset'}},
      {{data: 'Size'}},
    ],
  }});
}}

function queryGetServiceSIDs() {{
  html = '<table id="onTable" class="display"><thead><tr><th>SID</th><th>Service</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.getservicesids.GetServiceSIDs.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'SID'}},
      {{data: 'Service'}},
    ],
  }});
}}

function queryGetSIDs() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Name</th><th>PID</th><th>Process</th><th>SID</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.getsids.GetSIDs.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Name'}},
      {{data: 'PID'}},
      {{data: 'Process'}},
      {{data: 'SID'}},
    ],
  }});
}}

function queryHashdump() {{
  html = '<table id="onTable" class="display"><thead><tr><th>User</th><th>lmhash</th><th>nthash</th><th>rid</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.hashdump.Hashdump.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'User'}},
      {{data: 'lmhash'}},
      {{data: 'nthash'}},
      {{data: 'rid'}},
    ],
  }});
}}

function queryLsadump() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Hex</th><th>Key</th><th>Secret</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.lsadump.Lsadump.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Hex'}},
      {{data: 'Key'}},
      {{data: 'Secret'}},
    ],
  }});
}}

function queryMalfind() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Disasm</th><th>Hexdump</th><th>PID</th><th>Process</th><th>Tag</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    "fnRowCallback": function(nRow, aData, iDisplayIndex) {{
            $('td:eq(2)', nRow).html('<a href="' + aData["File output"] + '" target="_blank">' + aData["PID"] + '</a>');
            return nRow;
        }},
    ajax: {{
      "url": "windows.malfind.Malfind.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Disasm'}},
      {{data: 'Hexdump'}},
      {{data: 'PID'}},
      {{data: 'Process'}},
      {{data: 'Tag'}},
    ],
  }});
}}

function queryModScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Base</th><th>Name</th><th>Path</th><th>Size</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.modscan.ModScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Base'}},
      {{data: 'Name'}},
      {{data: 'Path'}},
      {{data: 'Size'}},
    ],
  }});
}}

function queryModules() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Base</th><th>Name</th><th>Path</th><th>Size</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    "fnRowCallback": function(nRow, aData, iDisplayIndex) {{
            $('td:eq(1)', nRow).html('<a href="' + aData["File output"] + '" target="_blank">' + aData["Name"] + '</a>');
            return nRow;
        }},
    ajax: {{
      "url": "windows.modules.Modules.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Base'}},
      {{data: 'Name'}},
      {{data: 'Path'}},
      {{data: 'Size'}},
    ],
  }});
}}

function queryMutantScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Name</th><th>Offset</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.mutantscan.MutantScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Name'}},
      {{data: 'Offset'}},
    ],
  }});
}}

function queryNetScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Created</th><th>ForeignAddr</th><th>ForeignPort</th><th>LocalAddr</th><th>LocalPort</th><th>Owner</th><th>PID</th><th>Proto</th><th>State</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.netscan.NetScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Created'}},
      {{data: 'ForeignAddr'}},
      {{data: 'ForeignPort'}},
      {{data: 'LocalAddr'}},
      {{data: 'LocalPort'}},
      {{data: 'Owner'}},
      {{data: 'PID'}},
      {{data: 'Proto'}},
      {{data: 'State'}},
    ],
  }});
}}

function queryNetStat() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Created</th><th>ForeignAddr</th><th>ForeignPort</th><th>LocalAddr</th><th>LocalPort</th><th>Owner</th><th>PID</th><th>Proto</th><th>State</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.netstat.NetStat.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Created'}},
      {{data: 'ForeignAddr'}},
      {{data: 'ForeignPort'}},
      {{data: 'LocalAddr'}},
      {{data: 'LocalPort'}},
      {{data: 'Owner'}},
      {{data: 'PID'}},
      {{data: 'Proto'}},
      {{data: 'State'}},
    ],
  }});
}}

function queryPoolScanner() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Layer</th><th>Name</th><th>Tag</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.poolscanner.PoolScanner.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Layer'}},
      {{data: 'Name'}},
      {{data: 'Tag'}},
    ],
  }});
}}

function queryPsList() {{
  html = '<table id="onTable" class="display"><thead><tr><th>CreateTime</th><th>ExitTime</th><th>Handles</th><th>ImageFileName</th><th>PID</th><th>PPID</th><th>SessionId</th><th>Threads</th><th>Wow64</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    "fnRowCallback": function(nRow, aData, iDisplayIndex) {{
            $('td:eq(4)', nRow).html('<a href="' + aData["File output"] + '" target="_blank">' + aData["PID"] + '</a>');
            return nRow;
        }},
    ajax: {{
      "url": "windows.pslist.PsList.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'CreateTime'}},
      {{data: 'ExitTime'}},
      {{data: 'Handles'}},
      {{data: 'ImageFileName'}},
      {{data: 'PID'}},
      {{data: 'PPID'}},
      {{data: 'SessionId'}},
      {{data: 'Threads'}},
      {{data: 'Wow64'}},
    ],
  }});
}}

function queryPsScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>CreateTime</th><th>ExitTime</th><th>Handles</th><th>ImageFileName</th><th>PID</th><th>PPID</th><th>SessionId</th><th>Threads</th><th>Wow64</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    "fnRowCallback": function(nRow, aData, iDisplayIndex) {{
            $('td:eq(4)', nRow).html('<a href="' + aData["File output"] + '" target="_blank">' + aData["PID"] + '</a>');
            return nRow;
        }},
    ajax: {{
      "url": "windows.psscan.PsScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'CreateTime'}},
      {{data: 'ExitTime'}},
      {{data: 'Handles'}},
      {{data: 'ImageFileName'}},
      {{data: 'PID'}},
      {{data: 'PPID'}},
      {{data: 'SessionId'}},
      {{data: 'Threads'}},
      {{data: 'Wow64'}},
    ],
  }});
}}

function queryPrivs() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Attributes</th><th>Description</th><th>PID</th><th>Privilege</th><th>Process</th><th>Value</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.privileges.Privs.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Attributes'}},
      {{data: 'Description'}},
      {{data: 'PID'}},
      {{data: 'Privilege'}},
      {{data: 'Process'}},
      {{data: 'Value'}},
    ],
  }});
}}

function queryCertificates() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Certificate path</th><th>Certificate section</th><th>Certificate ID</th><th>Certificate name</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.registry.certificates.Certificates.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Certificate path'}},
      {{data: 'Certificate section'}},
      {{data: 'Certificate ID'}},
      {{data: 'Certificate name'}},
    ],
  }});
}}

function queryHiveList() {{
  html = '<table id="onTable" class="display"><thead><tr><th>FileFullPath</th><th>Offset</th><</tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.registry.hivelist.HiveList.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'FileFullPath'}},
      {{data: 'Offset'}},
    ],
  }});
}}

function queryHiveScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Offset</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.registry.hivescan.HiveScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Offset'}},
    ],
  }});
}}

function queryPrintKey() {{
  html = '<table id="onTable" class="display"><thead><tr><th>FileFullPath</th><th>Offset</th><</tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    "fnRowCallback": function(nRow, aData, iDisplayIndex) {{
            $('td:eq(1)', nRow).html('<a href="#" onclick="queryPrintKeySub(\'' + "0x" + aData["Offset"].toString(16) + '\')">' + "0x" + aData["Offset"].toString(16) + '</a>');
            return nRow;
        }},
    ajax: {{
      "url": "windows.registry.hivelist.HiveList.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'FileFullPath'}},
      {{data: 'Offset'}},
    ],
  }});
}}

function queryPrintKeySub(offset) {{
  html = '<table id="onTable" class="display"><thead><tr><th>Last Write Time</th><th>Type</th><th>Key</th><th>Name</th><th>Data</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = "";
  document.getElementById("resultTable").innerHTML = html;

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.registry.printkey.PrintKey." + offset + ".json",
      "type": "GET",
      "dataSrc": function(obj) {{
          return flat(obj);
      }}
    }},
    columns: [
      {{data: 'Last Write Time'}},
      {{data: 'Type'}},
      {{data: 'Key'}},
      {{data: 'Name'}},
      {{data: 'Data'}},
    ],
  }});
}}

function flat(array) {{
    var result = [];
    array.forEach(function (a) {{
        result.push(a);
        if (Array.isArray(a.__children)) {{
            result = result.concat(flat(a.__children));
        }}
    }});
    return result;
}}

function querySkeleton_Key_Check() {{
  html = '<table id="onTable" class="display"><thead><tr><th>PID</th><th>Process</th><th>Skeleton Key Found</th><th>rc4HmacDecrypt</th><th>rc4HmacInitialize</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.skeleton_key_check.Skeleton_Key_Check.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'PID'}},
      {{data: 'Process'}},
      {{data: 'Skeleton Key Found'}},
      {{data: 'rc4HmacDecrypt'}},
      {{data: 'rc4HmacInitialize'}},
    ],
  }});
}}

function querySSDT() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Address</th><th>Index</th><th>Module</th><th>Symbol</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.ssdt.SSDT.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Address'}},
      {{data: 'Index'}},
      {{data: 'Module'}},
      {{data: 'Symbol'}},
    ],
  }});
}}

function querySvcScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Binary</th><th>Display</th><th>Name</th><th>Order</th><th>PID</th><th>Start</th><th>State</th><th>Type</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.svcscan.SvcScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Binary'}},
      {{data: 'Display'}},
      {{data: 'Name'}},
      {{data: 'Order'}},
      {{data: 'PID'}},
      {{data: 'Start'}},
      {{data: 'State'}},
      {{data: 'Type'}},
    ],
  }});
}}

function querySymlinkScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>CreateTime</th><th>From Name</th><th>To Name</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.symlinkscan.SymlinkScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'CreateTime'}},
      {{data: 'From Name'}},
      {{data: 'To Name'}},
    ],
  }});
}}

function queryVadInfo() {{
  html = '<table id="onTable" class="display"><thead><tr><th>CommitCharge</th><th>End VPN</th><th>File</th><th>PID</th><th>Parent</th><th>PrivateMemory</th><th>Process</th><th>Protection</th><th>Start VPN</th><th>Tag</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.vadinfo.VadInfo.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'CommitCharge'}},
      {{data: 'End VPN'}},
      {{data: 'File'}},
      {{data: 'PID'}},
      {{data: 'Parent'}},
      {{data: 'PrivateMemory'}},
      {{data: 'Process'}},
      {{data: 'Protection'}},
      {{data: 'Start VPN'}},
      {{data: 'Tag'}},
    ],
  }});
}}

function queryVerInfo() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Base</th><th>Build</th><th>Major</th><th>Minor</th><th>Name</th><th>PID</th><th>Process</th><th>Product</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.verinfo.VerInfo.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Base'}},
      {{data: 'Build'}},
      {{data: 'Major'}},
      {{data: 'Minor'}},
      {{data: 'Name'}},
      {{data: 'PID'}},
      {{data: 'Process'}},
      {{data: 'Product'}},
    ],
  }});
}}

function queryVirtMap() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Start offset</th><th>End offset</th><th>Region</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "windows.virtmap.VirtMap.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Start offset'}},
      {{data: 'End offset'}},
      {{data: 'Region'}},
    ],
  }});
}}

function queryYaraScan() {{
  html = '<table id="onTable" class="display"><thead><tr><th>Offset</th><th>PID</th><th>Rule</th><th>Component</th><th>Value</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "yarascan.YaraScan.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'Offset'}},
      {{data: 'PID'}},
      {{data: 'Rule'}},
      {{data: 'Component'}},
      {{data: 'Value'}},
    ],
  }});
}}

function queryImpHash(hash) {{
  html = '<table id="onTable" class="display"><thead><tr><th>ImageFileName</th><th>Module Base</th><th>Module Name</th><th>PID</th><th>imphash</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();
  $.fn.dataTable.ext.errMode = 'none';

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "pehash.ImpHash.json",
      "type": "GET",
      "dataSrc": "",
      "error": function(jqXHR, textStatus, errorThrown){{
        runAPI(hash, "imphash");
        document.getElementById("resultTable").innerHTML = "";
        document.getElementById("resultTable").innerHTML = '<div class="d-flex justify-content-center"><strong>Now processing...</strong><div class="spinner-grow text-dark" role="status"></div></div>';
      }}
    }},
    columns: [
      {{data: 'ImageFileName'}},
      {{data: 'Module Base'}},
      {{data: 'Module Name'}},
      {{data: 'PID'}},
      {{data: 'imphash'}},
    ],
  }});
}}

function queryImpFuzzy(hash) {{
  html = '<table id="onTable" class="display"><thead><tr><th>ImageFileName</th><th>Module Base</th><th>Module Name</th><th>PID</th><th>impfuzzy</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    ajax: {{
      "url": "pehash.ImpFuzzy.json",
      "type": "GET",
      "dataSrc": "",
      "error": function(jqXHR, textStatus, errorThrown){{
        runAPI(hash, "impfuzzy");
        document.getElementById("resultTable").innerHTML = "";
        document.getElementById("resultTable").innerHTML = '<div class="d-flex justify-content-center"><strong>Now processing...</strong><div class="spinner-grow text-dark" role="status"></div></div>';
      }}
    }},
    columns: [
      {{data: 'ImageFileName'}},
      {{data: 'Module Base'}},
      {{data: 'Module Name'}},
      {{data: 'PID'}},
      {{data: 'impfuzzy'}},
    ],
  }});
}}

function queryDumpFiles(hash) {{
  html = '<table id="onTable" class="display"><thead><tr><th>CreateTime</th><th>ExitTime</th><th>Handles</th><th>ImageFileName</th><th>PID</th><th>PPID</th><th>SessionId</th><th>Threads</th><th>Wow64</th></tr></thead><tbody></tbody></table>';
  document.getElementById("resultTable").innerHTML = html;

  $("#tree-container").empty();

  var myTable = $("#onTable").dataTable({{
    "pageLength": 50,
    "fnRowCallback": function(nRow, aData, iDisplayIndex) {{
            $('td:eq(4)', nRow).html('<a href="{api_gateway_url}?hash=' + hash + '&plugin=dumpfiles&pid=' + aData["PID"] + '" target="_blank">' + aData["PID"] + '</a>');
            return nRow;
        }},
    ajax: {{
      "url": "windows.pslist.PsList.json",
      "type": "GET",
      "dataSrc": "",
    }},
    columns: [
      {{data: 'CreateTime'}},
      {{data: 'ExitTime'}},
      {{data: 'Handles'}},
      {{data: 'ImageFileName'}},
      {{data: 'PID'}},
      {{data: 'PPID'}},
      {{data: 'SessionId'}},
      {{data: 'Threads'}},
      {{data: 'Wow64'}},
    ],
  }});
}}


function queryPsTree() {{
  jsonTemplate = '{{"CreateTime": "", "ImageFileName": "TOP", "PID": "", "PPID": "", "Wow64": "", "children": __}}';

  $("#resultTable").empty();

  d3.json("windows.pstree.PsTree.json", function(error, json) {{
    var jsonStr = JSON.stringify(json).replace(/__children/g, 'children');
    treeBoxes('', JSON.parse(jsonTemplate.replace('__', jsonStr)));
  }});
}}


function treeBoxes(urlService, jsonData) {{
	var urlService_ = '';

	var blue = '#337ab7',
		green = '#5cb85c',
		yellow = '#f0ad4e',
		blueText = '#4ab1eb',
		purple = '#9467bd';

	var margin = {{
					top : 0,
					right : 0,
					bottom : 0,
					left : 0
				 }},
		// Height and width are redefined later in function of the size of the tree
		// (after that the data are loaded)
		width = 800 - margin.right - margin.left,
		height = 400 - margin.top - margin.bottom;

    // size of the diagram
    var viewerWidth = $(document).width() - margin.right - margin.left;
    var viewerHeight =  $(document).height() - margin.top - margin.bottom;

    // console.log("width:", width, viewerWidth);
    // console.log("height:", height, viewerHeight);

	var rectNode = {{ width : 140, height : 70, textMargin : 5 }},
		tooltip = {{ width : 150, height : 40, textMargin : 5 }};
	var i = 0,
		duration = 750,
		root;

	var mousedown; // Use to save temporarily 'mousedown.zoom' value
	var mouseWheel,
		mouseWheelName,
		isKeydownZoom = false;

	var tree;
	var baseSvg,
		svgGroup,
		nodeGroup, // If nodes are not grouped together, after a click the svg node will be set after his corresponding tooltip and will hide it
		nodeGroupTooltip,
		linkGroup,
		linkGroupToolTip,
		defs;

	init(urlService, jsonData);

	function init(urlService, jsonData)
	{{
		urlService_ = urlService;
		if (urlService && urlService.length > 0)
		{{
			if (urlService.charAt(urlService.length - 1) != '/')
				urlService_ += '/';
		}}

		if (jsonData)
			drawTree(jsonData);
		else
		{{
			console.error(jsonData);
			alert('Invalides data.');
		}}
	}}

	function drawTree(jsonData)
	{{
		tree = d3.layout.tree().size([ height, width ]);
		root = jsonData;
		root.fixed = true;

		// Dynamically set the height of the main svg container
		// breadthFirstTraversal returns the max number of node on a same level
		// and colors the nodes
		var maxDepth = 0;
		var maxTreeWidth = breadthFirstTraversal(tree.nodes(root), function(currentLevel) {{
			maxDepth++;
			currentLevel.forEach(function(node) {{
				// if (node.type == 'type1')      // <-----------------------------------------------------------------
				// 	node.color = blue;
				// if (node.type == 'type2')
				// 	node.color = green;
				// if (node.type == 'type3')
				// 	node.color = yellow;
				// if (node.type == 'type4')
				// 	node.color = purple;
				}});
			}});
		height = maxTreeWidth * (rectNode.height + 20) + 20 - margin.right - margin.left;
		width = maxDepth * (rectNode.width * 1.5) - margin.top - margin.bottom;
		tree = d3.layout.tree().size([ height, width ]);
		root.x0 = height / 2;
		root.y0 = 0;

		baseSvg = d3.select('#tree-container').append('svg')
	 //    .attr('width', width + margin.right + margin.left)
		// .attr('height', height + margin.top + margin.bottom)
	    .attr('width', viewerWidth)
		.attr('height', viewerHeight)
		.attr('class', 'svgContainer')

		.call(d3.behavior.zoom().scaleExtent([0.1, 3])
		      //.scaleExtent([0.5, 1.5]) // Limit the zoom scale
		      .on('zoom', zoomAndDrag));

		// Mouse wheel is desactivated, else after a first drag of the tree, wheel event drags the tree (instead of scrolling the window)
		getMouseWheelEvent();
		d3.select('#tree-container').select('svg').on(mouseWheelName, null);
		d3.select('#tree-container').select('svg').on('dblclick.zoom', null);

		svgGroup = baseSvg.append('g')
		.attr('class','drawarea')
		.append('g')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

		// SVG elements under nodeGroupTooltip could be associated with nodeGroup,
		// same for linkGroupToolTip and linkGroup,
		// but this separation allows to manage the order on which elements are drew
		// and so tooltips are always on top.
		nodeGroup = svgGroup.append('g')
					.attr('id', 'nodes');
		linkGroup = svgGroup.append('g')
					.attr('id', 'links');
		linkGroupToolTip = svgGroup.append('g')
			   				.attr('id', 'linksTooltips');
		nodeGroupTooltip = svgGroup.append('g')
			   				.attr('id', 'nodesTooltips');

		defs = baseSvg.append('defs');
		initArrowDef();
		initDropShadow();

		update(root);
	}}

	function update(source)
	{{
		// Compute the new tree layout
		var nodes = tree.nodes(root).reverse(),
			links = tree.links(nodes);

		// Check if two nodes are in collision on the ordinates axe and move them
		breadthFirstTraversal(tree.nodes(root), collision);
		// Normalize for fixed-depth
		nodes.forEach(function(d) {{
			d.y = d.depth * (rectNode.width * 1.5);
		}});

	// 1) ******************* Update the nodes *******************
		var node = nodeGroup.selectAll('g.node').data(nodes, function(d) {{
			return d.id || (d.id = ++i);
		}});
		var nodesTooltip = nodeGroupTooltip.selectAll('g').data(nodes, function(d) {{
			return d.id || (d.id = ++i);
		}});

		// Enter any new nodes at the parent's previous position
		// We use "insert" rather than "append", so when a new child node is added (after a click)
		// it is added at the top of the group, so it is drawed first
		// else the nodes tooltips are drawed before their children nodes and they
		// hide them
		var nodeEnter = node.enter().insert('g', 'g.node')
		.attr('class', 'node')
		.attr('transform', function(d) {{
			  return 'translate(' + source.y0 + ',' + source.x0 + ')'; }})
		.on('click', function(d) {{
						click(d);
			}});
		var nodeEnterTooltip = nodesTooltip.enter().append('g')
			.attr('transform', function(d) {{
				  return 'translate(' + source.y0 + ',' + source.x0 + ')'; }});

		nodeEnter.append('g').append('rect')
		.attr('rx', 6)
		.attr('ry', 6)
		.attr('width', rectNode.width)
		.attr('height', rectNode.height)
		.attr('class', 'node-rect')
		.attr('fill', function (d) {{ return d.color; }})
		.attr('filter', 'url(#drop-shadow)');

		nodeEnter.append('foreignObject')
		.attr('x', rectNode.textMargin)
		.attr('y', rectNode.textMargin)
		.attr('width', function() {{
					return (rectNode.width - rectNode.textMargin * 2) < 0 ? 0
							: (rectNode.width - rectNode.textMargin * 2)
				}})
		.attr('height', function() {{
					return (rectNode.height - rectNode.textMargin * 2) < 0 ? 0
							: (rectNode.height - rectNode.textMargin * 2)
				}})
		.append('xhtml').html(function(d) {{  // <===========================================================================================
					return '<div style="width: '
							+ (rectNode.width - rectNode.textMargin * 2) + 'px; height: '
							+ (rectNode.height - rectNode.textMargin * 2) + 'px;" class="node-text wordwrap">'
							+ '<b>' + d.ImageFileName + '</b><br>'
							+ '<b>PID: </b>' + d.PID + '<br>'
							+ '<b>PPID: </b>' + d.PPID + '<br>'
							+ '<b>Wow64: </b>' + d.Wow64 + '<br>'
							+ '<b>CreateTime: </b>' + d.CreateTime + '<br>'
							+ '</div>';
				}})
		.on('mouseover', function(d) {{
			$('#nodeInfoID' + d.id).css('visibility', 'visible');
			$('#nodeInfoTextID' + d.id).css('visibility', 'visible');
		}})
		.on('mouseout', function(d) {{
			$('#nodeInfoID' + d.id).css('visibility', 'hidden');
			$('#nodeInfoTextID' + d.id).css('visibility', 'hidden');
		}});

		// Transition nodes to their new position.
		var nodeUpdate = node.transition().duration(duration)
		.attr('transform', function(d) {{ return 'translate(' + d.y + ',' + d.x + ')'; }});
		nodesTooltip.transition().duration(duration)
		.attr('transform', function(d) {{ return 'translate(' + d.y + ',' + d.x + ')'; }});

		nodeUpdate.select('rect')
		.attr('class', function(d) {{ return d._children ? 'node-rect-closed' : 'node-rect'; }});

		nodeUpdate.select('text').style('fill-opacity', 1);

		// Transition exiting nodes to the parent's new position
		var nodeExit = node.exit().transition().duration(duration)
			.attr('transform', function(d) {{ return 'translate(' + source.y + ',' + source.x + ')'; }})
			.remove();

		nodeExit.select('text').style('fill-opacity', 1e-6);


	// 2) ******************* Update the links *******************
		var link = linkGroup.selectAll('path').data(links, function(d) {{
			return d.target.id;
		}});
		var linkTooltip = linkGroupToolTip.selectAll('g').data(links, function(d) {{
			return d.target.id;
		}});

		d3.selection.prototype.moveToFront = function() {{
			  return this.each(function(){{
				    this.parentNode.appendChild(this);
				  }});
			}};

		// Enter any new links at the parent's previous position.
			// Enter any new links at the parent's previous position.
			var linkenter = link.enter().insert('path', 'g')
			.attr('class', 'link')
			.attr('id', function(d) {{ return 'linkID' + d.target.id; }})
			.attr('d', function(d) {{ return diagonal(d); }})
			.attr('marker-end', 'url(#end-arrow)')
			.on('mouseover', function(d) {{
				d3.select(this).moveToFront();
				d3.select(this).attr('marker-end', 'url(#end-arrow-selected)');
				d3.select(this).attr('class', 'linkselected');

			}})
			.on('mouseout', function(d) {{
				d3.select(this).attr('marker-end', 'url(#end-arrow)');
				d3.select(this).attr('class', 'link');
			}});

		// Transition links to their new position.
		var linkUpdate = link.transition().duration(duration)
						 	 .attr('d', function(d) {{ return diagonal(d); }});

		// Transition exiting nodes to the parent's new position.
		link.exit().transition()
		.remove();

		// Stash the old positions for transition.
		nodes.forEach(function(d) {{
			d.x0 = d.x;
			d.y0 = d.y;
		}});
	}}

	// Zoom functionnality is desactivated (user can use browser Ctrl + mouse wheel shortcut)
	function zoomAndDrag() {{
	    //var scale = d3.event.scale,
	    var scale = 1,
	        translation = d3.event.translate,
	        tbound = -height * scale,
	        bbound = height * scale,
	        lbound = (-width + margin.right) * scale,
	        rbound = (width - margin.left) * scale;
	    // limit translation to thresholds
	    translation = [
	        Math.max(Math.min(translation[0], rbound), lbound),
	        Math.max(Math.min(translation[1], bbound), tbound)
	    ];
	    d3.select('.drawarea')
	        .attr('transform', 'translate(' + translation + ')' +
	              ' scale(' + scale + ')');
	}}

	// Toggle children on click.
	function click(d) {{
		if (d.children) {{
			d._children = d.children;
			d.children = null;
		}} else {{
			d.children = d._children;
			d._children = null;
		}}
		update(d);
	}}

	// Breadth-first traversal of the tree
	// func function is processed on every node of a same level
	// return the max level
	  function breadthFirstTraversal(tree, func)
	  {{
		  var max = 0;
		  if (tree && tree.length > 0)
		  {{
			  var currentDepth = tree[0].depth;
			  var fifo = [];
			  var currentLevel = [];

			  fifo.push(tree[0]);
			  while (fifo.length > 0) {{
				  var node = fifo.shift();
				  if (node.depth > currentDepth) {{
					  func(currentLevel);
					  currentDepth++;
					  max = Math.max(max, currentLevel.length);
					  currentLevel = [];
				  }}
				  currentLevel.push(node);
				  if (node.children) {{
					  for (var j = 0; j < node.children.length; j++) {{
						  fifo.push(node.children[j]);
					  }}
				  }}
		  	}}
			func(currentLevel);
			return Math.max(max, currentLevel.length);
		}}
		return 0;
	  }}

	// x = ordoninates and y = abscissas
	function collision(siblings) {{
	  var minPadding = 5;
	  if (siblings) {{
		  for (var i = 0; i < siblings.length - 1; i++)
		  {{
			  if (siblings[i + 1].x - (siblings[i].x + rectNode.height) < minPadding)
				  siblings[i + 1].x = siblings[i].x + rectNode.height + minPadding;
		  }}
	  }}
	}}

	function removeMouseEvents() {{
		// Drag and zoom behaviors are temporarily disabled, so tooltip text can be selected
		mousedown = d3.select('#tree-container').select('svg').on('mousedown.zoom');
		d3.select('#tree-container').select('svg').on("mousedown.zoom", null);
	}}

	function reactivateMouseEvents() {{
		// Reactivate the drag and zoom behaviors
		d3.select('#tree-container').select('svg').on('mousedown.zoom', mousedown);
	}}

	// Name of the event depends of the browser
	function getMouseWheelEvent() {{
		if (d3.select('#tree-container').select('svg').on('wheel.zoom'))
		{{
			mouseWheelName = 'wheel.zoom';
			return d3.select('#tree-container').select('svg').on('wheel.zoom');
		}}
		if (d3.select('#tree-container').select('svg').on('mousewheel.zoom') != null)
		{{
			mouseWheelName = 'mousewheel.zoom';
			return d3.select('#tree-container').select('svg').on('mousewheel.zoom');
		}}
		if (d3.select('#tree-container').select('svg').on('DOMMouseScroll.zoom'))
		{{
			mouseWheelName = 'DOMMouseScroll.zoom';
			return d3.select('#tree-container').select('svg').on('DOMMouseScroll.zoom');
		}}
	}}

	function diagonal(d) {{
		var p0 = {{
			x : d.source.x + rectNode.height / 2,
			y : (d.source.y + rectNode.width)
		}}, p3 = {{
			x : d.target.x + rectNode.height / 2,
			y : d.target.y  - 12 // -12, so the end arrows are just before the rect node
		}}, m = (p0.y + p3.y) / 2, p = [ p0, {{
			x : p0.x,
			y : m
		}}, {{
			x : p3.x,
			y : m
		}}, p3 ];
		p = p.map(function(d) {{
			return [ d.y, d.x ];
		}});
		return 'M' + p[0] + 'C' + p[1] + ' ' + p[2] + ' ' + p[3];
	}}

	function initDropShadow() {{
		var filter = defs.append("filter")
		    .attr("id", "drop-shadow")
		    .attr("color-interpolation-filters", "sRGB");

		filter.append("feOffset")
		.attr("result", "offOut")
		.attr("in", "SourceGraphic")
	    .attr("dx", 0)
	    .attr("dy", 0);

		filter.append("feGaussianBlur")
		    .attr("stdDeviation", 2);

		filter.append("feOffset")
		    .attr("dx", 2)
		    .attr("dy", 2)
		    .attr("result", "shadow");

		filter.append("feComposite")
	    .attr("in", 'offOut')
	    .attr("in2", 'shadow')
	    .attr("operator", "over");
	}}

	function initArrowDef() {{
		// Build the arrows definitions
		// End arrow
		defs.append('marker')
		.attr('id', 'end-arrow')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrow')
		.append('path')
		.attr('d', 'M0,-5L10,0L0,5');

		// End arrow selected
		defs.append('marker')
		.attr('id', 'end-arrow-selected')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrowselected')
		.append('path')
		.attr('d', 'M0,-5L10,0L0,5');

		// Start arrow
		defs.append('marker')
		.attr('id', 'start-arrow')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrow')
		.append('path')
		.attr('d', 'M10,-5L0,0L10,5');

		// Start arrow selected
		defs.append('marker')
		.attr('id', 'start-arrow-selected')
		.attr('viewBox', '0 -5 10 10')
		.attr('refX', 0)
		.attr('refY', 0)
		.attr('markerWidth', 6)
		.attr('markerHeight', 6)
		.attr('orient', 'auto')
		.attr('class', 'arrowselected')
		.append('path')
		.attr('d', 'M10,-5L0,0L10,5');
	}}
}}

function runAPI(hash, plugin) {{
  var request = new XMLHttpRequest();

  request.open('GET', '{api_gateway_url}?hash=' + hash + '&plugin=' + plugin, false);
  request.send();
}}
