import { Hono } from 'hono';
import { Greet } from './greet.mysql.js';
const greet = new Hono();
greet.get('/regards', async (c) => {
    try {
        const data = await Greet.findAll();
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: 'Error al obtener los saludos' }, 500);
    }
});
greet.get('/greet/stats', async (c) => {
    try {
        const data = await Greet.stats();
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: 'Error al obtener las estadísticas' }, 500);
    }
});
greet.get('/greet/:id', async (c) => {
    try {
        const id = Number(c.req.param('id'));
        const data = await Greet.findById(id);
        if (!data) {
            return c.json({ error: 'Saludo no encontrado' }, 404);
        }
        return c.json(data);
    }
    catch (error) {
        return c.json({ error: 'Error al obtener el saludo' }, 500);
    }
});
greet.post('/greet', async (c) => {
    try {
        const param = await c.req.json();
        const data = await Greet.create(param);
        return c.json(data, 201);
    }
    catch (error) {
        console.error('Error al crear el saludo:', error);
        return c.json({ error: 'Error al crear el saludo' }, 500);
    }
});
greet.delete('/greet/:id', async (c) => {
    try {
        const id = Number(c.req.param('id'));
        const success = await Greet.delete(id);
        if (!success) {
            return c.json({ error: 'Saludo no encontrado' }, 404);
        }
        return c.json({ message: 'Saludo eliminado' });
    }
    catch (error) {
        return c.json({ error: 'Error al eliminar el saludo' }, 500);
    }
});
greet.put('/greet/:id', async (c) => {
    try {
        const id = Number(c.req.param('id'));
        const param = await c.req.json();
        const success = await Greet.update(id, param);
        if (!success) {
            return c.json({ error: 'Saludo no encontrado' }, 404);
        }
        return c.json({ message: 'Saludo actualizado' });
    }
    catch (error) {
        return c.json({ error: 'Error al actualizar el saludo' }, 500);
    }
});
export default greet;
