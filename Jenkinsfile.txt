pipeline {
    agent { label 'docker-agent' }

    environment {
        APP_NAME = 'foodexpress-api'
        IMAGE_NAME = 'foodexpress-api:latest'
        CONTAINER_NAME = 'foodexpress-api-container'
        APP_PORT = '3000'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run New Container') {
            steps {
                sh '''
                docker run -d \
                  --name $CONTAINER_NAME \
                  -p $APP_PORT:$APP_PORT \
                  $IMAGE_NAME
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh 'sleep 5'
                sh 'curl http://localhost:3000/'
                sh 'curl http://localhost:3000/api/menu'
                sh 'curl http://localhost:3000/api/orders'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully. API deployed on Jenkins Agent.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
