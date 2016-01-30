var qvgaButton = document.querySelector("button#snapshot");
var vga = document.querySelector("button#vga");
var video = document.querySelector("video");
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var stream;

navigator.getUserMedia = navigator.getUserMedia ||
  navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

function successCallback(stream) {
  window.stream = stream; // stream available to console
  video.src = window.URL.createObjectURL(stream);
}

function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}

function snapshot() {
    if (stream) {
      ctx.drawImage(video, 0,0,250,150);
      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.
      document.querySelector('img').src = canvas.toDataURL('image/webp');
    }
  }


var qvgaConstraints  = {
  video: {
    mandatory: {
      width: 800,
      height: 800
    }
  }
};

qvgaButton.onclick = function(){getMedia(qvgaConstraints)};
vga.onclick= function(){snapshot()};

function getMedia(constraints){
  if (!!stream) {
    video.src = null;
    stream.stop();
  }
  navigator.getUserMedia(constraints, successCallback, errorCallback);
}
