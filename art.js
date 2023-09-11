const rangeMap = (value, a, b, c, d) => {
  const scale = (d - c) / (b - a);
  const offset = -a * scale + c;
  return Math.floor(value * scale + offset);
};

const renderAscii = (input, output, invert = false) => {
  const PIXEL_SIZE = 4;
  const ascii = "Ñ@#W$9876543210?!abc;:+=-,._  ";

  const _ascii = invert ? ascii.split("").reverse().join("") : ascii;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", {
    willReadFrequently: true,
  });

  context.drawImage(input, 0, 0);

  const imageData = context.getImageData(0, 0, input.width, input.height);
  const { data: pixels } = imageData;

  output.innerHTML = "";
  for (let j = 0, s = input.height; j < s; j++) {
    let dataOutput = "";
    for (let i = 0, s = input.width; i < s; i++) {
      const offset = (i + j * input.width) * PIXEL_SIZE;
      const [r, g, b] = [
        pixels[offset],
        pixels[offset + 1],
        pixels[offset + 2],
      ];
      const grey = (r + g + b) / 3;

      const c = _ascii.charAt(rangeMap(grey, 0, 255, _ascii.length, 0));

      dataOutput += c === " " ? "&nbsp" : c;
    }
    dataOutput += "<br/>";
    output.innerHTML += dataOutput;
  }
};
