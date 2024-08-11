import { useState, useEffect } from 'react';

import {ColorPicker} from './components/ColorPicker';
import {TextInput} from './components/TextInput';
import {ContrastPair} from './components/ContrastPairs';

import './App.css';

function App() {
  const [numColors, setNumColors] = useState(2);
  const [colors, setColors] = useState(['#000000', '#ffffff']);
  const [contrastRatios, setContrastRatios] = useState([]);
  const [userText, setUserText] = useState('');

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
    const value = Math.max(2, Math.min(8, parseInt(e.target.value, 10) || 2));
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
          isSwitched: false
        });
      }
    }
    ratios.sort((a, b) => b.ratio - a.ratio);
    setContrastRatios(ratios.slice(0, 10));
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
    <div className="App w-3/4 m-auto flex flex-col items-center justify-center">
      <h1 className='sofia-soft bold mt-10 text-6xl bg-gradient-to-br from-blue-500 to-purple-500 bg-clip-text text-transparent'>Color Contrast Checker</h1>

      <div className='omnes-light italic text-lg mt-4 flex gap-4 items-center'>
        <label htmlFor="numColors">Cantidad de colores:</label>
        <input
          className='p-1 rounded-md outline-1 border-2 border-blue-500 outline-purple-500 outline-blue-500'
          type="number"
          id="numColors"
          value={numColors}
          inputMode='numeric'
          pattern='[0-9]*'
          min="2"
          max="8"
          onChange={handleNumColorsChange}
        />
      </div>

      <TextInput userText={userText} onChange={handleTextChange} />

      <div className='mt-4 grid md:grid-cols-2 gap-4 grid-cols-1'>
        {colors.map((color, index) => (
          <ColorPicker
            key={index}
            color={color}
            index={index}
            onChange={handleColorChange}
          />
        ))}
      </div>

      <button
        onClick={calculateContrast}
        className='mt-4 py-4 px-6 bg-blue-500 transition duration-150 ease-in-out hover:bg-purple-500 font-medium text-white rounded-full'
      >
        Calcular Contraste
      </button>

      <div className="mt-4 w-3/4 grid grid-cols-2 gap-4">
        {contrastRatios.length > 0 &&
          contrastRatios.map((combo, index) => (
            <ContrastPair
              key={index}
              combo={combo}
              userText={userText}
              onSwitchToggle={() => handleSwitchToggle(index)}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
