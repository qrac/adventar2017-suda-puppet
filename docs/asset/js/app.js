//----------------------------------------------------
// App
//----------------------------------------------------

let video = document.getElementById('video');
let video_btn = document.getElementById('video-btn');
let btn_status = 0;

video_btn.addEventListener('click', function () {
  if(btn_status === 0) {
    video.play();
    btn_status = 1;
  } else {
    video.pause();
    btn_status = 0;
  }
});