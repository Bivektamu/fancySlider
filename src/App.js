import "./App.scss";


import imgO from "./images/2a.jpg";
import imgT from "./images/2b.jpg";
import imgTh from "./images/2c.jpg";
import imgF from "./images/2d.jpg";
import imgFi from "./images/2e.jpg";
import imgS from "./images/2f.jpg";

// import FancySlider from "./fancy-slider/component/FancySlider";

// import FancySlider from './fancy-slider/dist/my-react-library'
import {FancySlider} from 'react-fancyslider'


function App() {

  const images = [imgO, imgT, imgTh, imgF, imgFi, imgS]
  
  return (
        <FancySlider slideToShow={3} images = {images} auto={false} timer={1000} transitionTime = {500} directionNav = {false} controlNav={true} gap={100} />
  );
}

export default App;
