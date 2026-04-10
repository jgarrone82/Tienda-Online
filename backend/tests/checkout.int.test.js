import request from 'supertest';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import app from '../src/app.js';
import User from '../src/models/User.js';
import Product from '../src/models/Product.js';
import Cart from '../src/models/Cart.js';
import env from '../src/config/env.js';

describe('Checkout Integration Tests', () => {
  let token;
  let userId;

  beforeEach(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});

    // Create test user
    const hashedPassword = await bcryptjs.hash('password123', 10);
    const user = await User.create({
      usuario: 'testuser',
      correo: 'test@example.com',
      contrasena: hashedPassword,
    });
    userId = user._id;
    token = jwt.sign({ _id: user._id }, env.JWT_SECRET, { expiresIn: '1h' });
  });

  describe('POST /api/catalogo/agregaCarrito', () => {
    it('should add product to cart successfully', async () => {
      const product = await Product.create({
        nombreProducto: 'Test Product',
        imagenUrl: 'http://example.com/image.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      const response = await request(app)
        .post('/api/catalogo/agregaCarrito')
        .set('Authorization', `Bearer ${token}`)
        .send({
          idProducto: product._id.toString(),
          cantidadCarrito: 2,
        });

      expect(response.status).toBe(201);
      expect(response.body.resultado).toBe(true);

      const cart = await Cart.findOne({ idUsuario: userId });
      expect(cart).toBeDefined();
      expect(cart.productos).toHaveLength(1);
    });

    it('should reject without auth token', async () => {
      const product = await Product.create({
        nombreProducto: 'Test Product',
        imagenUrl: 'http://example.com/image.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      const response = await request(app).post('/api/catalogo/agregaCarrito').send({
        idProducto: product._id.toString(),
        cantidadCarrito: 2,
      });

      expect(response.status).toBe(403);
    });
  });

  describe('GET /api/catalogo/muestraCarrito', () => {
    it('should show cart contents', async () => {
      const product = await Product.create({
        nombreProducto: 'Test Product',
        imagenUrl: 'http://example.com/image.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      await Cart.create({
        idUsuario: userId,
        productos: [{ idProducto: product._id, cantidadCarrito: 2 }],
      });

      const response = await request(app)
        .get('/api/catalogo/muestraCarrito')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0].nombreProducto).toBe('Test Product');
      expect(response.body[0].cantidadCarrito).toBe(2);
    });

    it('should return 204 for empty cart', async () => {
      const response = await request(app)
        .get('/api/catalogo/muestraCarrito')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(204);
    });
  });

  describe('GET /api/catalogo/pagar', () => {
    it('should process payment successfully with sufficient stock', async () => {
      const product = await Product.create({
        nombreProducto: 'Test Product',
        imagenUrl: 'http://example.com/image.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      await Cart.create({
        idUsuario: userId,
        productos: [{ idProducto: product._id, cantidadCarrito: 2 }],
      });

      const response = await request(app)
        .get('/api/catalogo/pagar')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('OK PAGO');

      // Verify stock was deducted
      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct.cantidadDisponible).toBe(8);

      // Verify cart was deleted
      const cart = await Cart.findOne({ idUsuario: userId });
      expect(cart).toBeNull();
    });

    it('should rollback transaction on insufficient stock', async () => {
      const product1 = await Product.create({
        nombreProducto: 'Product 1',
        imagenUrl: 'http://example.com/image1.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      const product2 = await Product.create({
        nombreProducto: 'Product 2',
        imagenUrl: 'http://example.com/image2.jpg',
        cantidadDisponible: 1, // Insufficient stock
        precioUnitario: 200,
      });

      await Cart.create({
        idUsuario: userId,
        productos: [
          { idProducto: product1._id, cantidadCarrito: 5 },
          { idProducto: product2._id, cantidadCarrito: 10 }, // Requesting more than available
        ],
      });

      const response = await request(app)
        .get('/api/catalogo/pagar')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(400);
      expect(response.body.resultado).toBe('ERROR');
      expect(response.body.msg).toContain('Stock insuficiente');

      // Verify NO stock was deducted (transaction rolled back)
      const updatedProduct1 = await Product.findById(product1._id);
      expect(updatedProduct1.cantidadDisponible).toBe(10);

      // Verify cart still exists
      const cart = await Cart.findOne({ idUsuario: userId });
      expect(cart).not.toBeNull();
    });

    it('should reject payment without auth token', async () => {
      const response = await request(app).get('/api/catalogo/pagar');

      expect(response.status).toBe(403);
    });

    it('should return message for empty cart', async () => {
      const response = await request(app)
        .get('/api/catalogo/pagar')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('NO HAY PRODUCTOS PARA PAGAR');
    });
  });

  describe('GET /api/catalogo/cantidadProductos', () => {
    it('should return product count in cart', async () => {
      const product = await Product.create({
        nombreProducto: 'Test Product',
        imagenUrl: 'http://example.com/image.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      await Cart.create({
        idUsuario: userId,
        productos: [{ idProducto: product._id, cantidadCarrito: 2 }],
      });

      const response = await request(app)
        .get('/api/catalogo/cantidadProductos')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.text).toBe('1');
    });

    it('should return 0 for empty cart', async () => {
      const response = await request(app)
        .get('/api/catalogo/cantidadProductos')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.text).toBe('0');
    });
  });
});
