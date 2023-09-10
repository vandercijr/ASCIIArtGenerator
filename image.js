const setupImage = (imageSource, callback) => {
  const image = new Image();
  image.src = imageSource;

  image.addEventListener("load", () => {
    if (typeof callback === "function") {
      callback(image);
    }
  });
};
