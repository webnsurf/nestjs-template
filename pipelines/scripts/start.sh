#! /bin/bash

POSITIONAL=()
while [[ $# -gt 0 ]]; do key="$1"
  case $key in
    --image)
    IMAGE="$2"; shift; shift;;
    --tag)
    TAG="$2"; shift; shift;;
    --name)
    NAME="$2"; shift; shift;;
    --url)
    URL="$2"; shift; shift;;
    --stack)
    STACK="$2"; shift; shift;;
    --port)
    PORT="$2"; shift; shift;;
    *)
    POSITIONAL+=("$1"); shift;;
  esac
done
set -- "${POSITIONAL[@]}"; # restore positional parameters

envFile=".env";
composeFile="docker-compose.yml";

if [ "$RUNTIME_ENV" != "local" ]; then
  pwd;
  cd ~/releases/$NAME/$TAG/$STACK;
  docker pull "${IMAGE}:${TAG}";
else
  composeFile="pipelines/docker-compose.yml";
  envFile="../.env";
fi;

pwd;
ls -la;

export IMAGE="${IMAGE}";
export TAG="${TAG}";
export NAME="${NAME}";
export URL="${URL}";
export PORT="${PORT}";
export ENV_FILE="${envFile}";

echo "IMAGE = ${IMAGE}";
echo "TAG = ${TAG}";
echo "STACK = ${STACK}";
echo "NAME = ${NAME}";
echo "URL = ${URL}";
echo "PORT = ${PORT}";
echo "ENV_FILE = ${ENV_FILE}";
echo "Compose file = ${composeFile}";

docker-compose -f $composeFile up -d 2>&1;
