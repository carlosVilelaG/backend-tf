# create image docker:
GOOGLE_PROJECT_ID=mitesisuocejemplo
CLOUD_RUN_SERVICE=api-back-service-ejemplo
INSTANCE_CONNECTION_NAME=mitesisuocejemplo:us-central1:ejemplomysql
DB_USER=rootejemplo
DB_PASS=root202311ejemplo
DB_NAME=man_location_workejemplo

# construye el contenedor usando gcloud
gcloud build submit --tag gcr.io/mitesisuoc/$CLOUD_RUN_SERVICE --project=mitesisuoc

gcloud builds submit --tag gcr.io/mitesisuoc/api-back-service --project=mitesisuoc

# agregamos la instancia a cloud, gcloud
gcloud run deploy $CLOUD_RUN_SERVICE \ 
 --imagegcr.io/mitesisuoc/$CLOUD_RUN_SERVICE \
 --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
 --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_NAME=$DB_NAME \
 --plattform managed \
 --region us-central1 \
 --allow-unauthenticated \
 --project=mitesisuocejemplo


# agregamos la instancia a cloud, gcloud en una sola linea
gcloud run deploy api-back-service --image gcr.io/mitesisuoc/api-back-service --add-cloudsql-instances mitesisuoc:us-central1:mysql --update-env-vars INSTANCE_CONNECTION_NAME=mitesisuoc:us-central1:mysql,DB_PASSWORD=root202311,DB_DATABASE=man_location_work,DB_USER=root --platform managed --region us-central1 --allow-unauthenticated --project=mitesisuoc