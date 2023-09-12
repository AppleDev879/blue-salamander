#!/usr/bin/env groovy

pipeline {

    agent any

    tools {
        nodejs "node"
    }

    environment {
        PM2_HOME = '/usr/local/bin/pm2'
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
                echo 'Restarting app'
                sh 'pm2 restart app'
            }
        }
    }
}