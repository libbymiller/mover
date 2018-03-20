const shuffle = (tracks, current = false) => {
  const pool = tracks.filter(t => t != current);

  return pool[Math.floor(Math.random() * pool.length)];
};

const musicPlayer = audioTag => tracks => {
  let track;

  const playNext = () => {
    track = shuffle(tracks, track);
    audioTag.src = track;
    audioTag.play();
  };

  audioTag.addEventListener("ended", playNext);

  playNext();
};


const createMusicPlayer = (opts = {}) => {
  const {
    musicLocation = "assets/music",
    music
  } = opts;
  const playMusic = musicPlayer(music);

  fetch(musicLocation)
    .then(res => res.json())
    .then(playMusic);

  return {
    stop: () => music.pause()
  };
};

export default createMusicPlayer;
