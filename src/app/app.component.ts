import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'webworkerapp';

  longProcessOutput:string="Long\nprocess\noutput\nwill\nappear\nhere\n";

  longLoop()
  {
    this.longProcessOutput="";
    for (let x = 1; x < 1000000000; x++) {
      let y=x/3.2;
      if((x%20000000)==0)
      {
        this.longProcessOutput+=x + "\n";
        console.log(x);
      }
    }
  }
}
