GOOGLE_PROJECT_ID=mitesisuoc
CLOUD_RUN_SERVICE=api-back-service
INSTANCE_CONNECTION_NAME=mitesisuoc:us-central1:mysql
DB_USER=root
DB_PASS=root202311
DB_NAME=man_location_work

#construye el contenedor
gcloud build submit --tag gcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE --project=$GOOGLE_PROJECT_ID

#agregamos la instancia a cloud, 
gcloud run deploy $CLOUD_RUN_SERVICE \
 --imagegcr.io/$GOOGLE_PROJECT_ID/$CLOUD_RUN_SERVICE \
 --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
 --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_NAME=$DB_NAME \
 --plattform managed \
 --region us-central1 \
 --allow-unauthenticated \
 --project=$GOOGLE_PROJECT_ID