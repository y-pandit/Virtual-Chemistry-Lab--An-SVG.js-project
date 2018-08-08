
/****************************************************/
/****** Using the Stopwatch for good stuff **********/

var canvas = document.getElementById('stopwatch'),
    ctx = canvas.getContext('2d'),
    startStopButton = document.getElementById('startStopButton'),
    secondsInput = document.getElementById('seconds'),

    TICK_WIDTH = 15,
    TEXT_MARGIN = 15,
    CENTROID_RADIUS = 5,
    DEGREE_DIAL_MARGIN = 20,
    TRACKING_DIAL_MARGIN = 25,
    DEGREE_ANNOTATIONS_TEXT_SIZE = 8,
    DEGREE_OUTER_DIAL_MARGIN = DEGREE_DIAL_MARGIN,

    CENTROID_STROKE_STYLE = 'rgba(0, 0, 0, 0.5)',
    CENTROID_FILL_STYLE ='rgba(80, 190, 240, 0.6)',
    GUIDEWIRE_FILL_STYLE = 'rgba(85, 190, 240, 0.8)',
    TICK_LONG_STROKE_STYLE = 'rgba(100, 140, 230, 0.9)',
    TICK_SHORT_STROKE_STYLE = 'rgba(100, 140, 230, 0.7)',   
    DEGREE_ANNOTATIONS_FILL_STYLE = 'rgba(0, 0, 230, 0.9)',
    TRACKING_DIAL_STROKING_STYLE = 'rgba(100, 140, 230, 0.5)',

    GUIDEWIRE_STROKE_STYLE = '#8ada55',
    GUIDEWIRE_FILL_STYLE = 'rgba(0, 0, 230, 0.9)';

    var circle = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        radius: 50
    },

    timerSetting = 0,
    stopwatch = new Stopwatch();

function windowToCanvas(canvas, x, y) {
   var bbox = canvas.getBoundingClientRect();
   return {
	x: x - bbox.left * (canvas.width  / bbox.width),
        y: y - bbox.top  * (canvas.height / bbox.height)
   };
}

// Drawing

function drawCentroid() {
alert("drawing centroid");
   ctx.beginPath();
	   ctx.save();
		   ctx.strokeStyle = CENTROID_STROKE_STYLE;
		   ctx.fillStyle = CENTROID_FILL_STYLE;
		
		   ctx.arc(circle.x, circle.y, CENTROID_RADIUS, 0, Math.PI*2, false);
		   ctx.stroke();
		   ctx.fill();
	   ctx.restore();
}

function drawHand(loc) {
   var initialAngle = -Math.PI / 2 - (Math.PI / 180) * (timerSetting / 60 * 360),
       angle = initialAngle,
       stopwatchElapsed = stopwatch.getElapsedTime(),
       seconds,
       radius,
       endPt;

  if (stopwatchElapsed) {
     angle = -Math.PI / 2 - (Math.PI / 180) * ((timerSetting - stopwatchElapsed / 1000) / 60 * 360);
     seconds = parseFloat(timerSetting - stopwatchElapsed / 1000).toFixed(2);

     if (seconds > 0) {
         secondsInput.value = seconds;
     }
   }

   radius = circle.radius + TRACKING_DIAL_MARGIN;

   if (loc.x >= circle.x) {
	endPt = {
		x: circle.x + radius * Math.cos(angle),
        	y: circle.y + radius * Math.sin(angle)
	};
   }
   else {
        endPt = {
		x: circle.x - radius * Math.cos(angle),
                y: circle.y - radius * Math.sin(angle)
        };
   }
   
   ctx.save();
	   ctx.strokeStyle = GUIDEWIRE_STROKE_STYLE;
	   ctx.fillStyle = GUIDEWIRE_FILL_STYLE;
	   ctx.lineWidth = 1.5;

	   ctx.beginPath();
		   ctx.moveTo(circle.x, circle.y);
		   ctx.lineTo(endPt.x, endPt.y);
	   ctx.stroke();

	   ctx.beginPath();
		   ctx.fillStyle = 'yellow';
		   ctx.arc(endPt.x, endPt.y, 7, 0, Math.PI * 2, false);
	   ctx.stroke();
	   ctx.fill();
   ctx.restore();
}

function drawDegreeOuterDial() {
   ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';

   ctx.arc(circle.x, circle.y, circle.radius +DEGREE_OUTER_DIAL_MARGIN, 0, Math.PI * 2, false);
}

