import React, { useEffect, useRef, useState } from "react";

const FancySlider = (props) => {
  const sliderRef = useRef(null);

  const [slider, setSlider] = useState(null);
  const [timer, setTimer] = useState(props.timer ? props.timer : 4000);
  const [stop, setStop] = useState(false);
  const [images, setImages] = useState(props.images ? props.images : []);
  const [leftSide, setLeftSide] = useState(null);
  const [counter, setCounter] = useState(0);
  const auto = props?.auto;
  const directionNav = props?.directionNav
  const controlNav = props?.controlNav
  const [controller, setController] = useState(null)
  const transitionTime = props.transitionTime? props.transitionTime : 500

  useEffect(() => {
    if (!slider) {
      setSlider(sliderRef.current);
    } else {
      if (images && !leftSide) {
        initializeSlider();
      } else {
        if (auto) {
          let c = counter
          c=c+1

          const sliderInterval = setInterval(() => {
            sliderLogic(c);
          }, timer);

          if (stop) {
            clearInterval(sliderInterval);
          }

          return () => clearInterval(sliderInterval);
        }
      }
    }
  }, [slider, stop, timer, leftSide, counter]);

  function initializeSlider() {
    let lS = document.createElement("div"),
      rightSide = document.createElement("div"),
      center = document.createElement("div"),
      wrapper = document.createElement('div');


    // const newImgs = [l2, l1, ...images, f1, f2];
    const newImgs = images

    wrapper.setAttribute('id', 'wrapper')
    lS.setAttribute("id", "left");
    center.setAttribute("id", "center");
    rightSide.setAttribute("id", "right");

    let html = `<img src="${newImgs[counter]}" class="current" /><img src="${
      newImgs[counter + 1]
    }" class="next" />`;
    lS.innerHTML = html;

    html = `<img src="${newImgs[counter + 1]}" class="current" /><img src="${
      newImgs[counter + 2]
    }" class="next" />`;
    center.innerHTML = html;

    html = `<img src="${newImgs[counter + 2]}" class="current" /><img src="${
      newImgs[counter + 3]
    }" class="next" />`;
    rightSide.innerHTML = html;

    setImages(newImgs);
    wrapper.appendChild(lS)
    wrapper.appendChild(center)
    wrapper.appendChild(rightSide)

    slider.prepend(wrapper)

    setLeftSide(lS);

    const nextSlide = slider.querySelectorAll("img.show");

    nextSlide.forEach((ele) => {
      ele.style.transitionDuration = `${timer}s`;
    });

    const currSlide = slider.querySelectorAll("img.hide");

    currSlide.forEach((ele) => {
      ele.style.transitionDuration = `${timer}s`;
    });

    if(controlNav) {
      const controlWrapper = document.querySelector('.controlWrapper>ul')
      setController(controlWrapper)
    }

  }


  const sliderLogic = (c) => {
    const halfLoad = slider.querySelector(".next.show");

    if (halfLoad) {
      return;
    }


      let aa, b

      aa = c+1
      b=aa+1

      if(c===images.length - 2) {
        b=0
      }
      else if(c === images.length - 1 ) {
        aa = 0
        b = 1
      }
      else if(c > images.length - 1 ) {
        c = 0;

        aa = c+1
        b=aa+1
      }
      else if(c < 0 ) {
        c = images.length - 1;
        aa = 0
        b=aa+1
      }


      setCounter(c)


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



      // setTimeout(() => {
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
      // }, 10);

      if(controller) {
        console.log(controller)
      }

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



      }, transitionTime*1.2);



  };

  ////////////////////////////////////////////////
  const onBtnClick = (e) => {
    setStop(true);
    let c = counter

    const classes = e.target.classList;

    classes.forEach((element) => {
      if (element === "right") {
        slider.classList.remove("reverse");
        c= c+1

      } else if (element === "left") {
        slider.classList.add("reverse");
        c = c - 1;
      }
    });

    sliderLogic(c);

    setTimeout(() => {
      setStop(false);
    }, transitionTime);
  };

  const controllerClicked = (e) => {

    const parentNode = e.target.parentNode.parentNode
    const index = [].indexOf.call(parentNode.children, e.target.parentNode)
    
    e.target.classList.add('active')

    console.log(index)
    
    setCounter(index)

    const rightArrow = document.querySelector('.click_me.right')
    rightArrow.click()

  }
  
  const controlNavWrapper =  (
    <div className="controlWrapper">
      <ul>
        {images.map((item, index)=> <li key={index}><button onClick={(e)=>controllerClicked(e)}></button></li>)}
      </ul>
    </div>
  )

  return (
    <div id="fancySlider" className="pb200 desk plr100" ref={sliderRef}>
   


      <button
        className={directionNav==false? "click_me left hide" : "click_me left"}
        onClick={(e) => onBtnClick(e)}
      ></button>
      <button
        className={directionNav==false? "click_me right hide" : "click_me right"}
        onClick={(e) => onBtnClick(e)}
      ></button>

     
     {controlNav && controlNavWrapper}


    </div>
  );
};

export default FancySlider;
