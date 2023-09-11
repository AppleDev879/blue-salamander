#!/usr/bin/env groovy

pipeline {

    agent any

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