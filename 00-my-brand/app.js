import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000; // O cualquier puerto que desees

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta 'dist'
app.use('/my-portfolio',express.static(path.join(__dirname,'dist')));

// Manejar todas las demás rutas para React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
