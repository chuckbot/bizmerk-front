#!/bin/sh

#############MANDATORY#########
PROJECT_NAME='bizmerk-front'
###############################

if [ -z "$DOCKERHUB_USER" ]; then
  DOCKERHUB_USER='bizmerkback'
fi



CONTAINER_NAME=$PROJECT_NAME-$DEPLOY_TYPE
SSH_CMD="ssh $SERVER_USER@$SERVER_HOST"

generate_and_push_image(){
  sh bin/build.sh && docker push "$DOCKERHUB_USER/$PROJECT_NAME"
}

generate_and_push_image
