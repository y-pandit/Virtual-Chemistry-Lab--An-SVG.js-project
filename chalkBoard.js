 var ctx = document.querySelector("canvas").getContext("2d"),
  
      // dash-length for off-range
        dashLen = 220,
    
    // we'll update this, initialize
        dashOffset = dashLen,
    
    // some arbitrary speed
        speed = 5,
    
    // the text we will draw
        txt = "Welcome!",


    



    
    // start position for x and iterator
    x = 30, i = 0;

 // Comic Sans?? Let's make it useful for something ;) w/ fallbacks
    ctx.font = "35px Comic Sans MS, cursive, TSCu_Comic, sans-serif"; 
  
  // thickness of the line
    ctx.lineWidth = 5; 
  
  // to avoid spikes we can join each line with a round joint
  ctx.lineJoin = "round";
  
  // increase realism letting background (f.ex. paper) show through
  ctx.globalAlpha = 2/3;
  
  // some color, lets use a black pencil
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
       ctx.fillText(txt[i], x, 90);
       
       
        
        
   // reset line-dash length
        dashOffset = dashLen;
        
        // get x position to next char by measuring what we have drawn
        // notice we offset it a little by random to increase realism
        x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
        
        // lets use an absolute transform to randomize y-position a little
        ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());
        
        // and just cause we can, rotate it a little too to make it even
        // more realistic
        ctx.rotate(Math.random() * 0.005);
        
        // if we still have chars left, loop animation again for this char
        if (i < txt.length) requestAnimationFrame(loop);
      }
    })();  // just to self-invoke the loop




