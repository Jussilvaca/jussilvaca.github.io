let vid;
function setup() {
  noCanvas();

  vid = createVideo(
    ['/assets/video/fingers.mov', '/assets/video/fingers.webm'],
    vidLoad
  );

  vid.size(320, 240);
}

// This function is called when the video loads
function vidLoad() {
  vid.loop();
  vid.volume(0);
}