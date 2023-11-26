# Use the official lightweight Node.js image.
FROM node:20.9.0
# Create and change to the app directory.
WORKDIR /app
# Copiar todos los archivos del proyecto al contenedor
COPY . .
# Install production dependencies.
RUN npm install
# Indicar el puerto que la aplicación usará
EXPOSE 4000
# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
