const fs = require("fs");

const generateRandomNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 80; i++) {
    const randomNumber = (Math.random() * 9 + 1).toFixed(10);
    numbers.push(Number(randomNumber));
  }
  return numbers;
};

const writeToFile = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data));
};

const originalArray = generateRandomNumbers();
writeToFile("originalArray.json", originalArray);

const sortArray = (order) => {
  const sortedArray = originalArray.slice().sort((a, b) => {
    if (order === "asc") {
      return a - b;
    } else {
      return b - a;
    }
  });
  return sortedArray;
};

writeToFile("sortedArrayAsc.json", sortArray("asc"));
writeToFile("sortedArrayDesc.json", sortArray("desc"));
