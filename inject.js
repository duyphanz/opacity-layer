(function () {
  // Wrapper
  const div = document.createElement("div");
  div.setAttribute("class", "opacity-layer");

  div.onmousedown = function (event) {
    if (event.target.nodeName === "INPUT") return;
    let shiftX = event.clientX - div.getBoundingClientRect().left;
    let shiftY = event.clientY - div.getBoundingClientRect().top;

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
        div.onmouseup = null;
      }
    }

    // move the div on mousemove
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("keydown", onKeyDown);

    // drop the div, remove unneeded handlers
    div.onmouseup = function () {
      document.removeEventListener("mousemove", onMouseMove);
      div.onmouseup = null;
    };
  };

  div.ondragstart = function () {
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
  div.appendChild(imgInput);
  div.appendChild(rangeInput);
  div.appendChild(img);
  document.body.appendChild(div);
})();
