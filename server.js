const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const ExcelJS = require('exceljs');
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
    tipo: String,
    cantidad: Number,
    pieza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pieza' } // Referencia a la pieza
    
});

// Ruta para obtener el historial de movimientos del inventario
app.get('/api/historial-movimientos', (req, res) => {
    MovimientoInventario.find({})
        .populate('pieza') // Popula la referencia a la pieza
        .exec()
        .then(movimientos => {
            res.status(200).send(movimientos);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Ruta para registrar un nuevo movimiento de inventario
app.post('/api/registrar-movimiento', (req, res) => {
    if (!req.body.pieza || !req.body.pieza._id) {
        return res.status(400).send({ error: 'Pieza no especificada o ID de pieza faltante' });
    }

    const nuevoMovimiento = new MovimientoInventario({
        ...req.body,
        pieza: req.body.pieza._id // Asegúrate de que el ID de la pieza se pase correctamente
    });

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

// Ruta para exportar datos a PDF
app.post('/api/exportar-reporte', (req, res) => {
    const { formato, datos } = req.body;

    if (formato === 'pdf') {
        const doc = new PDFDocument();
        let filename = `reporte_movimientos.pdf`;
        filename = encodeURIComponent(filename);
        res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"');
        res.setHeader('Content-type', 'application/pdf');
        doc.pipe(res);

        doc.fontSize(18).text('Historial de Movimientos', { align: 'center' });
        doc.moveDown();

        datos.forEach(movimiento => {
            doc.fontSize(12).text(`Fecha: ${movimiento.fecha}`);
            doc.fontSize(12).text(`Descripción: ${movimiento.descripcion}`);
            doc.fontSize(12).text(`Tipo: ${movimiento.tipo}`);
            doc.fontSize(12).text(`Cantidad: ${movimiento.cantidad}`);
            doc.moveDown();
        });

        doc.end();
    } else if (formato === 'xlsx') {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Historial de Movimientos');

        worksheet.columns = [
            { header: 'Fecha', key: 'fecha', width: 20 },
            { header: 'Descripción', key: 'descripcion', width: 30 },
            { header: 'Tipo', key: 'tipo', width: 20 },
            { header: 'Cantidad', key: 'cantidad', width: 10 }
        ];

        datos.forEach(movimiento => {
            worksheet.addRow({
                fecha: movimiento.fecha,
                descripcion: movimiento.descripcion,
                tipo: movimiento.tipo,
                cantidad: movimiento.cantidad
            });
        });

        res.setHeader('Content-disposition', 'attachment; filename=reporte_movimientos.xlsx');
        res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        workbook.xlsx.write(res)
            .then(() => {
                res.end();
            });
    } else {
        res.status(400).send({ error: 'Formato no soportado' });
    }
});

// Ruta para actualizar una pieza en el inventario
app.put('/api/piezas/:id', (req, res) => {
    const piezaId = req.params.id;
    const actualizaciones = req.body;

    Pieza.findByIdAndUpdate(piezaId, actualizaciones, { new: true })
        .then(piezaActualizada => {
            if (!piezaActualizada) {
                return res.status(404).send({ message: 'Pieza no encontrada' });
            }
            res.status(200).send(piezaActualizada);
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
});

app.delete('/api/piezas/:id', (req, res) => {
    const piezaId = req.params.id;

    Pieza.findByIdAndDelete(piezaId)
        .then(piezaEliminada => {
            if (!piezaEliminada) {
                return res.status(404).send({ message: 'Pieza no encontrada' });
            }
            res.status(200).send({ message: 'Pieza eliminada correctamente' });
        })
        .catch(err => {
            res.status(500).send({ error: err.message });
        });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});