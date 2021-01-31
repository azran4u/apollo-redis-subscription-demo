#!groovy

/* groovylint-disable-next-line CompileStatic */
SERVICE_NAME = 'graphql-server'
SERVICE_PORT = '4000'
IMAGE_NAME = "eyala/${SERVICE_NAME}:${BUILD_NUMBER}"
NAMESPACE = 'dev'

node {
   stage ('Clean Workspace') {
      deleteDir()
   }

   stage ('Checkout') {
      checkout scm
   }

   stage ('Install dependencies') {
      sh 'npm install'
      sh 'npm i -g typescript'
   }

   stage ('Build') {
      sh 'npm run build'
   }

   stage('Build Docker image and Push') {
      /* groovylint-disable-next-line LineLength */
      withCredentials([usernamePassword(credentialsId:'94e3417c-5722-40d5-a852-93227cb2ad68', passwordVariable:'DOCKERHUB_PASS', usernameVariable:'DOCKERHUB_USER')]) {
            if ("${env.BRANCH_NAME}" == 'master') {
            sh "docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASS}"
            sh "docker build -t ${IMAGE_NAME} ."
            sh "docker push ${IMAGE_NAME}"
            sh "docker rmi ${IMAGE_NAME}"
            }
      }
   }

   stage('Deploy to Kubernetes') {
      /* groovylint-disable-next-line DuplicateStringLiteral */
      if ("${env.BRANCH_NAME}" == 'master') {
         sh "sed -i 's/BUILD_NUMBER/${BUILD_NUMBER}/g' k8s/${SERVICE_NAME}.yaml"
         sh "sed -i 's/SERVICE_NAME/${SERVICE_NAME}/g' k8s/${SERVICE_NAME}.yaml"
         sh "sed -i 's/SERVICE_PORT/${SERVICE_PORT}/g' k8s/${SERVICE_NAME}.yaml"
         sh "cat k8s/${SERVICE_NAME}.yaml"
         sh "kubectl delete --ignore-not-found=true deployment/${SERVICE_NAME}-deployment"
         sh "kubectl delete --ignore-not-found=true service/${SERVICE_NAME}-service"
         sh "kubectl apply -f k8s/${SERVICE_NAME}.yaml --namespace ${NAMESPACE}"
      }
   }

   /* groovylint-disable-next-line DuplicateStringLiteral */
   stage ('Clean Workspace') {
      deleteDir()
   }
}
