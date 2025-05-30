// Importar Express
const express = require('express');

// Inicializar la aplicación Express
const app = express();

// Middleware para leer JSON en el cuerpo de la solicitud
app.use(express.json());

// Definir el puerto para el servidor
const PORT = 3000;

// Datos simulados
let libros = [
    { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez' },
    { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes' },
    { id: 3, titulo: 'La Sombra del Viento', autor: 'Carlos Ruiz Zafón' }
];

// Función para generar nuevos IDs
const generarId = () => {
    return libros.length ? Math.max(...libros.map(libro => libro.id)) + 1 : 1;
};

// 1. GET /libros - Lista todos los libros o filtra por autor
app.get('/libros', (req, res) => {
    const { autor } = req.query;

    if (autor) {
        const filtrados = libros.filter(l => l.autor.toLowerCase().includes(autor.toLowerCase()));
        return res.json(filtrados);
    }

    res.json(libros);
});

// 2. GET /libros/:id - Obtener libro por ID
app.get('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libro = libros.find(l => l.id === id);

    if (libro) {
        res.json(libro);
    } else {
        res.status(404).json({ mensaje: 'Libro no encontrado' });
    }
});

// 3. POST /libros - Agregar nuevo libro
app.post('/libros', (req, res) => {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: 'Faltan datos: título y autor son requeridos' });
    }

    const nuevoLibro = {
        id: generarId(),
        titulo,
        autor
    };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

// 4. PUT /libros/:id - Actualizar libro existente
app.put('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libroIndex = libros.findIndex(l => l.id === id);

    if (libroIndex === -1) {
        return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
        return res.status(400).json({ mensaje: 'Faltan datos: título y autor son requeridos' });
    }

    libros[libroIndex] = { id, titulo, autor };
    res.json(libros[libroIndex]);
});

// 5. DELETE /libros/:id - Eliminar libro
app.delete('/libros/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const libroIndex = libros.findIndex(l => l.id === id);

    if (libroIndex === -1) {
        return res.status(404).json({ mensaje: 'Libro no encontrado' });
    }

    const libroEliminado = libros.splice(libroIndex, 1);
    res.json({ mensaje: 'Libro eliminado', libro: libroEliminado[0] });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
