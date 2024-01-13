# CONFIGURACIONES AMBIENTE LOCAL.
## PARA LEVANTAR Y PONER EN FUNCIONALIDAD LOCALMENTE SE DEBERA TENER LA BASE DE DATOS EN ESTE CASO SU USO MYSQL.
## CONFIGURAR LOS PARAMETROS DE AMBIENTE LOCALES,que se encuentran en el archivo .env, donde: 
DB_HOST=localhost
DB_DATABASE=man_location_work<es EL NOMBRE DE LA INSTANCIA UTILIZADA>
DB_USER=root<NOMBRE DEL USUARIO DE BASE DE DATOS>
DB_PASSWORD=<ClaveDeLUsuarioDeLaBaseDeDatos>

## Para ejecucion local habilitar los 4 primeros parametros  y comentar los otros del atributo pool en el archivo database.js
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    //connectionLimit: 50, 
    //queueLimit: 60,      
    //waitForConnections: true,
    //socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})

## Si tiene problemas con el puerto de despliegue del server local, puede modificar el puerto en el archivo serve.js, en el ejemplo esta el puerto 4000
const PORT = process.env.PORT || 4000;

## Ubicarse en el directorio principal del proyecto y ejecutar:
npm run dev
Tambien puede ejecutar:
npm run start

# Ya se puede usar los distintos endpoint, por ejemplo:
## GET
localhost:4000/localizador/usuario/ubicacion/cvilela1979@gmail.com
localhost:4000/localizador/profesion/1
localhost:4000/localizador/profesion
localhost:4000/localizador/perfilestrabajo/
localhost:4000/localizador/perfilestrabajo/2
localhost:4000/localizador/usuario/nombreusuario/1
localhost:4000/localizador/calificacion/todos/


# CONFIGURACIONES PARA GOOGLE CLOUD RUN- NO LOCAL.
## Se tiene un archivo de configuracion y dockerizacion del proyecto para poder subirlo a un hosting externo o cloud, esta confiuración está en el archivo Dockerfile.

## Para levantar el server hay que condiderar los parámetros de ambiente que tiene valores necesarios para la funcionalidad correcta como la configuración de los parámetros de la BD.

## Para ejecucion correcta comentar únicamente el primer parametros  del atributo pool en el archivo database.js
const pool = mysql.createPool({
    //host: process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    user:process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionLimit: 50, 
    queueLimit: 60,      
    waitForConnections: true,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
})

## Si tiene problemas con el puerto de despliegue del server local, puede modificar el puerto en el archivo serve.js, en el ejemplo esta el puerto 8080
const PORT = process.env.PORT || 8080;

## Para nuestro caso desplegamos en gloud run el server, tenemos una cuenta en google cloud y localmente usamos el google clod shell para linea de comenado.
## Generamos el cloud, nos ubicamos en el directrio de proyecto desde la consola google cloud shell y ejecutamos:
gcloud builds submit --tag gcr.io/mitesisuoc/api-back-service --project=mitesisuoc
### Se agrego mitesisuoc que es el nombre de mi espacio en clod run, se agrego api-back-service que es elnombre que se le puso al proyecto a levantar
## Despues ejecutar la siguiente linea para agregar la instancia al google cloud run:
gcloud run deploy api-back-service --image gcr.io/mitesisuoc/api-back-service --add-cloudsql-instances mitesisuoc:us-central1:mysql --update-env-vars INSTANCE_CONNECTION_NAME=mitesisuoc:us-central1:mysql,DB_PASSWORD=rootejemplo,DB_DATABASE=man_location_work,DB_USER=root --platform managed --region us-central1 --allow-unauthenticated --project=mitesisuoc
### Se ejecuta la linea agregándose los parámetros de ambiente necesario el correcto despliegue y funcionalidad, notese que están los parámetros que usabamos de forma local y ahora en este despligue le enviamos por este medio como INSTANCE_CONNECTION_NAME, DB_PASSWORD , DB_DATABASE, DB_USER

# Ya se puede usar los distintos endpoint, por ejemplo:
## GET
https://api-back-service-3uomm4d6da-uc.a.run.app/localizador/usuario/ubicacion/cvilela1979@gmail.com
https://api-back-service-3uomm4d6da-uc.a.run.app/localizador/profesion/1
https://api-back-service-3uomm4d6da-uc.a.run.app/localizador/profesion
https://api-back-service-3uomm4d6da-uc.a.run.app/localizador/perfilestrabajo/
https://api-back-service-3uomm4d6da-uc.a.run.app/localizador/perfilestrabajo/2
https://api-back-service-3uomm4d6da-uc.a.run.app/localizador/usuario/nombreusuario/1
https://api-back-service-3uomm4d6da-uc.a.run.app/localizador/calificacion/todos/

## Hay que configurar los puntos entrantes que quieran consumir los servicios endpoint, como es el caso del front que consumira como servicio buestros endpoint, hay que indicar al server quien puede acceder a los endpoint y se deberá configurar en los cors que están en el archivo index.js:
app.use(cors({
    origin:["http://127.0.0.1:4200","http://localhost:4200", "https://carlosvilelag.github.io"]
}));

const io = socketIo(server, {
  cors: {
    origin: ["http://127.0.0.1:4200","http://localhost:4200","https://carlosvilelag.github.io"],
    methods: ["GET", "POST"]
  }
});

// Configuración de CORS para permitir múltiples orígenes, estos ejemplos son el origen de frontend.
const allowedOrigins = [
  "http://127.0.0.1:4200",
  "http://localhost:4200",
  "https://carlosvilelag.github.io" 
  
];
### Estas url son los puntos consumidores de nuestros endpoint "http://127.0.0.1:4200","http://localhost:4200", "https://carlosvilelag.github.io".


# Datos Generales
GOOGLE_PROJECT_ID=mitesisuocejemplo
CLOUD_RUN_SERVICE=api-back-service-ejemplo
INSTANCE_CONNECTION_NAME=mitesisuocejemplo:us-central1:ejemplomysql
DB_USER=rootejemplo
DB_PASS=root202311ejemplo
DB_NAME=man_location_workejemplo

## construye el contenedor usando gcloud
gcloud builds submit --tag gcr.io/mitesisuoc/api-back-service --project=mitesisuoc

## agregamos la instancia a cloud, gcloud
gcloud run deploy $CLOUD_RUN_SERVICE \ 
 --imagegcr.io/mitesisuoc/$CLOUD_RUN_SERVICE \
 --add-cloudsql-instances $INSTANCE_CONNECTION_NAME \
 --update-env-vars INSTANCE_CONNECTION_NAME=$INSTANCE_CONNECTION_NAME,DB_PASS=$DB_PASS,DB_NAME=$DB_NAME \
 --plattform managed \
 --region us-central1 \
 --allow-unauthenticated \
 --project=mitesisuocejemplo


## agregamos la instancia a cloud, gcloud en una sola linea
gcloud run deploy api-back-service --image gcr.io/mitesisuoc/api-back-service --add-cloudsql-instances mitesisuoc:us-central1:mysql --update-env-vars INSTANCE_CONNECTION_NAME=mitesisuoc:us-central1:mysql,DB_PASSWORD=root202311,DB_DATABASE=man_location_work,DB_USER=root --platform managed --region us-central1 --allow-unauthenticated --project=mitesisuoc

## Se agrego un scrit para la creación del ambiente de las estructuras de base de datos.
 Archivo de configuracion se encuentra en la ruta de db-setup, ahi se encontrara un archivo sql para ejecutar un import de mysql.