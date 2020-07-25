// export interface Productos {     //Esto es para probarlo con jsonplaceholders, pero no me funcionó por el tema de policy cors
//     "userId": number;
//     "id": number;
//     "title": string;
//     "body": string
// }

export interface Productos {
    "IdProducto": string;
    "nombreProducto": string;
    "imagenUrl": string;
    "cantidadDisponible": number;
    "precioUnitario": number
}
