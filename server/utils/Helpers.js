const decodeToken = (token) => {
  return token;
};

const isSpecialCharacter = (word) => {
  const rex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const isSpecial = rex.test(word) && word.length === 1;
  return isSpecial;
};

const formatTime = (time) => {
  const miliseconds = time.toString().split(".").pop();
  const date = new Date(time * 1000).toISOString().substr(11, 8);
  return date + "," + parseInt(miliseconds) * 10;
};
module.exports = {
  decodeToken,
  isSpecialCharacter,
  formatTime,
};
