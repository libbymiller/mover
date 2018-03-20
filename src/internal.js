import createMusicPlayer from "./lib/musicPlayer.js";

const main = async () => {
  const websocket = createWebsocket();

  const musicPlayer = createMusicPlayer({
    music: document.getElementById("music")
  });

};

export default main();

