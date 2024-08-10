import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [numColors, setNumColors] = useState(2); // Número inicial de colores
  const [colors, setColors] = useState(['#000000', '#ffffff']); // Colores iniciales
  const [contrastRatios, setContrastRatios] = useState([]);
  const [userText, setUserText] = useState(null); // Texto por defecto

  // Efecto para ajustar la cantidad de colores
  useEffect(() => {
    if (colors.length < numColors) {
      setColors([...colors, ...Array(numColors - colors.length).fill('#000000')]);
    } else if (colors.length > numColors) {
      setColors(colors.slice(0, numColors));
    }
  }, [numColors, colors]);

  const handleColorChange = (index, newColor) => {
    const updatedColors = [...colors];
    updatedColors[index] = newColor;
    setColors(updatedColors);
  };

  const handleNumColorsChange = (e) => {
    const value = Math.max(2, Math.min(6, parseInt(e.target.value, 10) || 2)); // Limitar entre 2 y 6
    setNumColors(value);
  };

  const handleTextChange = (e) => {
    setUserText(e.target.value);
  };

  const calculateContrast = () => {
    const ratios = [];
    for (let i = 0; i < colors.length; i++) {
      for (let j = i + 1; j < colors.length; j++) {
        const ratio = getContrastRatio(colors[i], colors[j]);
        ratios.push({
          color1: colors[i],
          color2: colors[j],
          ratio: ratio.toFixed(2),
          isSwitched: false // Agregamos un estado de switch individual para cada combinación
        });
      }
    }
    ratios.sort((a, b) => b.ratio - a.ratio);
    setContrastRatios(ratios.slice(0, 6));
  };

  const handleSwitchToggle = (index) => {
    const updatedRatios = [...contrastRatios];
    updatedRatios[index].isSwitched = !updatedRatios[index].isSwitched;
    setContrastRatios(updatedRatios);
  };

  const getLuminance = (color) => {
    const rgb = parseInt(color.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;

    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const getContrastRatio = (color1, color2) => {
    const lum1 = getLuminance(color1);
    const lum2 = getLuminance(color2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  };

  return (
    <div className="App w-1/2 m-auto flex flex-col items-center justify-center">
      <h1 className='mt-10 text-3xl'>Color Contrast Checker</h1>

      <div className='mt-4 flex gap-4 items-center'>
        <label htmlFor="numColors">Cantidad de colores:</label>
        <input
          className='p-1 rounded-md outline-1 outline-blue-500'
          type="number"
          id="numColors"
          value={numColors}
          min="2"
          max="6"
          onChange={handleNumColorsChange}
        />
      </div>

      <div className='mt-4 flex gap-4 items-center'>
        <label htmlFor="userText">Texto para visualizar:</label>
        <input
          className='p-1 rounded-md outline-1 outline-blue-500'
          type="text"
          id="userText"
          value={userText}
          onChange={handleTextChange}
          placeholder="Introduce tu texto aquí"
        />
      </div>

      <div className='mt-4 grid grid-cols-2 gap-4'>
        {colors.map((color, index) => (
          <div key={index}>
            <input
              type="color"
              id={`color${index}`}
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      

      <button 
        onClick={calculateContrast}
        className='mt-4 p-4 bg-blue-500 text-white rounded-full'
        
        >Calcular Contraste</button>
      <div className="mt-4 w-3/4">
        {contrastRatios.length > 0 &&
          contrastRatios.map((combo, index) => (
            <div key={index} className='mt-4'>
              <div
                className="min-h-20 p-3"
                style={{
                  backgroundColor: combo.isSwitched ? combo.color2 : combo.color1,
                  color: combo.isSwitched ? combo.color1 : combo.color2,
                }}
              >
                {userText}
              </div>
              <p className='text-center'>{combo.ratio}</p>
              <label htmlFor={`switch${index}`}>
                Switch
              </label>
              <input
                className='m-1'
                type="checkbox"
                id={`switch${index}`}
                checked={combo.isSwitched}
                onChange={() => handleSwitchToggle(index)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
