const app = require('../src/index');
const request = require('supertest');

  
describe('Endpoints de contratos', () => {
 
  describe('GET /contrato/usuario/:id_usuario_trabajador', () => {
    test('debería obtener contratos para un usuario trabajador', async () => {
      const response = await request(app)
        .get('/localizador/contrato/usuario/3'); // Usa un id de usuario que exista en tu base de datos de prueba

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('id_contrato');
    });
  });

  describe('GET /contrato/relacionado/:id_usuario', () => {
    test('debería obtener contratos relacionados a un contratista', async () => {
      const response = await request(app)
        .get('/localizador/contrato/relacionado/1'); // Usa un id de usuario que exista en tu base de datos de prueba

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      // Agrega más expectativas según lo que esperas de la respuesta
    });
  });

  test('debería responder con un error 404 para un usuario sin contratos', async () => {
    const idUsuario = 999; // Un ID que sepas que no tiene contratos asociados
    const response = await request(app).get(`/localizador/contrato/relacionado/${idUsuario}`);

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: "No se encontraron contratos relacionado con el usuario",
    });
  });

});
