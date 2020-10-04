import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss']
})
export class CircleComponent implements OnInit , AfterViewInit {
  title='Web Worker App';
  static ctx: CanvasRenderingContext2D;
  static IntervalHandle=null;
  static CANVAS_SIZE : number = 400;
  GRID_LINES:number=20;
  lineInterval:number =0;
  gridColor: string = 'lightgreen';
  
  @ViewChild('mainCanvas',{static:false})
  mainCanvas: ElementRef;

  constructor() {    
    console.log("ctor complete");
   }
   
  ngOnInit(): void {
  }

  ngAfterViewInit():void {
    CircleComponent.ctx= (<HTMLCanvasElement> this.mainCanvas.nativeElement).getContext('2d');

    this.initApp();
    this.initBoard();
    this.drawGrid();



  }

  initApp()
  {
    CircleComponent.ctx.canvas.height=CircleComponent.CANVAS_SIZE;
    CircleComponent.ctx.canvas.width=CircleComponent.ctx.canvas.height;
  }

  initBoard()
  {
    console.log('initBoard...');

    this.lineInterval= Math.floor(CircleComponent.ctx.canvas.width/this.GRID_LINES);
    console.log(this.lineInterval);
  }

  drawGrid()
  {
    console.log("drawGrid...");
    CircleComponent.ctx.globalAlpha=1;
    CircleComponent.ctx.fillStyle="white";
    CircleComponent.ctx.fillRect(0,0,CircleComponent.ctx.canvas.height,CircleComponent.ctx.canvas.width);

    for (let lineCount = 0; lineCount < this.GRID_LINES; lineCount++) {
        CircleComponent.ctx.fillStyle=this.gridColor;
        CircleComponent.ctx.fillRect(0,this.lineInterval*(lineCount+1),CircleComponent.ctx.canvas.width,2);
       CircleComponent.ctx.fillRect(this.lineInterval* (lineCount+1),0,2,CircleComponent.ctx.canvas.width)

    }
  }

  toggleTimer()
  {
    if(CircleComponent.IntervalHandle==null)
    {
        CircleComponent.IntervalHandle=setInterval(this.drawRandomCircle,100);
    }
    else{
        clearInterval(CircleComponent.IntervalHandle);
        CircleComponent.IntervalHandle=null;
        this.drawGrid();
    }
  }

  drawRandomCircle()
  {
    let point=CircleComponent.generateRandomPoints();
    CircleComponent.drawPoints(point);

  }

  static generateRandomPoints()
  {
    let X=Math.floor(Math.random() * CircleComponent.CANVAS_SIZE);
    let Y=Math.floor(Math.random() * CircleComponent.CANVAS_SIZE);
    return {x:X,y:Y};
  }

  static drawPoints(currentPoint)
  {
    let radius:number=10;

    let r:number= Math.floor(Math.random() * 256);
    let g:number= Math.floor(Math.random() * 256);
    let b:number= Math.floor(Math.random() * 256);
    let rgbComposite:string='rgb(' + r +',' + g +',' + b +')';

    CircleComponent.ctx.strokeStyle=rgbComposite;
    CircleComponent.ctx.fillStyle=rgbComposite;
    CircleComponent.ctx.beginPath();
    CircleComponent.ctx.arc(currentPoint.x,currentPoint.y,radius,0,2* Math.PI);
    CircleComponent.ctx.stroke();
    CircleComponent.ctx.fill();

  }
}
