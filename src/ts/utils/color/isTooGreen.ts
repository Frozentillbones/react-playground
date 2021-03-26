export default (rgb: string) => {
	let separator = rgb.indexOf(',') > -1 ? ',' : ' ';

  const rgbArr = rgb.substr(4).split(')')[0].split(separator);

  return +rgbArr[1] > 200 && +rgbArr[1] <= 255;
};
