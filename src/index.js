const express = require("express");
const morgan = require("morgan");
const database = require("./database");
const cors = require("cors");

const ubicacionesRouter = require('./ubicaciones');
const usuariosRouter = require('./usuarios');
const perfilTrabajoRouter = require('./perfil_trabajo');
const contratos = require('./contrato');

//Configuracion inicial
const app = express(); /// se crea una instancia de express
app.set("port", 4000);
app.listen(app.get("port"));
console.log("Escuchando comunicacones al puerto " + app.get("port"));

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

//Rutas - endpoint
app.get("/localizador", async (req, res) => {
  try {
    const conection = await database.getConnection();
    const query = "SELECT * from usuario";
    const result = await conection.query(query);
    res.json(result);
  } catch (error) {
    console.error("Error en la conexión o la consulta:", error);
    // Enviar un mensaje de error como respuesta
    res.status(500).json({ error: error.message });
  }
});