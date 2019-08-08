docker run --rm \
-e POSTGRES_USERNAME=$POSTGRES_USERNAME \
-e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
-e POSTGRES_DATABASE=$POSTGRES_DATABASE \
-e POSTGRES_HOST=$POSTGRES_HOST \
-e POSTGRES_AWS_REGION=$POSTGRES_AWS_REGION \
-e POSTGRES_AWS_PROFILE=$POSTGRES_AWS_PROFILE \
-e POSTGRES_AWS_MEDIA_BUCKET=$POSTGRES_AWS_MEDIA_BUCKET \
-e JWT_SECRET=$JWT_SECRET \
-e PORT_FEED_SERVICE=$PORT_FEED_SERVICE \
-e PORT_USER_SERVICE=$PORT_USER_SERVICE \
 --publish 8080:8080 \
 --name user plasmafrog/udacity-c3-user-service
