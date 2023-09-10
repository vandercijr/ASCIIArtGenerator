const rangeMap = (value, a, b, c, d) => {
  const scale = (d - c) / (b - a);
  const offset = -a * scale + c;
  return Math.floor(value * scale + offset);
};

const renderAscii = (input, output, canvas, invert = false) => {
  const PIXEL_SIZE = 4;
  const ascii = "Ñ@#W$9876543210?!abc;:+=-,._  ";
  // const ascii =
  //   String.fromCharCode(9618) +
  //   "ME@#W$987650?!abcsj;:+=-,.   " +
  //   String.fromCharCode(8801);

  // const unicodes = [
  //   9619, 9618, 9617, 8801, 182, 198, 171, 8249, 8218, 9472, 8211, 8212,
  //   176, 8226, 164, 169,
  // ];
  // const ascii = unicodes.map((u) => String.fromCharCode(u)).join("");

  const _ascii = invert ? ascii.split("").reverse().join("") : ascii;

  const context = canvas.getContext("2d");

  context.drawImage(input, 0, 0);

  const imageData = context.getImageData(0, 0, input.width, input.height);
  const { data: pixels } = imageData;

  const w = canvas.width / input.width;
  const h = canvas.height / input.height;

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

      context.fillStyle = `rgb(${grey}, ${grey}, ${grey})`;
      context.fillRect(i * w, j * h, w, w);
      context.textBaseline = "middle";
      context.textAlign = "center";

      const c = _ascii.charAt(rangeMap(grey, 0, 255, _ascii.length, 0));
      context.fillText(c, i * w + w * 0.5, j * h + h * 0.5);
      dataOutput += c === " " ? "&nbsp" : c;
    }
    dataOutput += "<br/>";
    output.innerHTML += dataOutput;
  }
};
