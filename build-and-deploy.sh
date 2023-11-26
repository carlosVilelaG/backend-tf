#! /bin/bash

# ejecute en terminal el archivo sh : ./build-and-deploy.sh
echo "Iniciando el script de despliegue"
export PROJECT_ID=mitesisuoc
export REGION=us-central1

# export CONNECTION_NAME=tabs-vs-spaces-297517:europe-north1:poll-database
export CONNECTION_NAME=mitesisuoc:us-central1:mysql
echo "compilando..."

# envio de compilacion a cloud
gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/poll \
  --project $PROJECT_ID

echo "Compilado.."

# tome el contenedor y lo implemnenta en un nuevo servicio CloudRun
echo "Iniciando la implementacion Cloud Run"

gcloud run deploy poll \
  --image gcr.io/$PROJECT_ID/poll \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --add-cloudsql-instances $CONNECTION_NAME \