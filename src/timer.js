import { ssrExportAllKey } from "vite/module-runner";
import { Howl } from "howler";
import { alarmSound } from "./main";
import { data } from "autoprefixer";

var pad = '0'

export let worker = new Worker(new URL("worker.js", import.meta.url));

export function timer() {
  const pad = '0'
  let minutes = document.querySelector('.minutes');
  let seconds = document.querySelector('.seconds');
  let numMinutes = parseInt(minutes.textContent)
  let numSecs = parseInt(seconds.textContent)

  console.log(numMinutes , numSecs)
  
  if(worker){ // if a worker exists 
    worker.terminate(); // terminate it
    worker = new Worker(new URL("worker.js" , import.meta.url)) 
    // and create a new one called worker because the other 'worker' is destroyed
    // you can reaasign it                                                          
  }

  timerWorker(minutes, seconds);
  
  // let intervalId = setInterval(() => {
  if(minutes.textContent === '0' && seconds.textContent === '00') {
    alarmSound.play()
    console.log("oloy")
    return 
  }  
  //   if(minutes.textContent === '0' && seconds.textContent === '00') {
  //     alarmSound.play()
  //     clearInterval(intervalId)
  //     return 
  //   }    
  //   if(seconds.textContent === '00'){
  //     numMinutes -= 1;
  //     minutes.textContent = numMinutes;
  //     seconds.textContent = 59;
  //   }else if(seconds.textContent > 10){
  //     numSecs = parseInt(seconds.textContent);
  //     numSecs -= 1;
  //     seconds.textContent = numSecs;
  //   }else{
  //     numSecs -= 1;
  //     seconds.textContent = pad + numSecs;
  //   }
  // }, 1000);
}

export function timerWorker(minutes , seconds) {
  let strmin = minutes.textContent;
  let strsec = seconds.textContent;
  if (window.Worker) { // checks if web workers are supported in the browser

    worker.onmessage = function(event) { 
      // this is the data that we received from the worker.js sent
      // the onmessage is a event listener
        const { min,sec,intervalId} = event.data;
        console.log(min,sec)

        minutes.textContent = min
        seconds.textContent = sec

        return intervalId;
    }; 
  
    worker.postMessage({strmin , strsec});  // this is the data that we will send to the worker.js
  } else {
    console.log("Web Workers are not supported in this browser.");
  }

}