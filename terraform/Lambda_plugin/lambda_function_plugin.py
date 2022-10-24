import re
import os
import boto3
import logging
import datetime

JOB_QUEUE = os.environ['JOB_QUEUE']
JOB_DEFINITION = os.environ['JOB_DEFINITION']

# Sha256 Check
HASH_CHECK = r"[%*+=\[\]\\/|;:\"<>?,&]"

logger = logging.getLogger()
logLevelTable={'DEBUG':logging.DEBUG,'INFO':logging.INFO,'WARNING':logging.WARNING,'ERROR':logging.ERROR,'CRITICAL':logging.CRITICAL}
if 'logging_level' in os.environ and os.environ['logging_level'] in logLevelTable :
    logLevel=logLevelTable[os.environ['logging_level']]
else:
    logLevel=logging.WARNING
logger.setLevel(logLevel)

def lambda_handler(event, context):
    file_name = event['queryStringParameters']['hash']
    plugin = event['queryStringParameters']['plugin']
    if not re.search(r"\A[0-9a-zA-Z]{64}\Z", file_name):
        logger.error(" : Hash value does not match format.")
        return "Error"

    if not re.search(r"\A[a-z_]{4,25}\Z", plugin):
        logger.error(" : Plugin name does not match format.")
        return "Error"

    if plugin in "dumpfiles":
        try:
            pid = event['queryStringParameters']['pid']
            if not re.search(r"\A[0-9]{1,6}\Z", pid):
                logger.error(" : PID does not match format.")
                return "Error"
            logger.info(" : dump file {0} pid {1}".format(file_name, pid))
            commands = ["/tmp/run.sh", file_name, "dumpfiles", "-p", pid]
        except:
            logger.error(" : Can't get pid option.")
            return "Error"
    else:
        logger.info(" : Analysis file {0} plugin {1}".format(file_name, plugin))
        commands = ["/tmp/run.sh", file_name, plugin]

    logger.info(" : commands {0}".format(commands))

    client = boto3.client('batch')

    response = client.submit_job(
        jobName = "MemForensicJob_" + plugin + "_" + file_name,
        jobQueue = JOB_QUEUE,
        jobDefinition = JOB_DEFINITION,
        containerOverrides={
            'command': commands
            }
        )

    logger.debug(response)

    if plugin in "dumpfiles":
        return {
            'statusCode':303,
            'headers':{
                'Location': "http://" + os.environ['S3_BUCKET'] + "/" + file_name + "/" + pid + ".zip",
            }
        }
    else:
        return "Start job."
