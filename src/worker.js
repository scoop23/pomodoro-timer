
self.onmessage = function (event) {
  let { strmin, strsec } = event.data; // Get initial values
  let min = Number(strmin)
  let sec = Number(strsec)

  let intervalId = setInterval(() => {
    if (min === 0 && sec === 0) {
      console.log("hey");
      clearInterval(timer); // Stop the timer when it reaches 00:00
      return;
    }
    if(sec === 0){
      min--;
      sec = 59;
    }
    sec--;
    
    self.postMessage({ 
      min : String(min),
      sec : String(sec).padStart(2 , '0'),
      intervalId
    })
  }, 1000);
};
