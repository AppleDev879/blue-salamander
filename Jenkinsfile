#!/usr/bin/env groovy

pipeline {

    agent any

    environment {
        PM2_HOME = '/home/sammy/.pm2'
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
    stage('Deploy') {
    steps {
        script {
            // Define deployment variables
            def deployDir = '/home/sammy/blue-salamander' // Replace with the actual deployment directory
            def remoteServer = 'sammy@134.209.223.74' // Replace with your server information            
            // Create a deployment directory if it doesn't exist
            sh "ssh ${remoteServer} mkdir -p ${deployDir}"
            
            // Copy the built application to the deployment directory
            sh "rsync -avz -e 'ssh' ${remoteServer} ${WORKSPACE}/build/ ${remoteServer}:${deployDir}/"
            
            // Restart your Node.js application (e.g., using pm2, systemd, or other process manager)
            sh "ssh ${remoteServer} 'cd ${deployDir} && npm install && pm2 restart app'"
        }
    }
}

    }
}