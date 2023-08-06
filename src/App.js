import { useEffect, useRef, useState } from "react";
import "./App.scss";


import imgO from "./images/2a.jpg";
import imgT from "./images/2b.jpg";
import imgTh from "./images/2c.jpg";
import imgF from "./images/2d.jpg";
import imgFi from "./images/2e.jpg";
import imgS from "./images/2f.jpg";

import FancySlider from "./component/FancySlider";

function App() {

  const [images, setImages] = useState([imgO, imgT, imgTh, imgF, imgFi, imgS])
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Slider</h1>
      </header>

      <main>
        <FancySlider images = {images} auto={true} timer={1000} directionNav = {true} contronNav={false} />
      </main>
    </div>
  );
}

export default App;
