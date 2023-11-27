# Use the official lightweight Node.js image.
FROM node:20.9.0
# Create and change to the app directory.
WORKDIR /app
# Copiar el archivo 'package.json'
COPY package.json .
# Install production dependencies.
RUN npm install
# Copiar todos los archivos del proyecto al contenedor
COPY . .
# Indicar el puerto que la aplicación usará
EXPOSE 8080
# Comando para iniciar la aplicación
CMD [ "npm", "start" ]
