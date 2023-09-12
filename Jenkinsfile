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
                echo 'Restarting app'
                sh 'pm2 restart app'
            }
        }
    }
}