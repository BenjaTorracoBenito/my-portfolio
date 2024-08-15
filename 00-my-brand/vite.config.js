import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Cambia '/my-portfolio/' por el nombre de tu repositorio
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/', // Ajusta esto según el nombre de tu repositorio
  build: {
    outDir: 'dist', // Esta es la carpeta de salida para los archivos construidos
    rollupOptions: {
      // Asegúrate de no tener errores en la configuración aquí
      input: './index.html', // Asegúrate de que este sea el archivo de entrada correcto
    },
  },
});