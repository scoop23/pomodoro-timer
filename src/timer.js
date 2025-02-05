import { ssrExportAllKey } from "vite/module-runner";
import { Howl } from "howler";
import { alarmSound } from "./main";
var pad = '0'

export function timer() {
  const pad = '0'
  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds');
    // console.log("Current minutes:", document.querySelector('.minutes').textContent);
    // console.log("Current seconds:", document.querySelector('.seconds').textContent);
  let numMinutes = parseInt(minutes.textContent)
  let numSecs = parseInt(seconds.textContent)
  console.log(numMinutes , numSecs)
  let textNumSecs = numSecs.toString()

  

  let intervalId = setInterval(() => {

    if(minutes.textContent === '0:' && seconds.textContent === '00') {
      alarmSound.play()
      clearInterval(intervalId)
      return 
    }
    
    if(seconds.textContent === '00'){
      numMinutes -= 1
      minutes.textContent = numMinutes + ":"
      seconds.textContent = 59
    }else {
      numSecs = parseInt(seconds.textContent)
      numSecs -= 1
      seconds.textContent = numSecs
      if(numSecs < 10) {
        numSecs -= 1
        seconds.textContent = pad + numSecs
      }
      console.log(numSecs)
    }
  
    // if(numLengthSecs != 2){
    //   seconds -= 1;
    //   numTextSeconds = pad + seconds
    //   secsHTML.textContent = numTextSeconds
    //   // timer -= 1;
    //   // console.log(numLengthSecs)
    //   // secsHTML.textContent = numTextSeconds;
    // } else {
    //   seconds -= 1;
    //   console.log(numLengthSecs)
    //   secsHTML.textContent = numTextSeconds;
    // }
  }, 10);
  
  return intervalId;
}

/*


  I OVERCOMPLICATED 
function Decrementor(numSecs , numMins) {
  let arrayId = [];
  let secsHTML = document.querySelector('.seconds')
  let minsHTML = document.querySelector('.minutes')
  const pad = '0'
  let seconds = numSecs
  let minutes = numMins
  let secInterval;
  let intervalId = setInterval(() => {
    // let numTextMins = minutes.toString()
    // let numTextSeconds = seconds.toString()
    // let numLengthSecs = numTextSeconds.length
    // let numLengthMins = numTextMins.length
    
    if(minsHTML.textContent === '0:' && secsHTML.textContent === '00') {
      clearInterval(secInterval)
      clearInterval(intervalId)
      return 
    }
    
    if(secsHTML.textContent === '00'){
      minutes -= 1
      minsHTML.textContent = minutes + ":"
      secsHTML.textContent = 59

      let minutesinHTML = parseInt(minsHTML.textContent)
      let secondsinHTML = parseInt(secsHTML.textContent)
      secInterval = secondsDecrementor(secondsinHTML , secsHTML)
    } 
    arrayId.push(intervalId)
    arrayId.push(secInterval)
    
    // if(numLengthSecs != 2){
    //   seconds -= 1;
    //   numTextSeconds = pad + seconds
    //   secsHTML.textContent = numTextSeconds
    //   // timer -= 1;
    //   // console.log(numLengthSecs)
    //   // secsHTML.textContent = numTextSeconds;
    // } else {
    //   seconds -= 1;
    //   console.log(numLengthSecs)
    //   secsHTML.textContent = numTextSeconds;
    // }
    
  }, 1000);
  return arrayId;
} 



export function secondsDecrementor(seconds , refSecsHTML) {
  return setInterval(() => {
    seconds -= 1;
    let numTextSeconds = seconds.toString()
    let numLengthSecs = numTextSeconds.length

    
    
    if(numLengthSecs >= 2 && numTextSeconds >= 0){
      console.log(numTextSeconds)
      refSecsHTML.textContent = numTextSeconds;
      // seconds -= 1;
      // numTextSeconds = pad + seconds
      // console.log(numLengthSecs)
      // console.log(numTextSeconds)
      // refSecsHTML.textContent =  numTextSeconds
      // timer -= 1;
      // console.log(numLengthSecs)
      // secsHTML.textContent = numTextSeconds;
    } else if (numLengthSecs === 1 &&  numTextSeconds > 0){
      seconds -= 1;
      numTextSeconds = pad + seconds
      console.log(numLengthSecs)
      console.log(numTextSeconds)
      refSecsHTML.textContent =  numTextSeconds
      // seconds -= 1;
      // console.log(numTextSeconds)
      // refSecsHTML.textContent = numTextSeconds;
    }

  }, 1000)
  
}

*/