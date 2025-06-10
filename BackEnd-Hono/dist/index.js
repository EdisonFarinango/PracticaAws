import { serve } from '@hono/node-server';
import { Hono } from 'hono';
// Importa tus rutas
import greet from '../dist/greet/greet.js';
const app = new Hono();
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
// Montar rutas
app.route('/', greet);
const port = 3000;
console.log(`✅ Server is running on http://localhost:${port}`);
serve({
    fetch: app.fetch,
    port,
});
