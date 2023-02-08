function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  if (min > max) {
    const oldMin = min;
    min = max;
    max = oldMin;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const res = getRandomNum(25, 5);
console.log(res);

function getCoordinates(min, max, signs) {

  if (min > max) {
    const oldMin = min;
    min = max;
    max = oldMin;
  }

  if (Math.random() < 0.5) {
    return ((1-Math.random()) * (max - min) + min).toFixed(signs);
  }

  return  (Math.random() * (max - min) + min).toFixed(signs);

}
console.log(getCoordinates(1.53, 4.33, 2));
