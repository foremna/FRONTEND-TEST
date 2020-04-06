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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBoYW1idXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmhhbWJ1cmdlci1tZW51XCIpO1xudmFyIG1haW5OYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tbmF2XCIpO1xuXG5oYW1idXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIG1haW5OYXYuY2xhc3NMaXN0LnRvZ2dsZShcIm1haW4tbmF2LS1jbG9zZWRcIik7XG4gICAgbWFpbk5hdi5jbGFzc0xpc3QudG9nZ2xlKFwibWFpbi1uYXYtLW9wZW5cIik7XG59KVxuXG52YXIgc2VsZWN0ZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlbGVjdGVkXCIpO1xudmFyIG9wdGlvbnNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm9wdGlvbnMtY29udGFpbmVyXCIpO1xuXG52YXIgb3B0aW9uc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm9wdGlvblwiKTtcblxuc2VsZWN0ZWQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgb3B0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xufSk7XG5cbm9wdGlvbnNMaXN0LmZvckVhY2gobyA9PiB7XG4gIG8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBzZWxlY3RlZC5pbm5lckhUTUwgPSBvLnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFwiKS5pbm5lckhUTUw7XG4gICAgb3B0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICB9KTtcbn0pO1xuXG52YXIgaW5wdXRSYW5nZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5nZScpO1xudmFyIHJhbmdlQ3Vyc29yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhbmdlLWN1cnNvcicpO1xudmFyIHJhbmdlU3R1YiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5nZS1zdHViJyk7XG52YXIgcmFuZ2VEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5nZS1kZXNjcmlwdGlvbicpO1xuIFxuaW5wdXRSYW5nZS5vbmlucHV0ID0gdHlwZVJhbmdlO1xud2luZG93Lm9ubG9hZCA9IHR5cGVSYW5nZTtcblxuZnVuY3Rpb24gdHlwZVJhbmdlKCkge1xuIHJhbmdlU3R1Yi5zdHlsZS53aWR0aCA9ICgxMDAgLSBpbnB1dFJhbmdlLnZhbHVlICogMjUpICsgJyUnO1xuICAgIHJhbmdlU3R1Yi5zdHlsZS5jbGlwUGF0aCA9IFwicG9seWdvbigwIFwiICsgKDExIC0gMyAqIGlucHV0UmFuZ2UudmFsdWUpICsgXCJweFwiICsgXCIsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDEwMCUpXCI7XG4gICAgcmFuZ2VDdXJzb3Iuc3R5bGUubGVmdCA9IGlucHV0UmFuZ2UudmFsdWUgKiAyNSArICclJztcbn1cblxucmFuZ2VDdXJzb3Iub25tb3VzZWRvd24gPSBmdW5jdGlvbihlKSB7IFxuICBtb3ZlQXQoZSk7XG4gIHJhbmdlQ3Vyc29yLmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlLWN1cnNvci0tZnJlZScpO1xuICByYW5nZVN0dWIuY2xhc3NMaXN0LnJlbW92ZSgncmFuZ2Utc3R1Yi0tZnJlZScpO1xuICBmdW5jdGlvbiBtb3ZlQXQoZSkge1xuICAgIGlmKGUucGFnZVggPD0gaW5wdXRSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSB7XG4gICAgcmFuZ2VDdXJzb3Iuc3R5bGUubGVmdCA9ICcwJ1xuICB9IGVsc2UgaWYgKGUucGFnZVggPj0gaW5wdXRSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgaW5wdXRSYW5nZS5vZmZzZXRXaWR0aCkge1xuICAgIHJhbmdlQ3Vyc29yLnN0eWxlLmxlZnQgPSAnMTAwJSdcbiAgfSBlbHNlIHtcbiAgICByYW5nZUN1cnNvci5zdHlsZS5sZWZ0ID0gZS5wYWdlWCAtIGlucHV0UmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArICdweCc7XG4gIH1cbiAgICB9XG5cbiAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBmdW5jdGlvbihlKSB7XG4gICAgbW92ZUF0KGUpO1xuICAgIHBhaW50R3JhZGllbnQoZS5wYWdlWCk7XG4gICAgc2hvd0xpbmVzKCk7XG4gICAgY291bnRWYWx1ZShlLnBhZ2VYKTtcbiAgfVxuXG4gIHJhbmdlQ3Vyc29yLm9ubW91c2V1cCA9IGZ1bmN0aW9uKGUpIHtcbiAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XG4gICAgcmFuZ2VDdXJzb3Iub25tb3VzZXVwID0gbnVsbDtcbiAgICB0eXBlUmFuZ2UoKTtcbiAgICByYW5nZUN1cnNvci5jbGFzc0xpc3QuYWRkKCdyYW5nZS1jdXJzb3ItLWZyZWUnKTtcbiAgICByYW5nZVN0dWIuY2xhc3NMaXN0LmFkZCgncmFuZ2Utc3R1Yi0tZnJlZScpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhaW50R3JhZGllbnQodG1wKSB7XG4gIHZhciB3aWR0aCA9IGlucHV0UmFuZ2Uub2Zmc2V0V2lkdGggLSB0bXAgKyBpbnB1dFJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gIHZhciBwYXRoV2lkdGggPSBcInBvbHlnb24oMCBcIiArICgxMSAtICgodG1wIC0gaW5wdXRSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSkvKGlucHV0UmFuZ2Uub2Zmc2V0V2lkdGggLyAxMikpICsgXCJweFwiICsgXCIsIDEwMCUgMCwgMTAwJSAxMDAlLCAwIDEwMCUpXCI7XG4gIGNvbnNvbGUubG9nKCgodG1wIC0gaW5wdXRSYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSkvKGlucHV0UmFuZ2Uub2Zmc2V0V2lkdGggLyAxMikpXG4gIGlmKHdpZHRoIDw9IGlucHV0UmFuZ2Uub2Zmc2V0V2lkdGgpIHtcbiAgICByYW5nZVN0dWIuc3R5bGUud2lkdGggPSAgd2lkdGggKyAgJ3B4JztcbiAgICByYW5nZVN0dWIuc2V0QXR0cmlidXRlKFwic3R5bGVcIiwgXCJjbGlwLXBhdGg6XCIgKyBwYXRoV2lkdGggKyBcIjsgLXdlYmtpdC1jbGlwLXBhdGg6XCIgKyBwYXRoV2lkdGggKyBcIjsgd2lkdGg6IFwiICsgd2lkdGggKyAncHgnKTtcbiAgfSBlbHNlIGlmICh3aWR0aCA+PSBpbnB1dFJhbmdlLm9mZnNldFdpZHRoKSB7XG4gICAgcmFuZ2VTdHViLnNldEF0dHJpYnV0ZShcInN0eWxlXCIsIFwiY2xpcC1wYXRoOlwiICsgcGF0aFdpZHRoICsgXCI7IC13ZWJraXQtY2xpcC1wYXRoOlwiICsgcGF0aFdpZHRoICsgXCI7IHdpZHRoOiAxMDAlXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvdW50VmFsdWUodG1wKSB7XG4gIHZhciBwcm9jZW50ID0gaW5wdXRSYW5nZS5vZmZzZXRXaWR0aC8xMDA7XG4gIHZhciBwb3NpdGlvbiA9IHRtcCAtIGlucHV0UmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgdmFyIG1heCA9IGlucHV0UmFuZ2UuZ2V0QXR0cmlidXRlKCdtYXgnKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbWF4OyBpKyspIHtcbiAgICBpZigocG9zaXRpb24vcHJvY2VudCkgPCAxMi41KSB7XG4gICAgICBpbnB1dFJhbmdlLnZhbHVlID0gMDtcbiAgICB9IGVsc2UgaWYgKChwb3NpdGlvbi9wcm9jZW50KSA+IDEyLjUgJiYgKHBvc2l0aW9uL3Byb2NlbnQpIDw9IDM3LjUpIHtcbiAgICAgIGlucHV0UmFuZ2UudmFsdWUgPSAxO1xuICAgIH0gZWxzZSBpZiAoKHBvc2l0aW9uL3Byb2NlbnQpID4gMzcuNSAmJiAocG9zaXRpb24vcHJvY2VudCkgPD0gNzUpIHtcbiAgICAgIGlucHV0UmFuZ2UudmFsdWUgPSAyO1xuICAgIH0gZWxzZSBpZiAoKHBvc2l0aW9uL3Byb2NlbnQpID4gNzUgJiYgKHBvc2l0aW9uL3Byb2NlbnQpIDw9IDEwMCkge1xuICAgICAgaW5wdXRSYW5nZS52YWx1ZSA9IDQ7XG4gICAgfSBlbHNlIGlmICgocG9zaXRpb24vcHJvY2VudCkgPiA4NyAmJiAocG9zaXRpb24vcHJvY2VudCkgPD0xMDApIHtcbiAgICAgIGlucHV0UmFuZ2UudmFsdWUgPSA0O1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBzaG93TGluZXMoKSB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5yYW5nZS1kZXNjcmlwdGlvbnMgLnJhbmdlLWRlc2NyaXB0aW9ucy0tYWN0aXZlJykuZm9yRWFjaChpID0+IGkuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICdyYW5nZS1kZXNjcmlwdGlvbnMtLWFjdGl2ZScpKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5wdXRSYW5nZS52YWx1ZSAmJiBpIDwgMzsgaSsrKSB7XG4gICAgICByYW5nZURlc2NyaXB0aW9uLmNoaWxkcmVuW2kgKyAxXS5jbGFzc0xpc3QuYWRkKCdyYW5nZS1kZXNjcmlwdGlvbnMtLWFjdGl2ZScpO1xuICAgIH1cbn0iXSwiZmlsZSI6Im1haW4uanMifQ==
