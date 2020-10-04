/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
    console.log(`in worker Event Listener:${data}`);
  for (let x = 1; x < 1000000000; x++) {
    let y=x/3.2;
    if((x%20000000)==0)
    {
     postMessage(x);
    }
  }
});
