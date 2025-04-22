// Importar Express y CORS
const express = require('express');
const cors = require('cors'); // Importar el paquete CORS

// Inicializar la aplicación Express
const app = express();

// Usar CORS para permitir solicitudes desde otros orígenes
app.use(cors());

// Definir el puerto para el servidor
const PORT = 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola Mundo con Node.js y Express!');
});

// Ruta para el ping
app.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong Farinango', // Respuesta "pong" cuando se hace ping
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
