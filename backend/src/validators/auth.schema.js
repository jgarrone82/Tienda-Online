import { z } from 'zod';

const registerSchema = z
  .object({
    nombre: z.string().min(1, 'El nombre es requerido'),
    correo: z.string().email('Correo inválido'),
    contrasena1: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
    contrasena2: z.string().min(1, 'La confirmación de contraseña es requerida'),
  })
  .refine((data) => data.contrasena1 === data.contrasena2, {
    message: 'Las contraseñas no coinciden',
    path: ['contrasena2'],
  });

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  pass: z.string().min(1, 'La contraseña es requerida'),
});

export { registerSchema, loginSchema };
