import React, { useEffect, useRef, useState } from "react";

import imgO from "../images/2a.jpg";
import imgT from "../images/2b.jpg";
import imgTh from "../images/2c.jpg";
import imgF from "../images/2d.jpg";
import imgFi from "../images/2e.jpg";
import imgS from "../images/2f.jpg";

const FancySlider = (props) => {
  const wrapper = useRef(null);
  const sliderRef = useRef(null);

  const [slider, setSlider] = useState(null);
  const [timer, setTimer] = useState(props.timer?props.timer : 1000);
  const [stop, setStop] = useState(false);
  const [images, setImages] = useState(props.images?props.images : []);
  const [leftSide, setLeftSide] = useState(null);
  const [counter, setCounter] = useState(0);
  const auto = props?.auto;

  useEffect(() => {

    if (!slider) {
      setSlider(sliderRef.current);

      // setImages(sliderRef.current.querySelectorAll(".wrapper > img"));
    } else {
      
      if (images && !leftSide) {
        declareSlider();
    console.log(auto)

      } else {
        if (auto) {
          let nextSlide = slider.querySelector(".click_me.right");
          const sliderInterval = setInterval(() => {
            startSlider(nextSlide);
          }, timer * 4);

          if (stop) {
            clearInterval(sliderInterval);
          }

          return () => clearInterval(sliderInterval);
        }
      }
    }
  }, [slider, stop, timer, leftSide]);



  function declareSlider() {
    let lS = document.createElement("div"),
      rightSide = document.createElement("div"),
      center = document.createElement("div");

    let f1 = images[0],
      f2 = images[1],
      l1 = images[images.length - 1],
      l2 = images[images.length - 2],
      wrapper = slider.querySelector(".wrapper");

    const newImgs = [l2, l1, ...images, f1, f2];


    lS.setAttribute("id", "left");
    center.setAttribute("id", "center");
    rightSide.setAttribute("id", "right");

    let html = `<img src="${newImgs[counter]}" class="current" /><img src="${newImgs[counter + 1]}" class="next" />`;
    lS.innerHTML = html;

    html = `<img src="${newImgs[counter + 1]}" class="current" /><img src="${newImgs[counter + 2]}" class="next" />`;
    center.innerHTML = html;

    html = `<img src="${newImgs[counter + 2]}" class="current" /><img src="${newImgs[counter + 3]}" class="next" />`;
    rightSide.innerHTML = html;

    // setImages(newImgs);

    slider.appendChild(lS);
    slider.appendChild(center);
    slider.appendChild(rightSide);

    setLeftSide(lS);

    // wrapper.remove();

    const nextSlide = slider.querySelectorAll("img.show");

    nextSlide.forEach((ele) => {
      ele.style.transitionDuration = `${timer}s`;
    });

    const currSlide = slider.querySelectorAll("img.hide");

    currSlide.forEach((ele) => {
      ele.style.transitionDuration = `${timer}s`;
    });
  }

  const startSlider = (e) => {
    const halfLoad = slider.querySelector(".next.show");

    if (halfLoad) {
      return;
    }

    setCounter((prevState) => {
      console.log(prevState);
      let c = prevState;
      const a = e.classList;

      a.forEach((element) => {
        if (element === "right") {
          slider.classList.remove("reverse");
          if (c >= images.length - 3) {
            c = 2;
          } else {
            c = c + 1;
          }
        } else if (element === "left") {
          slider.classList.add("reverse");

          if (c < 2) {
            c = images.length - 3;
          }
          c = c - 1;
        }
      });

      let leftSide = document.getElementById("left"),
        rightSide = document.getElementById("right"),
        center = document.getElementById("center"),
        nextSlide;

      leftSide.childNodes.forEach((element) => {
        if (element.className === "next") {
          nextSlide = element;
        }
      });
      nextSlide.setAttribute("src", images[c]);

      center.childNodes.forEach((element) => {
        if (element.className === "next") {
          nextSlide = element;
        }
      });

      nextSlide.setAttribute("src", images[c + 1]);

      rightSide.childNodes.forEach((element) => {
        if (element.className === "next") {
          nextSlide = element;
        }
      });

      nextSlide.setAttribute("src", images[c + 2]);

      let next = slider.querySelectorAll(".next"),
        current = slider.querySelectorAll(".current");

      setTimeout(() => {
        next.forEach((item) => {
          item.classList.add("show");
        });

        current.forEach((item) => {
          item.classList.add("hide");
        });
        let imgs = slider.querySelectorAll("img");
        imgs.forEach((ele) => {
          ele.style.transitionDuration = "0s";
        });

        let show = slider.querySelectorAll("img.show");
        show.forEach((ele) => {
          ele.style.transitionDuration = `${timer / 1000}s`;
        });

        let hide = slider.querySelectorAll("img.hide");
        hide.forEach((ele) => {
          ele.style.transitionDuration = `${timer / 1000}s`;
        });
      }, 10);

      setTimeout(() => {
        current.forEach((item) => {
          item.classList.add("next");
        });

        let newNext = slider.querySelectorAll(".hide.next");
        newNext.forEach((item) => {
          item.classList.remove("hide");
          item.classList.remove("current");
        });

        let newCurrent = slider.querySelectorAll(".show.next");
        newCurrent.forEach((item) => {
          item.classList.add("current");
          item.classList.remove("show");
          item.classList.remove("next");
        });

        let imgs = slider.querySelectorAll("img");
        imgs.forEach((ele) => {
          ele.style.transitionDuration = "0s";
        });

        let show = slider.querySelectorAll("img.show");
        show.forEach((ele) => {
          ele.style.transitionDuration = `${timer / 1000}s`;
        });

        let hide = slider.querySelectorAll("img.hide");
        hide.forEach((ele) => {
          ele.style.transitionDuration = `${timer / 1000}s`;
        });
      }, timer * 1.2);
      return c;
    });
  };

  ////////////////////////////////////////////////
  const onBtnClick = (e) => {
    setStop(true);

    let nextSlide = e.target;

    startSlider(nextSlide);

    setTimeout(() => {
      setStop(false);
    }, timer * 1);
  };

  return (
    <div id="fancySlider" className="pb200 desk plr100" ref={sliderRef}>
      <div className="wrapper" ref={wrapper}>
        <img src={imgO} alt="" />
        <img src={imgT} alt="" />
        <img src={imgTh} alt="" />
        <img src={imgF} alt="" />
        <img src={imgFi} alt="" />
        <img src={imgS} alt="" />
      </div>

      <button className="click_me left" onClick={(e) => onBtnClick(e)}></button>
      <button
        className="click_me right"
        onClick={(e) => onBtnClick(e)}
      ></button>
    </div>
  );
};

export default FancySlider;
