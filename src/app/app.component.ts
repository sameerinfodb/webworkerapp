import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webworkerapp';
  worker:any;
  longProcessOutput:string="Long\nprocess\noutput\nwill\nappear\nhere\n";

  /**
   *
   */
  constructor() {
    if (typeof Worker !== 'undefined') {
      // Create a new
     this.worker = new Worker('./app.worker', { type: 'module' });
      this.worker.onmessage = ({ data }) => {
        console.log('OnMessage');
          this.longProcessOutput+=`${data}` + "\n";
      };
     
    } else {
      console.log("Web Worker are not supported by your browser");
    }
    
  }
  longLoop()
  {
    console.log('longLoop Called');
    this.longProcessOutput="";
    this.worker.postMessage('start looping...');
  }
}

