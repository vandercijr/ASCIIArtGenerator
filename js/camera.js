const createCamera = (options, callback) => {
  navigator.mediaDevices
    .getUserMedia({
      audio: false,
      video: { width: options.width, height: options.height },
    })
    .then((stream) => {
      if (options?.videoEl) {
        options.videoEl.addEventListener(
          "loadedmetadata",
          (meta) => {
            setInterval(() => {
              options.videoEl.width =
                options.width ?? meta?.target?.offsetWidth;
              options.videoEl.height =
                options.height ?? meta?.target?.offsetHeight;
              if (typeof callback === "function") {
                callback(options.videoEl);
              }
            }, options.interval);
          },
          false
        );
        options.videoEl.srcObject = stream;
        options.videoEl.play();
      }
    })
    .catch((e) => {
      console.log("Something wrong loading camera ", e);
    });
};
