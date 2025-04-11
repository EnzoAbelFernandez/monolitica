// app.js

const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para leer JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lista de productos en memoria
const productos = [];

// Ruta principal con formulario HTML
app.get('/', (req, res) => {
    let listaProductos = productos.map(p => `<li>${p.nombre} - $${p.precio}</li>`).join('');
    if (!listaProductos) listaProductos = '<li>No hay productos aún.</li>';

    res.send(`
        <html>
            <head><title>Productos</title></head>
            <body>
                <h1>Agregar producto</h1>
                <form method="POST" action="/productos">
                    <input name="nombre" placeholder="Nombre del producto" required />
                    <input name="precio" placeholder="Precio" type="number" step="0.01" required />
                    <button type="submit">Agregar</button>
                </form>
                <h2>Lista de productos</h2>
                <ul>${listaProductos}</ul>
            </body>
        </html>
    `);
});

// Ruta para agregar productos desde formulario
app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).send('Faltan datos');
    }
    productos.push({ nombre, precio: parseFloat(precio) });
    res.redirect('/');
});

// Ruta para obtener productos en formato JSON (opcional)
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*
Explicación:

Esta implementación es monolítica porque:
- Toda la lógica (presentación HTML, almacenamiento de datos, manejo de rutas y servidor) está en un solo archivo (app.js).
- No se separan responsabilidades como vistas, lógica de negocio, y persistencia.

Desventajas:
- Escalabilidad limitada: conforme el proyecto crezca, este archivo será más difícil de mantener.
- Difícil de probar: la lógica está acoplada.
- Reutilización pobre: no se pueden reutilizar fácilmente partes del código.
- Mantenimiento complejo: cualquier cambio puede afectar a otras partes del código. */
