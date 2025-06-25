pipeline {
    agent any

    environment {
        K6_HOME = 'C:\\k6' // Update this path if K6 is installed elsewhere
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/Ajayan-NTP/hotelApp.git', branch: 'main'
            }
        }

        stage('Run K6 Performance Test') {
            steps {
                bat 'k6 run loginout.js'
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: '**/*.html, **/*.json', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Test completed!'
        }
    }
}
