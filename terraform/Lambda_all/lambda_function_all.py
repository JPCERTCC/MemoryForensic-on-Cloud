import os
import boto3
import logging
import datetime

JOB_QUEUE = os.environ['JOB_QUEUE']
JOB_DEFINITION = os.environ['JOB_DEFINITION']

logger = logging.getLogger()
logLevelTable={'DEBUG':logging.DEBUG,'INFO':logging.INFO,'WARNING':logging.WARNING,'ERROR':logging.ERROR,'CRITICAL':logging.CRITICAL}
if 'logging_level' in os.environ and os.environ['logging_level'] in logLevelTable :
    logLevel=logLevelTable[os.environ['logging_level']]
else:
    logLevel=logging.WARNING
logger.setLevel(logLevel)

def lambda_handler(event, context):
    file_name = event['detail']['object']['key']
    source_ip = event['detail']['source-ip-address']
    logger.info(" : upload file name {0} from {1}".format(file_name, source_ip))
    commands = ["/tmp/run.sh", file_name, "all"]

    logger.info(" : commands {0}".format(commands))

    client = boto3.client('batch')

    response = client.submit_job(
        jobName = "MemForensicJob_" + file_name,
        jobQueue = JOB_QUEUE,
        jobDefinition = JOB_DEFINITION,
        containerOverrides={
            'command': commands
            }
        )
    print(response)
