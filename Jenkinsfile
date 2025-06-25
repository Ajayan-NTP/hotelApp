pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Ajayan-NTP/hotelApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Run K6 Performance Test') {
            steps {
                bat 'k6 run loginout.js'
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'resultin&out.html', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Test completed!'
        }
    }
}
