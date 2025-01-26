//Initialize the Variables

let songIndex = 0;
const audioElement = new Audio("songs/1.mp3");
const masterPlay = document.getElementById("masterPlay");
const myProgressBar = document.getElementById("myProgressBar");
const gif = document.getElementById("gif");
const songItems = Array.from(document.getElementsByClassName("songItem"));
const masterSongName = document.getElementById("masterSongName");
const next = document.getElementById("next");
const previous = document.getElementById("previous")
const songs = [
  { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
  { songName: "Flowers", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
  { songName: "Kill Bill", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
  { songName: "On My Way", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
  { songName: "Senorita", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
  { songName: "That's So True", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
  { songName: "Watermelon", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
  { songName: "Timeless", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
  { songName: "Die With A Smile", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
  { songName: "Not Like Us", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
];

// audioElement.play()

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// handle play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = 0;
  }
});

// Listen to evenets
audioElement.addEventListener("timeupdate", () => {
  // update Seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);

// write code for next button
next.addEventListener("click", () => {

  songIndex = songIndex >= 9 ? 0 : songIndex + 1;

  // if (songIndex >= 9) {
  //   songIndex = 0;
  // } else {
  //   songIndex += 1;
  // }

  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

// end the next button code 

// start previous button code 

previous.addEventListener("click", () => {

  songIndex = songIndex <=0 ? 0 : songIndex -1;

  // if (songIndex <= 0) {
  //   songIndex = 0;
  // } else {
  //   songIndex -= 1;
  // }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

// end previous button code 