'use strict';

//----------------------------------------------------
// Video
//----------------------------------------------------

var video = document.getElementById('video');
var video_btn = document.getElementById('video-btn');
var btn_status = 0;

video_btn.addEventListener('click', function () {
  if (btn_status === 0) {
    video.play();
    btn_status = 1;
  } else {
    video.pause();
    btn_status = 0;
  }
});