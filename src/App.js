import { useEffect, useRef, useState } from "react";
import "./App.scss";
import imgO from "./images/2a.jpg";
import imgT from "./images/2b.jpg";
import imgTh from "./images/2c.jpg";
import imgF from "./images/2d.jpg";
import imgFi from "./images/2e.jpg";
import imgS from "./images/2f.jpg";

function App() {
  const wrapper = useRef(null);
  const sliderRef = useRef(null);

  const [slider, setSlider] = useState(null);
  const [timer, setTimer] = useState(2000);
  const [animating, setAnimating] = useState(false);
  const [images, setImages] = useState(null);
  const [leftSide, setLeftSide] = useState(null);
  const [counter, setCounter] = useState(2);
  useEffect(() => {
    if (!slider) {
      setSlider(sliderRef.current);
      setImages(sliderRef.current.getElementsByTagName("img"));
    } else {
      if(!leftSide)
        inititateSlider();
    }
  }, [slider, counter]);

  function inititateSlider() {
    let leftSide = document.createElement("div"),
      rightSide = document.createElement("div"),
      center = document.createElement("div");

    let f1 = slider.querySelector(".wrapper > img:first-child"),
      f2 = slider.querySelector(".wrapper > img:nth-child(2)"),
      l1 = slider.querySelector(".wrapper > img:last-child"),
      wrapper = slider.querySelector(".wrapper"),
      l2 = slider.querySelector(".wrapper > img:nth-last-child(2)");

    let clone = f1.cloneNode(true);
    wrapper.append(clone);
    clone = f2.cloneNode(true);
    wrapper.append(clone);

    clone = l1.cloneNode(true);
    wrapper.prepend(clone);
    clone = l2.cloneNode(true);
    wrapper.prepend(clone);


    leftSide.setAttribute("id", "left");
    center.setAttribute("id", "center");
    rightSide.setAttribute("id", "right");

    let html = `<img src="${images[counter].getAttribute("src")}" class="current" /><img src="${images[counter+1].getAttribute("src")}" class="next" />`;
    leftSide.innerHTML = html;

    html = `<img src="${images[counter+1].getAttribute("src")}" class="current" /><img src="${images[counter+2].getAttribute("src")}" class="next" />`;
    center.innerHTML = html;

    html = `<img src="${images[counter+2].getAttribute("src")}" class="current" /><img src="${images[counter+3].getAttribute("src")}" class="next" />`;
    rightSide.innerHTML = html;

    slider.appendChild(leftSide);
    slider.appendChild(center);
    slider.appendChild(rightSide);

    setLeftSide(leftSide);

    // wrapper.remove();

    // setTimeout(() => {
    //   const rightBtn = document.querySelector(".click_me.right");
    //   rightBtn.click();
    // }, timer);
  }




  const onClickStartSlider = (e) => {


    const an = animating

    if(an) {
      return 
    }
    else {
      setAnimating(true)
    }



    let next = slider.querySelectorAll(".next"),
      current = slider.querySelectorAll(".current");

    next.forEach((item) => {
      item.classList.add("show");
    });

    current.forEach((item) => {
      item.classList.add("hide");
    });

    const a = e.target.classList;
    let c  = counter

    console.log(e.target)
    console.log(c)
    a.forEach((element) => {
      if (element == "right") {
        if (c >= images.length - 3) {
          alert.log(c)
          c = 2
        } else {
          console.log(c)
          c = (c + 1);
        }
      }
      else if(element == "left") {
        if (c < 2) {
            c = (images.length - 3)
          }
          c = (c - 1);
      }
    });

// 

    setTimeout(() => {
      console.log(c)

      current.forEach((item) => {
        item.classList.add("next");
      });


      let newNext = slider.querySelectorAll(".hide.next");
      newNext.forEach((item) => {
        item.classList.remove("hide");
        item.classList.remove("current");
      });

// 
      let newCurrent = slider.querySelectorAll(".show.next");
      newCurrent.forEach((item) => {
        item.classList.add("current");
        item.classList.remove("show");
        item.classList.remove("next");
      });


      
    let leftSide = document.getElementById("left"),
      rightSide = document.getElementById("right"),
      center = document.getElementById("center"),
     nextSlide ;


    leftSide.childNodes.forEach(element => {
      if(element.className === 'next') {
       nextSlide = element;
      }
    });
    nextSlide.setAttribute("src", images[c + 1].getAttribute("src"));

    center.childNodes.forEach(element => {
      if(element.className === 'next') {
       nextSlide = element
      }
    });

    nextSlide.setAttribute("src", images[c + 2].getAttribute("src"));

    
    rightSide.childNodes.forEach(element => {
      if(element.className === 'next') {
       nextSlide = element;
      }
    });

    nextSlide.setAttribute("src", images[c + 3].getAttribute("src"));

      setCounter(c)
      setAnimating(false);
    }, timer);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Slider</h1>
      </header>

      <main>
        <div id="fancySlider" className="pb200 desk plr100" ref={sliderRef}>
          <div className="wrapper" ref={wrapper}>
            <img src={imgO} alt="" />
            <img src={imgT} alt="" />
            <img src={imgTh} alt="" />
            <img src={imgF} alt="" />
            <img src={imgFi} alt="" />
            <img src={imgS} alt="" />
          </div>

          <button className="click_me left">
           
          </button>
          <button
            className="click_me right"
            onClick={(e) => onClickStartSlider(e)}
          >
          
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