function drawDegreeAnnotations() {
   var radius = circle.radius +TEXT_MARGIN;

   ctx.save();
	ctx.fillStyle = DEGREE_ANNOTATIONS_FILL_STYLE;
	ctx.font = DEGREE_ANNOTATIONS_TEXT_SIZE +'px Arial'; 
   
   	for (var angle = Math.PI/2, i = 0; i < 60; angle += Math.PI/6, i += 5) {
		ctx.beginPath();
			ctx.fillText(i,
				circle.x + Math.cos(angle) * (radius - TICK_WIDTH * 2),
				circle.y - Math.sin(angle) * (radius - TICK_WIDTH*2)
			);
	}
   ctx.restore();
}
   
function drawDegreeDialTicks() {
   var radius = circle.radius + DEGREE_DIAL_MARGIN,
       ANGLE_MAX = 2 * Math.PI,
       ANGLE_DELTA = Math.PI / 64;

    ctx.save();
   	for (var angle = 0, cnt = 0; angle < ANGLE_MAX; angle += ANGLE_DELTA, ++cnt) {
		ctx.beginPath();

      		if (cnt % 4 === 0) {
			ctx.moveTo(
				circle.x + Math.cos(angle) * (radius - TICK_WIDTH),
                        	circle.y + Math.sin(angle) * (radius - TICK_WIDTH)
			);
		        ctx.lineTo(
				circle.x + Math.cos(angle) * (radius),
				circle.y + Math.sin(angle) * (radius)
			);
		         ctx.strokeStyle = TICK_LONG_STROKE_STYLE;
		         ctx.stroke();
      		}
		else {
			ctx.moveTo(
				circle.x + Math.cos(angle) * (radius - TICK_WIDTH / 2),
	                        circle.y + Math.sin(angle) * (radius - TICK_WIDTH / 2)
			);
		        ctx.lineTo(
				circle.x + Math.cos(angle) * (radius),
	                        circle.y + Math.sin(angle) * (radius)
			);
		        ctx.strokeStyle = TICK_SHORT_STROKE_STYLE;
		        ctx.stroke();
		}
	}
    ctx.restore();
}

function drawDegreeTickDial() {
   ctx.save();
	   ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
	   ctx.arc(circle.x, circle.y, circle.radius + DEGREE_DIAL_MARGIN - TICK_WIDTH, 0, Math.PI * 2, false);
	   ctx.stroke();
   ctx.restore();
}

function drawTrackingDial() {
   ctx.save();
	   ctx.strokeStyle = TRACKING_DIAL_STROKING_STYLE;
	   ctx.beginPath();
		   ctx.arc(circle.x, circle.y, circle.radius +TRACKING_DIAL_MARGIN, 0, Math.PI * 2, true);
	   ctx.stroke();
   ctx.restore();
}

function drawDial() {
   var loc = {
	x: circle.x,
	y: circle.y
   };
   
   drawCentroid();
   drawHand(loc);

   drawTrackingDial();
   drawDegreeOuterDial();

   ctx.fillStyle = 'rgba(218, 165, 35, 0.2)';
   ctx.fill();

   ctx.beginPath();
	   drawDegreeOuterDial();
   ctx.stroke();
    
   drawDegreeTickDial();
   drawDegreeDialTicks();
   drawDegreeAnnotations();
}

function redraw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); 
	drawDial();
}

function animate() {
   // Stopped running
   if (stopwatch.isRunning() && stopwatch.getElapsedTime() > timerSetting * 1000) {
	stopwatch.stop();
   	secondsInput.value = 0;
	secondsInput.disabled = false;
	startStopButton.value = 'Start';
   }
   // Running
   else if (stopwatch.isRunning()) {
   	redraw();
   	requestAnimationFrame(animate);
   }
}

startStopButton.onclick = function(e) {
   var value = startStopButton.value;

   if (value === 'Start') {
       document.getElementById('time')
        .innerHTML = parseFloat(secondsInput.value);
   
      timerSetting = parseFloat(secondsInput.value);
      secondsInput.disabled = true;
      stopwatch.start();
      startStopButton.value = 'Stop';
      requestAnimationFrame(animate);
   }
   else {
      timerSetting = parseFloat(secondsInput.value);
      secondsInput.disabled = false;
      startStopButton.value = 'Start';
      stopwatch.stop();
   }

   stopwatch.reset();
};

secondsInput.onchange = function(e) {
   timerSetting = parseFloat(secondsInput.value);
   redraw();
};

// Init

ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

drawDial();

