#!/bin/sh

CODE_REPO="https://git-codecommit.${REGION}.amazonaws.com/v1/repos/${REPO_NAME}"
CODE_DIR="/tmp/${REPO_NAME}"

git clone --config credential.helper='!aws --region $REGION codecommit credential-helper $@' --config credential.UseHttpPath=true $CODE_REPO $CODE_DIR

chmod +x /tmp/$REPO_NAME/analysis.py

python3 /tmp/$REPO_NAME/analysis.py "$@"
