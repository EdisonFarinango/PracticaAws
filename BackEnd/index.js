// Importar Express y CORS
const express = require('express');
const cors = require('cors');

// Inicializar la aplicación Express
const app = express();

// Middleware para permitir CORS y leer JSON en el cuerpo de las peticiones
app.use(cors());
app.use(express.json()); // Muy importante para que funcione req.body

// Definir el puerto para el servidor
const PORT = 3000;

// Ruta principal
app.get('/', (req, res) => {
    res.send('¡Hola Mundo con Node.js y Express!');
});

// Ruta para el ping
app.get('/ping', (req, res) => {
    res.status(200).json({
        message: 'pong',
    });
});

// Ruta POST para recibir datos
app.post('/datos', (req, res) => {
    const { nombre, edad } = req.body;

    // Validar que los datos existen
    if (!nombre || !edad) {
        return res.status(400).json({
            error: 'Faltan datos: nombre y edad son requeridos',
        });
    }

    // Responder con los datos recibidos
    res.status(200).json({
        message: 'Datos recibidos correctamente',
        datos: {
            nombre,
            edad,
        },
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
