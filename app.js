// app.js

const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// lista de productos en memoria
const productos = [];

// ruta principal con formulario HTML
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

// ruta para agregar productos desde formulario
app.post('/productos', (req, res) => {
    const { nombre, precio } = req.body;
    if (!nombre || !precio) {
        return res.status(400).send('Faltan datos');
    }
    productos.push({ nombre, precio: parseFloat(precio) });
    res.redirect('/');
});

// ruta para obtener productos en formato JSON (opcional)
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

// iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


/*
explicación:

esta implementación es monolítica porque:
- toda la lógica (presentación HTML, almacenamiento de datos, manejo de rutas y servidor) está en un solo archivo (app.js).
- no se separan responsabilidades como vistas, lógica de negocio, y persistencia.

desventajas:
- escalabilidad limitada: conforme el proyecto crezca, este archivo será más difícil de mantener.
- difícil de probar: la lógica está acoplada.
- reutilización pobre: no se pueden reutilizar fácilmente partes del código.
- mantenimiento complejo: cualquier cambio puede afectar a otras partes del código. */
