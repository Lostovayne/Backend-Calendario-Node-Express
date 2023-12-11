# Backend-Calendario

Este es el backend para un proyecto de calendario desarrollado con React. Proporciona un sistema de inicio de sesión utilizando bcrypt, jwt y una base de datos MongoDB mediante mongoose.

## Comandos de inicio

Para comenzar a utilizar el backend-calendario, siga los siguientes pasos:

1. Clonar el repositorio: `git clone https://github.com/tu_usuario/backend-calendario.git`
2. Instalar las dependencias:
    
    ```bash
        npm install
    ```

3. Configurar las variables de entorno en un archivo `.env`:

## Environment Variables
    `MONGO_URI=your_mongodb_connection_string`
    `PORT=3000`


1. Ejecutar el servidor en modo de desarrollo: 
   ```bash
        npm run dev
    ```
2. Para ejecutar en producción: 
   
    ```bash
        npm run start
    ```

## Dependencias

El proyecto utiliza las siguientes dependencias:

- bcryptjs: "^2.4.3"
- express: "^4.18.2"
- express-validator: "^7.0.1"
- jsonwebtoken: "^9.0.2"
- mongoose: "^8.0.3"

## Estructura del proyecto

- `index.js`: Archivo principal que inicia el servidor Express y establece las rutas.
- `controllers/auth.js`: Contiene las funciones para el registro de usuarios, inicio de sesión y renovación de tokens.
- `database/config.js`: Configuración de la conexión a la base de datos MongoDB.
- `middlewares/field-validator.js`: Middleware para validar los campos en las solicitudes.
- `models/Usuario.js`: Definición del esquema del modelo de usuario para la base de datos.
- `public/index.html`: Archivo HTML estático de ejemplo.
- `public/style.css`: Archivo CSS de ejemplo.

## Contribuciones

Si desea contribuir a este proyecto, siéntase libre de enviar pull requests o abrir issues en el repositorio de GitHub: [https://github.com/tu_usuario/backend-calendario](https://github.com/tu_usuario/backend-calendario)

## Licencia

Este proyecto está bajo la licencia ISC. Para más información, consulte el archivo LICENSE.
