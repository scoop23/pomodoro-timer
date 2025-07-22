self.onmessage = function (event) {
  let { strmin, strsec } = event.data; // Get initial values
  let min = Number(strmin)
  let sec = Number(strsec)
  
  let intervalId = setInterval(() => {
    if (min === 0 && sec === 0) {
      return;
    }
    if(sec === 0){
      min--;
      sec = 59;
    }else{
      sec--;
    }
    
    self.postMessage({ 
      min : String(min),
      sec : String(sec).padStart(2 , '0'),
      intervalId
    })
  }, 100);
};
