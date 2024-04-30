<script lang="ts">
  import pauseIcon from "./assets/svg/pause.svg";
  import playIcon from "./assets/svg/play.svg";
  import nextIcon from "./assets/svg/next.svg";
  import previousIcon from "./assets/svg/previous.svg";
  import volumeMin from "./assets/svg/volume-min.svg";
  import volumeMax from "./assets/svg/volume-max.svg";
  import { musics } from "./musics";
  import { onMount } from "svelte";
  import { updateCurrentTimeDisplay } from "./utils";

  let thumbnailElement: HTMLElement | null;
  let trackProgress: HTMLElement | null;
  let audioBuffer: any;

  let playing = false;
  let title = "";
  let artist = "";
  let audioLevel = 10;

  let currentMusicId = 0;
  let currentTime = "0:00";
  let remainingTime = "0:00";

  $: audioBuffer,
    () => {
      currentTime = audioBuffer.currentTime;
      console.log(currentTime);
    };

  function onPausePlay() {
    let interval;
    if (playing) audioBuffer?.pause();
    else {
      audioBuffer?.play();

      interval = setInterval(() => {
        currentTime = updateCurrentTimeDisplay(audioBuffer?.currentTime);
        remainingTime = updateCurrentTimeDisplay(audioBuffer?.duration - audioBuffer?.currentTime);

        if (trackProgress) {
          trackProgress.style.width = `${(audioBuffer?.currentTime * 100) / audioBuffer?.duration}%`;
        }
      }, 1000);
    }
    playing = !playing;
  }

  function updateMusic(value: number) {
    currentMusicId += value;
    console.log(currentMusicId);
    if (currentMusicId < 0 || currentMusicId > 2) currentMusicId = 0;

    title = musics[currentMusicId].title;
    artist = musics[currentMusicId].artist;

    if (thumbnailElement) {
      thumbnailElement.style.backgroundImage = `url(${musics[currentMusicId].thumbnail})`;
    }

    audioBuffer.load();
    if (playing) audioBuffer.play();
  }

  function onChangeAudioLevel() {
    audioBuffer.volume = audioLevel / 100;
  }

  onMount(() => {
    thumbnailElement = document.getElementById("thumbnail");
    audioBuffer = document.querySelector("audio");
    trackProgress = document.getElementById("track-progress");

    title = musics[currentMusicId].title;
    artist = musics[currentMusicId].artist;

    if (thumbnailElement) {
      thumbnailElement.style.backgroundImage = `url(${musics[currentMusicId].thumbnail})`;
    }

    if (audioBuffer) {
      audioBuffer.children[currentMusicId].selected = true;
      audioBuffer.volume = audioLevel / 100;
      audioBuffer.load();
    }
  });
</script>

<main>
  <div class="card">
    <div class="upper">
      <!-- IMAGE -->
      <div class="image" id="thumbnail">
        <button class="previous" on:click={() => updateMusic(-1)}>
          <img alt="previous" src={previousIcon} />
        </button>
        <button class="pause-play" on:click={onPausePlay}>
          <img alt="pause-play" src={playing ? pauseIcon : playIcon} />
        </button>
        <button class="next" on:click={() => updateMusic(1)}>
          <img alt="next" src={nextIcon} />
        </button>
      </div>

      <!-- DETAILS -->
      <div class="right-side">
        <div class="details">
          <t class="title">{title}</t>
          <t class="artist">{artist}</t>
        </div>
        <div class="timeline">
          <div class="track">
            <div id="track-progress"></div>
          </div>
          <div class="timers">
            <t id="current-time">{currentTime}</t>
            <t id="remaining-time">{remainingTime}</t>
          </div>
        </div>
      </div>
    </div>

    <div class="lower">
      <img alt="min-volume" src={volumeMin} class="volume-icon" />
      <input
        type="range"
        min="0"
        max="100"
        bind:value={audioLevel}
        class="volume-level"
        on:change={onChangeAudioLevel}
      />
      <img alt="max-volume" src={volumeMax} class="volume-icon" />
    </div>
  </div>
</main>

<audio id="audio">
  <source src={musics[currentMusicId].track} type="audio/mpeg" />
</audio>
