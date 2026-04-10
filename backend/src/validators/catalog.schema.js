import { z } from 'zod';

const productoSchema = z.object({
  nombreProducto: z.string().min(1, 'Nombre del producto es requerido'),
  imagenUrl: z.string().url('URL de imagen inválida'),
  cantidadDisponible: z
    .number()
    .int()
    .nonnegative('Cantidad disponible debe ser un entero no negativo'),
  precioUnitario: z.number().nonnegative('Precio unitario debe ser un número no negativo'),
  // Note: cantidadComprada is not part of the model but appears in actualizaInventario endpoint
  // We'll accept it but ignore it for backward compatibility during migration
  cantidadComprada: z.number().int().nonnegative().optional(),
});

const agregaCarritoSchema = z.object({
  idProducto: z.string().regex(/^[0-9a-fA-F]{24}$/, 'ID de producto debe ser un ObjectId válido'),
  cantidadCarrito: z.number().int().positive('Cantidad debe ser un entero positivo'),
});

export { productoSchema, agregaCarritoSchema };
