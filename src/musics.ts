import track1 from "./assets/Falconer - Southern Roots Boogie.mp3";
import thumbnail1 from "./assets/Falconer - Southern Roots Boogie.png";
import track2 from "./assets/Ofer Koren - Sax Party.mp3";
import thumbnail2 from "./assets/Ofer Koren - Sax Party.png";
import track3 from "./assets/Raw - Nonsense.mp3";
import thumbnail3 from "./assets/Raw - Nonsense.png";

export const musics = [
  {
    title: extractMusicTitle(track1),
    artist: extractMusicArtist(track1),
    track: track1,
    thumbnail: thumbnail1,
  },
  {
    title: extractMusicTitle(track2),
    artist: extractMusicArtist(track2),
    track: track2,
    thumbnail: thumbnail2,
  },
  {
    title: extractMusicTitle(track3),
    artist: extractMusicArtist(track3),
    track: track3,
    thumbnail: thumbnail3,
  },
];

export function extractMusicTitle(music: string) {
  return music
    .replaceAll("%", " ")
    .replaceAll("20", "")
    .replaceAll(".mp3", "")
    .split("/")[3]
    .split("-")[0];
}

export function extractMusicArtist(music: string) {
  return music
    .replaceAll("%", "")
    .replaceAll("20", " ")
    .replaceAll(".mp3", "")
    .split("/")[3]
    .split("-")[1];
}
