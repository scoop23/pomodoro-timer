(function(){"use strict";self.onmessage=function(s){let{strmin:n,strsec:r}=s.data,t=Number(n),e=Number(r),i=setInterval(()=>{t===0&&e===0||(e===0?(t--,e=59):e--,self.postMessage({min:String(t),sec:String(e).padStart(2,"0"),intervalId:i}))},1e3)}})();
