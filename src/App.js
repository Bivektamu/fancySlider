import { useEffect } from "react";
import "./App.scss";
import imgO from "./images/2a.jpg";
import imgT from "./images/2b.jpg";
import imgTh from "./images/2c.jpg";
import imgF from "./images/2d.jpg";
import imgFi from "./images/2e.jpg";
import imgS from "./images/2f.jpg";

function App() {

  let counter = 2,
      timer = 2000,
      animating = false;


      var slider = document.getElementById("fancySlider"),
      f1 = wrapper.querySelector("#fancySlider > .wrapper > img:first-child"),
      f2 = wrapper.querySelector("#fancySlider > .wrapper > img:nth-child(2)"),
      l1 = wrapper.querySelector("#fancySlider > .wrapper > img:last-child"),
      l2 = wrapper.querySelector(
        "#fancySlider > .wrapper > img:nth-last-child(2)"
      ),
      leftSide = document.createElement("div"),
      rightSide = document.createElement("div"),
      center = document.createElement("div");

    let nextSlide;
  useEffect(()=> {

    var wrapper = document.querySelector("#fancySlider > .wrapper");

    if (!wrapper) {
      return;
    }
   

    let clone = f1.cloneNode(true);
    wrapper.append(clone);
    clone = f2.cloneNode(true);
    wrapper.append(clone);

    clone = l1.cloneNode(true);
    wrapper.prepend(clone);
    clone = l2.cloneNode(true);
    wrapper.prepend(clone);


    let images = wrapper.getElementsByTagName("img"),
      currSrc = images[2].getAttribute("src");

    leftSide.setAttribute("id", "left");
    center.setAttribute("id", "center");
    rightSide.setAttribute("id", "right");

    let html = `<img src="${currSrc}" className="current" /><img src="" className="next" />`;
    leftSide.innerHTML = html;


    currSrc = images[3].getAttribute("src");
    html = `<img src="${currSrc}" className="current" /><img src="" className="next" />`;
    center.innerHTML = html;

    currSrc = images[4].getAttribute("src");
    html = `<img src="${currSrc}" className="current" /><img src="" className="next" />`;
    rightSide.innerHTML = html;

    slider.appendChild(leftSide);
    slider.appendChild(center);
    slider.appendChild(rightSide);


    

    wrapper.remove();
  }, []);

// 
    function inititateSlider(obj) {
      animating = true;

      nextSlide = leftSide.querySelector(".next");
      nextSlide.setAttribute("src", images[counter].getAttribute("src"));

      nextSlide = center.querySelector(".next");
      nextSlide.setAttribute("src", images[counter + 1].getAttribute("src"));

      nextSlide = rightSide.querySelector(".next");
      nextSlide.setAttribute("src", images[counter + 2].getAttribute("src"));


      let next = slider.querySelectorAll(".next"),
        current = slider.querySelectorAll(".current");

      next.forEach((item) => {
        item.classList.add("show");
      });

      current.forEach((item) => {
        item.classList.add("hide");
      });

      setTimeout(() => {
        current.forEach((item) => {
          item.classList.add("next");
        });

        let next = slider.querySelectorAll('.current.next')
        next.forEach((item) => {
          item.classList.add("current");
        });

        let newCurrent = slider.querySelectorAll('.show.next')
        newCurrent.forEach((item) => {
          item.classList.add("current");
          item.classList.remove("show");
          item.classList.remove("next");
        });

        
        let newNext = slider.querySelectorAll('.hide.next')
        newNext.forEach((item) => {
          item.classList.remove("hide");
        });

        animating = false

    // inititateSlider();


      }, timer);
    }


  function onClickStartSlider(e) {
    console.log('asdf')
  }

  setTimeout(() => {
    const rightBtn = document.querySelector('.click_me.right')[0]
  
    console.log(rightBtn)
  }, 2000);


  return (
    <div className="App">
      <header className="App-header">
        <h1>Slider</h1>
      </header>

      <main>
        <div id="fancySlider" className="pb200 desk plr100">
          <div className="wrapper">
            <img src={imgO} alt="" />
            <img src={imgT} alt="" />
            <img src={imgTh} alt="" />
            <img src={imgF} alt="" />
            <img src={imgFi} alt="" />
            <img src={imgS} alt="" />
          </div>

           
          <button class="click_me left">
            <svg xmlns="http://www.w3.org/2000/svg" width="66" height="8" viewBox="0 0 66 8" fill="none">
                <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H66V3.5H1V4.5Z" fill="#8C8C86"/>
              </svg>
          </button>
          <button class="click_me right" oncClick={(e)=> onClickStartSlider(e)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="66" height="8" viewBox="0 0 66 8" fill="none">
                <path d="M0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM1 4.5H66V3.5H1V4.5Z" fill="#8C8C86"/>
              </svg>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
