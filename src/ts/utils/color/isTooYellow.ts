import isTooGreen from './isTooGreen';

export default (rgb: string) => {
	let separator = rgb.indexOf(',') > -1 ? ',' : ' ';

  const rgbArr = rgb.substr(4).split(')')[0].split(separator);

  return isTooGreen(rgb) && +rgbArr[0] > 180 && +rgbArr[1] <= 255;
};
