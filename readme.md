# create image docker:
GOOGLE_PROJECT_ID=mitesisuocejemplo
CLOUD_RUN_SERVICE=api-back-service-ejemplo
INSTANCE_CONNECTION_NAME=mitesisuocejemplo:us-central1:ejemplomysql
DB_USER=rootejemplo
DB_PASS=root202311ejemplo
DB_NAME=man_location_workejemplo

# construye el contenedor usando gcloud
gcloud build submit --tag gcr.io/mitesisuoc/$CLOUD_RUN_SERVICE --project=mitesisuoc

# agregamos la instancia a cloud, gcloud
gcloud run deploy $CLOUD_RUN_SERVICE \ 
 --imagegcr.io/mitesisuoc/$CLOUD_RUN_SERVICE \
 --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
 --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_NAME=$DB_NAME \
 --plattform managed \
 --region us-central1 \
 --allow-unauthenticated \
 --project=mitesisuocejemplo
