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
                sh 'npm install' // Only if you're using local modules or JS libs
            }
        }

        stage('Run K6 Performance Test') {
            steps {
                sh 'k6 run loginout.js'
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
