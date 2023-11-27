const express = require("express");
const http = require('http'); // Importa el módulo http
const socketIo = require('socket.io'); // Importa socket.io
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");

const ubicacionesRouter = require('./ubicaciones');
const usuariosRouter = require('./usuarios');
const perfilTrabajoRouter = require('./perfil_trabajo');
const contratos = require('./contrato');
const profesion = require('./profesion');
const { testDbConnection } = require('./testdb');

//Configuracion inicial
const app = express(); /// se crea una instancia de express
const server = http.createServer(app); // Crea un servidor HTTP con Express
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200", // Ajusta esto para permitir conexiones desde el origen de Angular
    methods: ["GET", "POST"]
  }
});
// Configuraciones de socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado con socket.io');
  
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  // Más manejo de eventos de socket.io aquí...
});

///Middlewares
app.use(cors({
    origin:["http://127.0.0.1:4200","http://localhost:4200"]
}));
app.use(morgan("dev"));
app.use(express.json());

// Middleware para rutas de ubicaciones
app.use('/localizador', ubicacionesRouter);

app.use('/localizador', usuariosRouter);

app.use('/localizador', perfilTrabajoRouter);
app.use('/localizador', contratos);
app.use('/localizador', profesion);

// Configuracion del puerto
const PORT = app.get("port") || 8080;

server.listen(PORT, () => { // Ahora usas server.listen en lugar de app.listen
  console.log(`Servidor escuchando comunicaciones en el puerto ${PORT}`);
});

// testeo de Server Conexion
app.get('/test', async (req, res) => {
  try {
      const result = await testDbConnection();
      res.send(result);
  } catch (error) {
    console.log('Error controlado');
      res.status(500).send(`:::Error al conectar a la base de datos:  ${error.message}`);
  }
});
// testeo de Server levantado
app.get('/', async(req,res)=>{
  res.json({ status: 'Backend con Node js - Express + Crud Api + mysql'});
});
