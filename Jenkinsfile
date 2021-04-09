pipeline {
    agent any 
    stages {
        stage('Checkout SCM') {
            steps { 
                checkout scm
            }
        }
        stage('Build') {
            steps {
                sh 'docker build -t rampup .'
            }
        }
        stage('Test') {
            steps {
                sh 'docker run --rm rampup npm test'
            }
        }
        stage('Pack') {
            steps {
                sh 'docker run -v \$(pwd)/:/data --rm rampup npm pack'
                sh 'ls -l'
            }
        }
        stage('Remote SSH') {
            steps {
                withAWS(credentials:'aws-key') {
                    sshagent(['jenkins-key']) { // ansible private ip
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 'ansible-playbook ~/movie-ramp-up/ansible/add-key.yml -i ~/movie-ramp-up/ansible/ec2.py -l tag_Name_Front_EC2_Terra_juan_bolanosr --key-file ~/key-pair-JB.pem --user ubuntu'"
                        sh "ssh -o StrictHostKeyChecking=no ec2-user@10.1.5.209 'ansible-playbook ~/movie-ramp-up/ansible/ui.yml -i ~/movie-ramp-up/ansible/ec2.py -l tag_Name_Front_EC2_Terra_juan_bolanosr --user ubuntu'"
                    }
                } 
            }
        }
    }
}
