const getCurrentTime = () => {
  const hours = new Date().getHours();
  const minutes = new Date().getMinutes();
  return `${hours}:${minutes}`;
};

export default getCurrentTime;
