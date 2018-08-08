

function writeEffect() {
  
  var canvas = document.getElementById("canvas2")
  // get 2D context
  var ctx = canvas.getContext("2d"),

      // dash-length for off-range
      dashLen = 220,

      // we'll update this, initialize
      dashOffset = dashLen,

      // some arbitrary speed
      speed = 20,

      // the text we will draw
      txt = canvas.innerHTML,

      // start position for x and iterator
      x = 0, i = 0;
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  ctx.font = "30px Comic Sans MS, cursive, TSCu_Comic, sans-serif"; 

  // thickness of the line
  ctx.lineWidth = 2; 

  // to avoid spikes we can join each line with a round joint
  ctx.lineJoin = "round";

  ctx.strokeStyle = ctx.fillStyle = "#fff";

  (function loop() {
    // clear canvas for each frame
    ctx.clearRect(x, 0, 60, 150);

    // calculate and set current line-dash for this char
    ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]);

    // reduce length of off-dash
    dashOffset -= speed;

    // draw char to canvas with current dash-length
    ctx.strokeText(txt[i], x, 90);

    // char done? no, the loop
    if (dashOffset > 0) requestAnimationFrame(loop);
    else {

      // ok, outline done, lets fill its interior before next
      //ctx.fillText(txt[i], x, 90);

      // reset line-dash length
      dashOffset = dashLen;

      // get x position to next char by measuring what we have drawn
      x += ctx.measureText(txt[i++]).width + ctx.lineWidth;

      // if we still have chars left, loop animation again for this char
      if (i < txt.length) requestAnimationFrame(loop);
    }
  })();  // just to self-invoke the loop
}

//writeEffect('hi yash');