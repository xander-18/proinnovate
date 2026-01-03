const express = require('express');
const app = express();

// Middleware
app.use(express.json());

app.use((req, res, next) => {
  next();
});

app.get('/', (req, res) => {
  console.log('Ejecutando ruta: GET /');
  res.json({ status: 'ok', message: 'API funcionando' });
});

console.log('Cargando rutas de usuarios...');
const userRoutes = require('./src/routes/userRoutes');

app.use('/api/users', userRoutes);
console.log('Rutas de usuarios cargadas en /api/users');

app.use((req, res) => {
  console.log('Ruta no encontrada:', req.method, req.url);
  res.status(404).json({ 
    success: false, 
    message: `Ruta no encontrada: ${req.method} ${req.url}` 
  });
});

app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err);
  res.status(500).json({ 
    success: false, 
    message: 'Error interno del servidor',
    error: err.message 
  });
});

module.exports = app;