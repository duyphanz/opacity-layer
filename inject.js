(function () {
  // Wrapper
  const div = document.createElement("div");
  div.setAttribute("class", "opacity-layer");

  const imgWrapper = document.createElement("div");
  imgWrapper.setAttribute("class", "opacity-layer-image-wrapper");

  const controlWrapper = document.createElement("div");
  controlWrapper.setAttribute("class", "opacity-layer-control-wrapper");

  imgWrapper.onmousedown = function (event) {
    if (event.target.nodeName === "INPUT") return;
    let shiftX = event.clientX - imgWrapper.getBoundingClientRect().left;
    let shiftY = event.clientY - imgWrapper.getBoundingClientRect().top;

    moveAt(event.pageX, event.pageY);

    // moves the div at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
      div.style.left = pageX - shiftX + "px";
      div.style.top = pageY - shiftY + "px";
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    function onKeyDown(event) {
      if (event.key === "Escape") {
        document.removeEventListener("mousemove", onMouseMove);
        imgWrapper.onmouseup = null;
      }
    }

    // move the div on mousemove
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("keydown", onKeyDown);

    // drop the div, remove unneeded handlers
    imgWrapper.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      imgWrapper.onmouseup = null;
    };
  };

  imgWrapper.ondragstart = function () {
    return false;
  };

  // IMG
  const img = document.createElement("img");
  img.setAttribute("class", "opacity-layer-image");
  img.alt = "image";
  img.draggable = false;

  // Range Slider
  const rangeInput = document.createElement("input");
  rangeInput.setAttribute("class", "opacity-layer-range-input");
  rangeInput.type = "range";
  rangeInput.min = "1";
  rangeInput.max = "100";
  rangeInput.value = "50";

  rangeInput.oninput = (evt) => {
    img.style.opacity = evt.target.value / 100;
  };

  // IMG input
  const imgInput = document.createElement("input");
  imgInput.setAttribute("class", "opacity-layer-input");
  imgInput.setAttribute("type", "file");
  imgInput.onchange = (evt) => {
    var tgt = evt.target || window.event.srcElement,
      files = tgt.files;

    if (FileReader && files && files.length) {
      var fr = new FileReader();
      fr.onload = function () {
        img.style.display = "block";
        img.src = fr.result;
      };
      fr.readAsDataURL(files[0]);
    }
  };

  // appendChild
  imgWrapper.appendChild(img);
  div.appendChild(imgWrapper);

  controlWrapper.appendChild(imgInput);
  controlWrapper.appendChild(rangeInput);
  div.appendChild(controlWrapper);

  document.body.appendChild(div);
})();
