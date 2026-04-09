const request = require('supertest');
// Removed unused mongoose import
const app = require('../src/app');
const Product = require('../src/models/Product');

describe('Products Integration Tests', () => {
  beforeEach(async () => {
    await Product.deleteMany({});
  });

  describe('GET /api/catalogo/cargueProductos', () => {
    it('should return empty array when no products', async () => {
      const response = await request(app).get('/api/catalogo/cargueProductos');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

    it('should return all products', async () => {
      await Product.create({
        nombreProducto: 'Product 1',
        imagenUrl: 'http://example.com/image1.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      await Product.create({
        nombreProducto: 'Product 2',
        imagenUrl: 'http://example.com/image2.jpg',
        cantidadDisponible: 20,
        precioUnitario: 200,
      });

      const response = await request(app).get('/api/catalogo/cargueProductos');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0].nombreProducto).toBe('Product 1');
      expect(response.body[1].nombreProducto).toBe('Product 2');
    });
  });

  describe('GET /api/catalogo/inventarioInicial', () => {
    it('should initialize products from baseProductos.json', async () => {
      const response = await request(app).get('/api/catalogo/inventarioInicial');

      expect(response.status).toBe(200);
      expect(response.body.resultado).toBe('OK');
    });

    it('should return message if products already exist', async () => {
      await Product.create({
        nombreProducto: 'Existing Product',
        imagenUrl: 'http://example.com/image.jpg',
        cantidadDisponible: 10,
        precioUnitario: 100,
      });

      const response = await request(app).get('/api/catalogo/inventarioInicial');

      expect(response.status).toBe(200);
      expect(response.body.msg).toBe('baseProductos.json ya existia');
    });
  });

  describe('POST /api/catalogo/actualizaInventario', () => {
    it('should create a new product', async () => {
      const response = await request(app).post('/api/catalogo/actualizaInventario').send({
        nombreProducto: 'New Product',
        imagenUrl: 'http://example.com/image.jpg',
        cantidadDisponible: 50,
        precioUnitario: 150,
      });

      expect(response.status).toBe(200);
      expect(response.body.resultado).toBe('OK');
      expect(response.body.msg).toBe('Se cargaron los productos correctamente');

      const product = await Product.findOne({ nombreProducto: 'New Product' });
      expect(product).toBeDefined();
      expect(product.cantidadDisponible).toBe(50);
    });

    it('should reject invalid product data', async () => {
      const response = await request(app).post('/api/catalogo/actualizaInventario').send({
        nombreProducto: '',
        imagenUrl: 'invalid-url',
        cantidadDisponible: -10,
        precioUnitario: -100,
      });

      expect(response.status).toBe(400);
      expect(response.body.resultado).toBe('ERROR');
    });

    it('should reject missing required fields', async () => {
      const response = await request(app).post('/api/catalogo/actualizaInventario').send({
        nombreProducto: 'Product without price',
      });

      expect(response.status).toBe(400);
      expect(response.body.resultado).toBe('ERROR');
    });
  });
});
