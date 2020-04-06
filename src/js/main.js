var hamburger = document.querySelector(".hamburger-menu");
var mainNav = document.querySelector(".main-nav");

hamburger.addEventListener("click", function() {
    mainNav.classList.toggle("main-nav--closed");
    mainNav.classList.toggle("main-nav--open");
})

var selected = document.querySelector(".selected");
var optionsContainer = document.querySelector(".options-container");

var optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
  optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});

var inputRange = document.getElementById('range');
var rangeCursor = document.getElementById('range-cursor');
var rangeStub = document.getElementById('range-stub');
var rangeDescription = document.getElementById('range-description');
 
inputRange.oninput = typeRange;
window.onload = typeRange;

function typeRange() {
 rangeStub.style.width = (100 - inputRange.value * 25) + '%';
    rangeStub.style.clipPath = "polygon(0 " + (11 - 3 * inputRange.value) + "px" + ", 100% 0, 100% 100%, 0 100%)";
    rangeCursor.style.left = inputRange.value * 25 + '%';
}

rangeCursor.onmousedown = function(e) { 
  moveAt(e);
  rangeCursor.classList.remove('range-cursor--free');
  rangeStub.classList.remove('range-stub--free');
  function moveAt(e) {
    if(e.pageX <= inputRange.getBoundingClientRect().left) {
    rangeCursor.style.left = '0'
  } else if (e.pageX >= inputRange.getBoundingClientRect().left + inputRange.offsetWidth) {
    rangeCursor.style.left = '100%'
  } else {
    rangeCursor.style.left = e.pageX - inputRange.getBoundingClientRect().left + 'px';
  }
    }

  document.onmousemove = function(e) {
    moveAt(e);
    paintGradient(e.pageX);
    showLines();
    countValue(e.pageX);
  }

  rangeCursor.onmouseup = function(e) {
    document.onmousemove = null;
    rangeCursor.onmouseup = null;
    typeRange();
    rangeCursor.classList.add('range-cursor--free');
    rangeStub.classList.add('range-stub--free');
  }
}

function paintGradient(tmp) {
  var width = inputRange.offsetWidth - tmp + inputRange.getBoundingClientRect().left;
  var pathWidth = "polygon(0 " + (11 - ((tmp - inputRange.getBoundingClientRect().left))/(inputRange.offsetWidth / 12)) + "px" + ", 100% 0, 100% 100%, 0 100%)";
  console.log(((tmp - inputRange.getBoundingClientRect().left))/(inputRange.offsetWidth / 12))
  if(width <= inputRange.offsetWidth) {
    rangeStub.style.width =  width +  'px';
    rangeStub.setAttribute("style", "clip-path:" + pathWidth + "; -webkit-clip-path:" + pathWidth + "; width: " + width + 'px');
  } else if (width >= inputRange.offsetWidth) {
    rangeStub.setAttribute("style", "clip-path:" + pathWidth + "; -webkit-clip-path:" + pathWidth + "; width: 100%");
  }
}

function countValue(tmp) {
  var procent = inputRange.offsetWidth/100;
  var position = tmp - inputRange.getBoundingClientRect().left;
  var max = inputRange.getAttribute('max');
  for (var i = 0; i <= max; i++) {
    if((position/procent) < 12.5) {
      inputRange.value = 0;
    } else if ((position/procent) > 12.5 && (position/procent) <= 37.5) {
      inputRange.value = 1;
    } else if ((position/procent) > 37.5 && (position/procent) <= 75) {
      inputRange.value = 2;
    } else if ((position/procent) > 75 && (position/procent) <= 100) {
      inputRange.value = 4;
    } else if ((position/procent) > 87 && (position/procent) <=100) {
      inputRange.value = 4;
    }
  }
}

function showLines() {
  document.querySelectorAll('.range-descriptions .range-descriptions--active').forEach(i => i.classList.remove(
      'range-descriptions--active'))
    for (var i = 0; i < inputRange.value && i < 3; i++) {
      rangeDescription.children[i + 1].classList.add('range-descriptions--active');
    }
}