export function updateCurrentTimeDisplay(time: number) {
  const currentMinutes = Math.floor(time / 60);
  const currentSeconds = Math.floor(time % 60);
  const formattedTime = `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")}`;
  return formattedTime;
}
