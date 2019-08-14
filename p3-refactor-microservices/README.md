

## CI/DC, Github & Code Quality

#### The project demonstrates an understanding of CI and Github. All project code is stored in a GitHub repository and a link to the repository has been provided for reviewers. The student uses a CI tool to build the application.



#### The project has a proper documentation. The README file includes introduction how to setup and deploy the project. It explains the main building blocks and has comments in the important files.

The project use continuous deployments (CD)

A CD tool is in place to deploy new version of the app automatically to production. The way is described and easy to follow.

Docker testing matrix: 

| component    | port | npm run dev | npm run prod |
|--------------|------|-------------|--------------|
| feed-service | 8080 | OK          | OK           |
| user-service | 8080 | OK          | OK           |
| frontend     | 8100 | OK          | N/A          |
| reverseproxy | 8080 | N/A         | N/A          |


Docker hub links: 

| component    | Dockerized                                                                                                            |
|--------------|-----------------------------------------------------------------------------------------------------------------------|
| feed-service | [udacity-c3-feed-service](https://cloud.docker.com/u/plasmafrog/repository/docker/plasmafrog/udacity-c3-feed-service) |
| user-service | [udacity-c3-user-service](https://cloud.docker.com/u/plasmafrog/repository/docker/plasmafrog/dacity-c3-user-service)  |
| frontend     | [udacity-frontend](https://hub.docker.com/r/plasmafrog/udacity-frontend)                                              |
| reverseproxy | [reverseproxy](https://hub.docker.com/r/plasmafrog/reverseproxy)                                                      |


## feed-service

## user-service

