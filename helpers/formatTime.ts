export const formatTime = (duration: number) => {
  if (duration < 60) return `0m ${duration}s`;
  const minute = Math.floor(duration / 60);
  const seconds = duration % 60;
  return minute + 'm' + ' ' + seconds + 's';
};
