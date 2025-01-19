import './style.css'
import './input.css'
import gsap from 'gsap';
import colors from 'tailwindcss/colors'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { Container } from 'postcss'

import { timer } from './timer.js'
import tailwindConfig from '../tailwind.config.js';

let anim = document.getElementById("container");
// console.log(anim);
const btns = document.querySelectorAll(".btn");
const bodyBg = document.querySelector('.body-bg');
const moveRightBtn = document.querySelectorAll(".move-right-button")


btns.forEach(btn => {
  let a = 0;
  btn.addEventListener("mouseover" , (e) => {
    gsap.to(btn , {
      translateY: -2,
      duration: 0.2,
      boxShadow: `0px 10px 15px rgba(28, ${a}, 216, 0.8)`
    })
  })

  btn.addEventListener("mouseout" , () => {
    gsap.to(btn, {
      translateY: 0,
      duration:0.3,
      boxShadow: "0px 0px 0px rgba(119, 136, 237, 0.8)"
    })
  })

})


anim.addEventListener("mouseover", (e) => {
  gsap.to(anim, {
    translateY: -5,
    duration: 0.5,
    boxShadow: "0px 10px 20px 5px rgba(0, 0, 0, 0.3)", // Example box shadow,
    ease: "expo.out",
  });
});

anim.addEventListener("mouseout", (e) => {
  if(!anim.contains(e.relatedTarget)) {
    gsap.to(anim, {
      translateY: 0,
      duration: 0.5,
      boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.3)", // Reset the box shadow
    });
  } 
});

let intervalId = undefined;
const startButton = document.querySelector('.start-btn');
const stopButton = document.querySelector('.stop-btn')
const resumeButton = document.querySelector('.resume-btn')
const resetButton = document.querySelector('.reset-btn')
const resumeBtn = document.querySelector(".resume-btn")

startButton.addEventListener("click", () => {
    
  if (!intervalId) {
    intervalId = timer();
  } else {
    gsap.to(startButton , {
      background: "red",
      duration: 0.5,
    })
    console.log("Timer already running, can't resume.");
  }

});

let activated = false

stopButton.addEventListener("click", () => {
  if(intervalId) {
    const timeline = gsap.timeline()
  
    if(!activated){
      timeline.to(resumeBtn , {
        x: -35,
        duration: 0.5,
        visibility: "visible",
        opacity: "100%",
      }, 0.080);
      
      timeline.to(stopButton , {
        x: 70,
        duration: 0.2
      }, 0.080);
    
      moveRightBtn.forEach(button => {
        timeline.to(button , {
          x: -50,
          duration: 0.2,
        }, 0.080)
      });
  
      
      activated = true;
    }else{
      console.error("hey bobo")
    }
  
    if (intervalId) {
      clearInterval(intervalId)
    
      intervalId = null;  
      console.log("Timer stopped" , intervalId);
    }
  }else{
    console.error("no time to stop")
  }
  
});

resumeBtn.addEventListener("click" , () => {
  const revert = gsap.timeline()

  revert.to(resumeBtn , {
    opacity: 0,
    duration: 0.2,
  })

  moveRightBtn.forEach(button => {
    revert.to(button , {
      x: 0,
      duration: 0.5
    }, 0.1)
  })

  revert.to(stopButton, {
    x: 0,
    duration: 0.5
  }, 0.1)
  activated = false

  intervalId = timer()
  
})

resetButton.addEventListener("click" , () => {

  const cyan = colors.cyan[500];
  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds');

  console.log(minutes)
  console.log(seconds)
  
  minutes.textContent = "25:"
  seconds.textContent = "00"

  if(intervalId) {
    clearInterval(intervalId)
    intervalId = null
    gsap.to(startButton , {
      background: cyan,
      duration: 0.5
    })
  }
  
  


})