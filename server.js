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
    nombre: String,  // Ensure this field is included
    cantidad: Number,
    descripcion: String,
    numeroSerie: String,
    ubicacion: String
});
app.get('/api/piezas/bajo-stock', (req, res) => {
    Pieza.find({ cantidad: { $lt: 10 } }) // Example: finding pieces with stock less than 10
        .then(piezas => {
            res.json(piezas);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
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
    Pieza.find({})
        .then(piezas => {
            res.send(piezas);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Ruta para obtener las alertas de stock bajo
app.get('/api/alertas-stock-bajo', (req, res) => {
    AlertaStockBajo.find({}, (err, alertas) => {
        if (err) return res.status(500).send(err);
        res.status(200).send(alertas);
    });
});

app.post('/api/reabastecer', (req, res) => {
    // Implement your logic here
    // For example, update the stock quantity in the database
    const { almacen, cantidad } = req.body; // Assuming 'almacen' and 'cantidad' are passed in the request body

    // Example logic to update stock
    Pieza.updateOne({ ubicacion: almacen }, { $inc: { cantidad: cantidad } })
        .then(result => {
            if (result.modifiedCount === 0) {
                return res.status(404).send({ message: 'Almacén no encontrado o sin cambios en la cantidad.' });
            }
            res.status(200).send({ success: true, message: 'Stock reabastecido correctamente.' });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
});

// Ruta para generar una orden de reposición basada en una alerta de stock bajo
app.post('/api/generar-orden-reposicion', (req, res) => {
    // Aquí puedes implementar la lógica para generar la orden de reposición
    // Recibe los datos de la alerta de stock bajo en req.body
    // Realiza las acciones necesarias y devuelve una respuesta adecuada
    res.status(200).send({ success: true, message: 'Orden de reposición generada correctamente' });
});

// Ruta para generar una orden de compra
// Ruta para generar una orden de compra
app.post('/api/generar-orden-compra', async (req, res) => {
    console.log('Received data for order:', req.body);
    const { idPieza, cantidadRequerida } = req.body;

    try {
        const pieza = await Pieza.findById(idPieza);
        if (!pieza) {
            return res.status(404).send({ message: 'Pieza no encontrada' });
        }
        const nuevaOrdenCompra = {
            pieza: pieza.nombre,
            cantidad: cantidadRequerida,
            fechaOrden: new Date(),
            estado: 'Pendiente'
        };
        res.status(201).send({ success: true, ordenCompra: nuevaOrdenCompra });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
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