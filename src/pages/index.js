// ./src/App.js

import { useState } from "react";
import {
  computerVision,
  isConfigured as ComputerVisionIsConfigured,
} from "../helpers/computerVision";
function App() {
  const [fileSelected, setFileSelected] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setFileSelected(e.target.value);
  };
  const onFileUrlEntered = (e) => {
    // hold UI
    setProcessing(true);
    setAnalysis(null);

    computerVision(fileSelected || null).then((item) => {
      // reset state/form
      setAnalysis(item);
      setFileSelected("");
      setProcessing(false);
    });
  };

  // Display JSON data in readable format
  const PrettyPrintJson = (data) => {
    return (
      <div className="bg-gray-100 m-10 p-10 font-semibold rounded-md">
        <p className="text-lg  text-center"> Analisis:</p>
        <p className="my-2">
          Descripción de la Imagen:{" "}
          <span className="font-normal text-xl capitalize">
            {data.description.captions[0].text}
          </span>
        </p>
        <p>
          URL: <span className="font-normal">{data.URL}</span>
        </p>
        <p>
          Categoria de la Imagen:{" "}
          <span className="font-normal">{data.categories[0].name}</span>
        </p>
        <p>
          Colores Dominantes de la Imagen:
          {data.color.dominantColors.map((e) => (
            <ul className="list-inside list-disc	">
              <li className="font-normal">{e}</li>
            </ul>
          ))}
        </p>
        <p>
          Tags Importantes de la Imagen:
          {data.tags.map((e) => (
            <ul className="list-inside list-disc	">
              <li className="font-normal capitalize  ">{e.name}</li>
            </ul>
          ))}
        </p>
      </div>
    );
  };

  const DisplayResults = () => {
    return (
      <div>
        <h2 className="text-center text-xl">Imagen analizada</h2>
        <div className="flex justify-center items-center">
          <img
            className="rounded"
            src={analysis.URL}
            height={600}
            width={600}
            border="1"
            alt={
              analysis.description &&
              analysis.description.captions &&
              analysis.description.captions[0].text
                ? analysis.description.captions[0].text
                : "can't find caption"
            }
          />
        </div>
        {PrettyPrintJson(analysis)}
      </div>
    );
  };

  const Analyze = () => {
    return (
      <div className="container mx-auto p-10 rounded">
        <h1 className="text-center text-2xl text-semibold">Imagen a Analizar</h1>
        {!processing && (
          <div  className="my-2">
            <div className="flex space-x-4 ">
              <label>URL</label>
              <input
                class="w-full bg-gray-200 text-black border border-gray-200 rounded py-1 px-4 mb-3"

                type="text"
                placeholder="Ingrese la URL de una Imagen"
                size="50"
                onChange={handleChange}
              ></input>
            </div>
            <button class="px-3 py-2 border hover:bg-gray-200 rounded-md border-gray-200 my-2"onClick={onFileUrlEntered}>Analizar</button>
          </div>
        )}
        {processing &&  <h1 className="text-center text-xl mt-5 text-semibold">Procesando la Imagen</h1>}
        <hr />
        {analysis && DisplayResults()}
      </div>
    );
  };

  const CantAnalyze = () => {
    return <div>Error de Credenciales</div>;
  };
  const ready = ComputerVisionIsConfigured();
  return <> {ready ? <Analyze /> : <CantAnalyze />}</>;
}

export default App;
