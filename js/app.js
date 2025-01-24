document.addEventListener('DOMContentLoaded', () => {
  // Array of background images for hero section
  let images = [
    'images/hero-background1.jpg',
    'images/hero-background2.jpg',
    'images/hero-background3.jpg'
  ];
  
  // Array of video sources
  let videos = [
    'videos/video1.mp4',
    'videos/video2.mp4',
    'videos/video3.mp4'
  ];

  // Select the hero section and video player
  let heroSection = document.querySelector('.hero');
  let videoPlayer = document.getElementById('video-player');
  
  let imageIndex = 0;
  let videoIndex = 0;

  // Function to change background image every 4 seconds
  setInterval(() => {
    heroSection.style.backgroundImage = `url(${images[imageIndex]})`;
    imageIndex = (imageIndex + 1) % images.length;
  }, 4000);

  // Function to change video every 4 seconds
  setInterval(() => {
    videoPlayer.src = videos[videoIndex];
    videoPlayer.load();
    videoPlayer.play();
    videoIndex = (videoIndex + 1) % videos.length;
  }, 4000);  // Change the video every 4 seconds
});
