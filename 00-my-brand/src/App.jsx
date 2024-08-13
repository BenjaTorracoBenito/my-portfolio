import { useState, useEffect } from "react";

import { ColorPicker } from "./components/ColorPicker";
import { TextInput } from "./components/TextInput";
import { ContrastPair } from "./components/ContrastPairs";
import { Counter } from "./components/Counter"

import "./App.css";

function App() {
  const [numColors, setNumColors] = useState(2);
  const [colors, setColors] = useState(["#000000", "#ffffff"]);
  const [contrastRatios, setContrastRatios] = useState([]);
  const [userText, setUserText] = useState("");

  useEffect(() => {
    if (colors.length < numColors) {
      setColors([
        ...colors,
        ...Array(numColors - colors.length).fill("#000000"),
      ]);
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
          isSwitched: false,
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
    <div className="App w-full flex flex-col justify-center items-center min-h-screen">
      <h1 className="mx-6 sofia-soft bold mt-10 text-6xl bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent">
        Color Contrast Checker
      </h1>

      <section className="my-6 grid grid-cols-1 grid-rows-auto md:grid-cols-2 gap-y-6 md:gap-6 place-items-center omnes-light text-lg bg-gradient-to-br from-blue-300 to-purple-300 rounded-xl p-6">
        <div className="col-span-2 grid grid-cols-2">
          <span
            className="place-self-start flex self-center text-white bg-blue-500 rounded-xl py-2 px-4"
            htmlFor="numColors"
          >
            Cantidad de colores
          </span>
          <Counter numColors={numColors} onNumColorsChange={setNumColors} handleColorChange={handleColorChange} />
        </div>

        <TextInput userText={userText} onChange={handleTextChange} />

        <div className="w-full col-span-2 grid md:grid-cols-2 gap-4">
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
          className="md:col-span-2 py-4 px-6 bg-blue-500 transition duration-150 ease-in-out hover:bg-purple-500 font-medium text-white rounded-full"
        >
          Calcular contraste
        </button>
      </section>

      <section className="my-6 p-6 grid md:grid-cols-2 gap-4 bg-gradient-to-br from-blue-300 to-purple-300 rounded-xl">
        {contrastRatios.length > 0 &&
          contrastRatios.map((combo, index) => (
            <ContrastPair
              key={index}
              combo={combo}
              userText={userText}
              onSwitchToggle={() => handleSwitchToggle(index)}
            />
          ))}
      </section>
    </div>
  );
}

export default App;
