alert('hello');
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

c.fillStyle="#FF0000";
c.fillRect(100, 100, 100, 100);