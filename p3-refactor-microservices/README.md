# Overview

## Components 

Each component is contained in a dedicated sub-folder in the present repo. 

Each component:
1. Has a `Dockerfile`
1. Is deployed to docker-hub
1. Has a k8s deployment in the `/udacity-c3-deployment/k8s-deployments` folder
1. Has a corresponding k8s service in the `/udacity-c3-deployment/k8s-services` folder
1. Has been deployed to kubernetes live cluster

For local testing; 
1. Scripts for testing straight typescript code are found in the root directory, for example `run-feed-service-local-dev.sh`. 
1. Scripts for testing the created docker images are found, for example `run-feed-service-docker.sh`. 
1. A script for running all containers is also created; `run-docker-compose-up.sh`. 

These scripts depend on the `.env` file, which is not deployed to GitHub for security reasons. 

### feed-service
/udacity-c3-restapi-feed

### user-service
/udacity-c3-restapi-user

### reverseproxy
/udacity-c3-restapi-reverseproxy

### frontend
/udacity-c3-frontend



## Secret and configuration management

### Local secrets 
A `.env` file is executed to load environments. The .aws folder is mounted. 

### Kubernetes secrets 

`aws-secret.yaml` and `.env-secret.yaml` are git-ignored for security. They contain; 

| Environment Variables     |
|---------------------------|
| POSTGRES_USERNAME         |
| POSTGRES_PASSWORD         |
| POSTGRES_DATABASE         |
| POSTGRES_HOST             |
| POSTGRES_AWS_REGION       |
| POSTGRES_AWS_PROFILE      |
| POSTGRES_AWS_MEDIA_BUCKET |
| JWT_SECRET                |

AWS credentials

$HOME/.aws_udacity:/root/.aws

Confirmed deployment: 
```
> k get secrets
NAME                  TYPE                                  DATA   AGE
aws-secret            Opaque                                2      45m
default-token-7zmv7   kubernetes.io/service-account-token   3      24h
env-secret            Opaque                                8      45m
```

### k8s configmaps

| Environment Variables |
|-----------------------|
| URL                   |

Confirmed: 
```
NAME         DATA   AGE
env-config   1      46m
```


## Criteria completion

### Criteria section: CI/DC, Github & Code Quality

---

> The project demonstrates an understanding of CI and Github. All project code is stored in a GitHub repository and a link to the repository has been provided for reviewers. The student uses a CI tool to build the application.

(Present github repo)

Travis 


---

>The project has a proper documentation. The README file includes introduction how to setup and deploy the project. It explains the main building blocks and has comments in the important files.

(See above overview section)

---

> The project use continuous deployments (CD). A CD tool is in place to deploy new version of the app automatically to production. The way is described and easy to follow.


### Criteria section: Container

> The app is containerized. There is a Dockerfile in repo and the docker image can be build. 

Dockerfile exists in each component folder. 

Docker testing matrix: 

| component    | port | npm run dev | npm run prod |
|--------------|------|-------------|--------------|
| feed-service | 8080 | OK          | OK           |
| user-service | 8080 | OK          | OK           |
| frontend     | 8100 | OK          | N/A          |
| reverseproxy | 8080 | N/A         | N/A          |

---

> The project have public docker images. On DockerHub images for the application are available.


Docker hub links: 

| component    | Dockerized                                                                                                            |
|--------------|-----------------------------------------------------------------------------------------------------------------------|
| feed-service | [udacity-c3-feed-service](https://cloud.docker.com/u/plasmafrog/repository/docker/plasmafrog/udacity-c3-feed-service) |
| user-service | [udacity-c3-user-service](https://cloud.docker.com/u/plasmafrog/repository/docker/plasmafrog/dacity-c3-user-service)  |
| frontend     | [udacity-frontend](https://hub.docker.com/r/plasmafrog/udacity-frontend)                                              |
| reverseproxy | [reverseproxy](https://hub.docker.com/r/plasmafrog/reverseproxy)                                                      |

---

> The applications runs in a container without errors. Starting the app as a container on a local system. 

Shell scripts are provided for each component, as well as a master docker-compose shell script. Environment variables are loaded by a `.env` script (not pushed to Github for security reasons). 

---

### Criteria section: Deployment

---

> The application runs on a cluster in the cloud. The project can be deployed to a kubernetes cluster. 

Kubernetes nodes:
```
ip-172-31-27-34.us-east-2.compute.internal    Ready    master   4h4m   v1.14.2
ip-172-31-37-143.us-east-2.compute.internal   Ready    master   4h2m   v1.14.2
ip-172-31-4-105.us-east-2.compute.internal    Ready    master   4h5m   v1.14.2
```

---

> The app can be upgraded via rolling-update. The students can deploy a new version of the application without downtime. 

---

> A/B deployment of the application. Two versions of the 
same app can run at the same and service traffic. 

---

 > Monitoring. The application is monitored by Amazon CloudWatch