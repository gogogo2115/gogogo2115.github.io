// eslint-disable-next-line @typescript-eslint/no-require-imports
const arrayShuffle = require("./arrayShuffle");

const defaultCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const charactersShuffle = arrayShuffle(defaultCharacters.split("")).join("");

const generateRandomString = (length = 8, characters = charactersShuffle) => {
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
};

module.exports = generateRandomString;
