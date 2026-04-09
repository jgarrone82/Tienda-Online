const request = require('supertest');
// Removed unused mongoose import
const app = require('../src/app');
const User = require('../src/models/User');

describe('Auth Integration Tests', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/nuevoUsuario', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app).post('/api/auth/nuevoUsuario').send({
        nombre: 'testuser',
        correo: 'test@example.com',
        contrasena1: 'password123',
        contrasena2: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body.resultado).toBe('SI');
      expect(response.body.msg).toBe('Usuario creado correctamente. Ya puede iniciar sesión');
      expect(response.body.token).toBeDefined();
    });

    it('should reject duplicate email', async () => {
      await User.create({
        usuario: 'existinguser',
        correo: 'test@example.com',
        contrasena: 'hashedpassword',
      });

      const response = await request(app).post('/api/auth/nuevoUsuario').send({
        nombre: 'testuser',
        correo: 'test@example.com',
        contrasena1: 'password123',
        contrasena2: 'password123',
      });

      expect(response.status).toBe(409);
      expect(response.body.resultado).toBe('NO');
    });

    it('should reject invalid email format', async () => {
      const response = await request(app).post('/api/auth/nuevoUsuario').send({
        nombre: 'testuser',
        correo: 'invalid-email',
        contrasena1: 'password123',
        contrasena2: 'password123',
      });

      expect(response.status).toBe(400);
      expect(response.body.resultado).toBe('NO');
    });

    it('should reject short password', async () => {
      const response = await request(app).post('/api/auth/nuevoUsuario').send({
        nombre: 'testuser',
        correo: 'test@example.com',
        contrasena1: 'short',
        contrasena2: 'short',
      });

      expect(response.status).toBe(400);
      expect(response.body.resultado).toBe('NO');
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const bcryptjs = require('bcryptjs');
      const hashedPassword = await bcryptjs.hash('password123', 10);
      await User.create({
        usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: hashedPassword,
      });
    });

    it('should login successfully with valid credentials', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        pass: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.body.resultado).toBe('Autorizado');
      expect(response.body.token).toBeDefined();
    });

    it('should reject invalid password', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        pass: 'wrongpassword',
      });

      expect(response.status).toBe(401);
      expect(response.body.resultado).toBe('Acceso Denegado');
    });

    it('should reject non-existent user', async () => {
      const response = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        pass: 'password123',
      });

      expect(response.status).toBe(401);
      expect(response.body.resultado).toBe('Acceso Denegado');
    });
  });

  describe('GET /api/auth/datosPrivados', () => {
    let token;

    beforeEach(async () => {
      const bcryptjs = require('bcryptjs');
      const jwt = require('jsonwebtoken');
      const env = require('../src/config/env');

      const hashedPassword = await bcryptjs.hash('password123', 10);
      const user = await User.create({
        usuario: 'testuser',
        correo: 'test@example.com',
        contrasena: hashedPassword,
      });

      token = jwt.sign({ _id: user._id }, env.JWT_SECRET, { expiresIn: '1h' });
    });

    it('should access protected route with valid token', async () => {
      const response = await request(app)
        .get('/api/auth/datosPrivados')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.resultado).toBe('SI');
      expect(response.body.msg).toBe('Acceso Concedido');
    });

    it('should reject access without token', async () => {
      const response = await request(app).get('/api/auth/datosPrivados');

      expect(response.status).toBe(403);
    });

    it('should reject access with invalid token', async () => {
      const response = await request(app)
        .get('/api/auth/datosPrivados')
        .set('Authorization', 'Bearer invalid-token');

      expect(response.status).toBe(401);
    });
  });
});
