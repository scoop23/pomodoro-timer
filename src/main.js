
/**
 * TODO implement a file system where you can drop an mp3 file
 * and set that as the alarm audio for the timer.
 * 
 */
import './style.css'
import './input.css'
import gsap from 'gsap';
import colors, { indigo } from 'tailwindcss/colors'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { Container } from 'postcss'
import { Howl , Howler } from 'howler';
import { timer, worker } from './timer.js'
import tailwindConfig from '../tailwind.config.js';

let anim = document.getElementById("container");
// console.log(anim);
const btns = document.querySelectorAll(".btn");
const bodyBg = document.querySelector('.body-bg');
const moveRightBtn = document.querySelectorAll(".move-right-button")

const body = document.querySelector("body")

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
const resetButton = document.querySelector('.reset-btn')
const resumeBtn = document.querySelector(".resume-btn")
const shortBreakBtn = document.querySelector(".short-break")
const mediumBreakBtn = document.querySelector(".medium-break")
const longBreakBtn = document.querySelector(".long-break")
let minutes = document.querySelector('.minutes');
let seconds = document.querySelector('.seconds');

export let alarmSound = new Howl({
  src: ['./assets/mp3/JoJo\'s Bizarre Adventure OST - Pillar Men ThemeAwaken.mp3'],
  volume: 0.3
})

let timeIsRunning = false;
startButton.addEventListener("click", () => {
  if (!timeIsRunning) {
      timeIsRunning = true;
      timer();
      body.style.transition = '2s'
      body.style.background = '#396bbd'
  } else {
    console.log("Timer already running, can't resume.");
  }
});

let activated = false

stopButton.addEventListener("click", () => {
  const timeline = gsap.timeline()

  if(minutes.textContent === '0:' && seconds.textContent === '00'){
    alarmSound.stop()
    worker.terminate();
    console.log("Nothing to Stop")
    return;
  }
    if(!activated){
      if (worker) {
        worker.terminate()
        alarmSound.stop()
        body.style.transition = '2s'
        body.style.background = '#ff5733'
        timeline.to(resumeBtn , {
          x: -86,
          duration: 0.5,
          visibility: "visible",
          opacity: "100%",
        }, 0.080);
        
        timeline.to(stopButton , {
          x: 30,
          duration: 0.2
        }, 0.080);
      
        moveRightBtn.forEach(button => {
          timeline.to(button , {
            x: -110,
            duration: 0.2,
          }, 0.080)
        });

        
        activated = true;

        timeline.to(startButton, {
          opacity: 0,
          duration: 0.2,
        }, 0.080)
      }
  }else{
    console.error("no time to stop")
  }
  
});

resumeBtn.addEventListener("click" , () => {
  const revert = gsap.timeline()
  
  body.style.transition = '2s'
  body.style.background = '#396bbd' 

  revert.to(resumeBtn , {
    opacity: 0,
    duration: 0.5,
    x : 20,
  })

  revert.to(startButton, {
    opacity: "100%",
    duration: 0.5,
  }, 0.1)
  
  revert.to(stopButton, {
    x: 0,
    duration: 0.5
  }, 0.1)

  moveRightBtn.forEach(button => {
    revert.to(button , { 
      x: 0,
      duration: 0.5
    }, 0.1)
  })
  
  activated = false

  intervalId = timer()
  
})

resetButton.addEventListener("click" , () => {

  body.style.transition = "3s"
  body.style.background = "indigo"
  const cyan = colors.cyan[500];
  console.log(minutes)
  console.log(seconds)

  minutes.textContent = "25"
  seconds.textContent = "00"
  alarmSound.stop()
  if(worker) {
    timeIsRunning = false;
    worker.terminate()
    alarmSound.stop()
    gsap.to(startButton , {
      duration: 0.5
    })
  }
})


shortBreakBtn.addEventListener("click", (event) => {
  body.style.background = '#392bbd'
  body.style.transition = '3s' 
  if(worker) { // if worker exist
    timeIsRunning = false;
    worker.terminate() // terminate it the timer.js from the startbutton will handle starting it again and create a web worker
    minutes.textContent = "5"
    seconds.textContent = "00"
    alarmSound.stop()
  }
  alarmSound.stop()
  minutes.textContent = "5"
  seconds.textContent = "00"
})

mediumBreakBtn.addEventListener("click" , () => {
  if(worker) {
    timeIsRunning = false;
    worker.terminate()
    minutes.textContent = "10"
    seconds.textContent = "00"
    alarmSound.stop()

  }
  minutes.textContent = "10"
  seconds.textContent = "00"
  alarmSound.stop()

})

longBreakBtn.addEventListener("click" , () => {
  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds');

  if(worker) {
    timeIsRunning = false;
    worker.terminate()
    minutes.textContent = "15"
    seconds.textContent = "00"
    alarmSound.stop()
  }
  minutes.textContent = "15"
  seconds.textContent = "00"
    alarmSound.stop()
})


