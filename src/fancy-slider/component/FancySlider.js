import "./FancySlider.scss"

import React, { useEffect, useRef, useState } from "react";

const FancySlider = (props) => {
  const sliderRef = useRef(null);

  const [slider, setSlider] = useState(null);
  const [stop, setStop] = useState(false);
  const [images, setImages] = useState(props.images ? props.images : []);
  const [leftSide, setLeftSide] = useState(null);
  const [counter, setCounter] = useState(0);
  const [auto, setAuto] = useState(props?.auto);
  const [animating, setAnimating] = useState(false);

  const timer = props.timer ? props.timer : 4000;
  const gap = props.gap ? props.gap : 50;
  const directionNav = props?.directionNav;
  const slideToShow = props?.slideToShow;
  const transitionTime = props.transitionTime ? props.transitionTime : 500;
  const controlNav = slideToShow === 2 ? false : props?.controlNav;
  const animationEasing = props?.animationEasing;

  useEffect(() => {
    if (!slider) {
      setSlider(sliderRef.current);
    } else {
      if (images && !leftSide) {
        initializeSlider();
      } else {
        if (auto || (!directionNav && !controlNav)) {
          let c = counter;
          c = c + 1;

          const sliderInterval = setInterval(() => {
            console.log("qweqwe");
            sliderLogic(c);
          }, timer);

          if (stop) {
            clearInterval(sliderInterval);
          }

          return () => clearInterval(sliderInterval);
        }
      }
    }

    console.log(directionNav)

  }, [slider, stop, timer, leftSide, counter, animating]);

  ////////////////////////////////////////////////
  function initializeSlider() {
    let lS = document.createElement("div"),
      rightSide = document.createElement("div"),
      center = document.createElement("div"),
      c = counter,
      wrapper = document.createElement("div");

    const newImgs = images;

    wrapper.setAttribute("id", "wrapper");
    lS.setAttribute("id", "left");
    center.setAttribute("id", "center");
    rightSide.setAttribute("id", "right");

    let html = `<img src="${newImgs[c]}" class="current" /><img src="${
      newImgs[c + 1]
    }" class="next" />`;
    lS.innerHTML = html;

    html = `<img src="${newImgs[c + 1]}" class="current" /><img src="${
      newImgs[c + 2]
    }" class="next" />`;
    center.innerHTML = html;

    html = `<img src="${newImgs[c + 2]}" class="current" /><img src="${
      newImgs[c + 3]
    }" class="next" />`;
    rightSide.innerHTML = html;

    switch (slideToShow) {
      case 1:
        slider.classList.add("show_only_1");
        lS.style.width = "100%";
        center.style.display = "none";
        rightSide.style.display = "none";
        lS.style.filter = "blur(0)";
        break;

      case 2:
        center.style.width = `calc(50% - ${gap / 2}px)`;
        lS.style.width = `calc(50% - ${gap / 2}px)`;
        lS.style.filter = "blur(0)";
        rightSide.style.display = "none";

        if (!directionNav) {
          setAuto(true);
        }
        break;

      default:
        rightSide.style.width = `calc(33.333% - ${gap}px)`;
        lS.style.width = `calc(33.333% - ${gap}px)`;
        center.style.width = `calc(33.333%)`;
        break;
    }

    if (window.innerWidth < 761) {
      slider.classList.add("show_only_1");
      lS.style.width = "100%";
    }

    setImages(newImgs);
    wrapper.appendChild(lS);
    wrapper.appendChild(center);
    wrapper.appendChild(rightSide);

    slider.prepend(wrapper);

    switch (animationEasing) {
      case "slide":
        slider.classList.add("slide");
        break;

      case "fade":
        slider.classList.add("fade");
        break;

      default:
        break;
    }

    setLeftSide(lS);

    const nextSlide = slider.querySelectorAll("img.show");

    nextSlide.forEach((ele) => {
      ele.style.transitionDuration = `${timer}s`;
    });

    const currSlide = slider.querySelectorAll("img.hide");

    currSlide.forEach((ele) => {
      ele.style.transitionDuration = `${timer}s`;
    });

    if (controlNav) {
      let grabController = document.querySelector(
        ".controlWrapper > ul > li:first-child > button"
      );
      grabController.classList.add("active");
    }
  }

  ////////////////////////////////////////////////
  const sliderLogic = (c) => {
    if (animating) {
      return;
    }

    setAnimating(true);

    let aa, b;

    aa = c + 1;
    b = aa + 1;

    if (c === images.length - 2) {
      b = 0;
    } else if (c === images.length - 1) {
      aa = 0;
      b = 1;
    } else if (c > images.length - 1) {
      c = 0;

      aa = c + 1;
      b = aa + 1;
    } else if (c < 0) {
      c = images.length - 1;
      aa = 0;
      b = aa + 1;
    }

    if (controlNav) {
      let grabController = document.querySelector(
        ".controlWrapper > ul > li > button.active"
      );
      if (grabController) {
        grabController.classList.remove("active");
      }

      grabController = document.querySelector(
        `.controlWrapper > ul > li:nth-child(${c + 1})`
      );

      grabController.firstChild.classList.add("active");
    }

    setCounter(c);

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

    nextSlide.setAttribute("src", images[aa]);

    rightSide.childNodes.forEach((element) => {
      if (element.className === "next") {
        nextSlide = element;
      }
    });

    nextSlide.setAttribute("src", images[b]);

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
        ele.style.transitionDuration = `${transitionTime / 1000}s`;
      });

      let hide = slider.querySelectorAll("img.hide");
      hide.forEach((ele) => {
        ele.style.transitionDuration = `${transitionTime / 1000}s`;
      });
    }, 1);

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
        ele.style.transitionDuration = `${transitionTime / 1000}s`;
      });

      let hide = slider.querySelectorAll("img.hide");
      hide.forEach((ele) => {
        ele.style.transitionDuration = `${transitionTime / 1000}s`;
      });
      setAnimating(false);
    }, transitionTime * 2);
  };

  ////////////////////////////////////////////////
  const onBtnClick = (e) => {
    if (animating) {
      return;
    }
    setStop(true);
    let c = counter;

    const classes = e.target.classList;

    classes.forEach((element) => {
      if (element === "right") {
        slider.classList.remove("reverse");
        c = c + 1;
      } else if (element === "left") {
        slider.classList.add("reverse");
        c = c - 1;
      }
    });

    sliderLogic(c);

    setTimeout(() => {
      slider.classList.remove("reverse");
      setStop(false);
    }, transitionTime);
  };

  const controllerClicked = (e) => {
    if (animating) {
      return;
    }

    setStop(true);

    const parentNode = e.target.parentNode.parentNode;
    const index = [].indexOf.call(parentNode.children, e.target.parentNode);

    const c = counter;

    if (index < c) {
      slider.classList.add("reverse");
    }

    sliderLogic(index);

    setTimeout(() => {
      setStop(false);
      slider.classList.remove("reverse");
    }, transitionTime);
  };

  const directionNavWrapper = (
    <>
      <button className="click_me left" onClick={(e) => onBtnClick(e)}></button>
      <button
        className="click_me right"
        onClick={(e) => onBtnClick(e)}
      ></button>
    </>
  );

  const controlNavWrapper = (
    <div className="controlWrapper">
      <ul>
        {images.map((item, index) => (
          <li key={index}>
            <button onClick={(e) => controllerClicked(e)}></button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div id="fancySlider" className="pb200 desk plr100" ref={sliderRef}>
      {directionNav && directionNavWrapper}
      {controlNav && slideToShow !== 2 && controlNavWrapper}
    </div>
  );
};

export default FancySlider;
