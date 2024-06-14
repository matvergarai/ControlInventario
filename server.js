const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de bodyParser para analizar solicitudes JSON
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/inventario', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', function() {
    console.log('Conexión exitosa a la base de datos MongoDB');
});

// Definición de un modelo para el inventario
const Pieza = mongoose.model('Pieza', {
    cantidad: Number,
    descripcion: String,
    numeroSerie: String,
    ubicacion: String
});

// Ruta para obtener las alertas de stock bajo
app.get('/api/alertas-stock-bajo', (req, res) => {
    AlertaStockBajo.find({}, (err, alertas) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(alertas);
    });
});

// Ruta para obtener todas las piezas en el inventario
app.get('/api/piezas', (req, res) => {
    Pieza.find({}, (err, piezas) => {
        if (err) return res.status(500).json({ error: err.message });
        if (piezas.length === 0) {
            return res.status(404).json({ message: 'No hay Piezas' });
        }
        res.status(200).json(piezas);
    });
});

// Ruta para obtener las alertas de stock bajo
app.get('/api/alertas-stock-bajo', (req, res) => {
    AlertaStockBajo.find({}, (err, alertas) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(alertas);
    });
});

// Ruta para generar una orden de reposición basada en una alerta de stock bajo
app.post('/api/generar-orden-reposicion', (req, res) => {
    // Aquí puedes implementar la lógica para generar la orden de reposición
    // Recibe los datos de la alerta de stock bajo en req.body
    // Realiza las acciones necesarias y devuelve una respuesta adecuada
    res.status(200).send({ success: true, message: 'Orden de reposición generada correctamente' });
});

// Definición de un modelo para el historial de movimientos del inventario
const MovimientoInventario = mongoose.model('MovimientoInventario', {
    descripcion: String,
    fecha: Date,
    tipo: String
});

// Ruta para obtener el historial de movimientos del inventario
app.get('/api/historial-movimientos', (req, res) => {
    MovimientoInventario.find({}, (err, movimientos) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(movimientos);
    });
});

// Ruta para registrar un nuevo movimiento de inventario
app.post('/api/registrar-movimiento', (req, res) => {
    const nuevoMovimiento = new MovimientoInventario(req.body);
    nuevoMovimiento.save()
    .then(movimientoGuardado => {
        res.status(201).send(movimientoGuardado);
    })
    .catch(err => {
        res.status(500).send(err);
    });
});

// Ruta para registrar una nueva pieza en el inventario
// Ruta para obtener todas las piezas en el inventario
app.get('/api/piezas', (req, res) => {
    Pieza.find({}, (err, piezas) => {
        if (err) return res.status(500).send(err);
        if (piezas.length === 0) {
            return res.status(404).send('No hay Piezas');
        }
        res.status(200).send(piezas);
    });
});

// Ruta para registrar una nueva pieza en el inventario
app.post('/api/piezas', (req, res) => {
    const nuevaPieza = new Pieza(req.body);
    nuevaPieza.save()
        .then(piezaGuardada => {
            res.status(201).send(piezaGuardada);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});



// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});