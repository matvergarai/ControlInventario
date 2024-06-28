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
    nombre: String,
    cantidad: Number,
    descripcion: String,
    numeroSerie: String,
    ubicacion: String,
    ordenReposicionPendiente: { type: Boolean, default: false }
});

const OrdenReposicion = mongoose.model('OrdenReposicion', {
    nombre: String,
    cantidad: Number,
    ubicacion: String,
    fechaOrden: Date,
    estado: String
});

// Definición de un modelo para los movimientos de inventario
const MovimientoInventario = mongoose.model('MovimientoInventario', {
    pieza: { type: mongoose.Schema.Types.ObjectId, ref: 'Pieza' },
    fecha: Date,
    descripcion: String,
    tipo: String,
    cantidad: Number
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

// Ruta para eliminar una pieza en el inventario
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

// Ruta para obtener piezas con bajo stock
app.get('/api/piezas/bajo-stock', (req, res) => {
    Pieza.find({ cantidad: { $lt: 10 }, ordenReposicionPendiente: { $ne: true } })
        .then(piezas => {
            res.json(piezas);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
});

// Ruta para obtener todas las órdenes de reposición
app.get('/api/ordenes-reposicion', (req, res) => {
    OrdenReposicion.find({})
        .then(ordenes => {
            res.status(200).send(ordenes);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

// Ruta para agregar una nueva orden de reposición
app.post('/api/ordenes-reposicion', async (req, res) => {
    console.log('Received data for order:', req.body);
    const { idPieza, cantidadRequerida } = req.body;

    try {
        const pieza = await Pieza.findById(idPieza);
        if (!pieza) {
            return res.status(404).send({ message: 'Pieza no encontrada' });
        }

        // Crear la nueva orden de reposición
        const nuevaOrdenCompra = {
            nombre: pieza.nombre,
            cantidad: cantidadRequerida,
            ubicacion: pieza.ubicacion,
            fechaOrden: new Date(),
            estado: 'Pendiente'
        };

        // Guardar la orden de reposición
        const ordenGuardada = new OrdenReposicion(nuevaOrdenCompra);
        await ordenGuardada.save();

        // Actualizar el estado de la pieza
        pieza.ordenReposicionPendiente = true;
        await pieza.save();

        res.status(201).send({ success: true, ordenCompra: nuevaOrdenCompra });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Ruta para eliminar todas las órdenes de reposición
app.delete('/api/ordenes-reposicion', async (req, res) => {
    try {
        await OrdenReposicion.deleteMany({});
        res.status(200).send({ success: true, message: 'Todas las órdenes de reposición han sido eliminadas' });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

// Ruta para reabastecer stock
app.post('/api/reabastecer', (req, res) => {
    const { almacen, cantidad } = req.body;

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

// Ruta para obtener el historial de movimientos del inventario
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

// Ruta para exportar datos a PDF o Excel
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

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});