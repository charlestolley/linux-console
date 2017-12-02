var body = document.querySelector("body");
var before;
var cursor;
var after;

var shell_history = [];

addParagraph();

function addParagraph() {
  var p = document.createElement("p");
  p.textContent = "chuck@console~$ ";
  body.appendChild(p);

  before = document.createElement("span");
  p.appendChild(before);

  cursor = document.createElement("span");
  cursor.classList.add("empty");
  cursor.isTyping = false;
  cursor.setAttribute("id", "cursor");
  cursor.textContent = "C";
  p.appendChild(cursor);

  after = document.createElement("span");
  p.appendChild(after);
}

setInterval(function() {
  if(cursor.isTyping) {
    cursor.isTyping = false;
  } else {
    cursor.classList.toggle("flash");
  }
}, 600);

body.addEventListener("keypress", function(event) {
  switch(event.which) {
  case 127: // delete button
    if(!cursor.classList.contains("empty")) {
      if(after.textContent) {
        cursor.textContent = after.textContent.slice(0, 1);
        after.textContent = after.textContent.slice(1);
      } else {
        cursor.textContent = "C";
        cursor.classList.add("empty");
      }
    }
    break;
  default:
    before.textContent += String.fromCharCode(event.which);
    break;
  }
});

body.addEventListener("keydown", function(event) {
  cursor.isTyping = true;
  cursor.classList.add("flash");

  switch(event.keyCode) {
  case 8:   // backspace
    before.textContent = before.textContent.slice(0, -1);
    break;
  case 13:  // carriage return
    if(cursor.classList.contains("empty")) {
      cursor.textContent = "";
    }
    var command = before.textContent + cursor.textContent + after.textContent;
    var p = cursor.parentElement;
    if(command && command != shell_history[shell_history.length-1]) {
      shell_history[shell_history.length] = command;
    }
    console.log(shell_history);

    before.remove();
    cursor.remove();
    after.remove();

    p.textContent += command;
    addParagraph();
    break;
  case 37:  // left arrow
    if(before.textContent) {
      if(cursor.classList.contains("empty")) {
        cursor.classList.remove("empty");
      } else {
        after.textContent = cursor.textContent + after.textContent;
      }
      cursor.textContent = before.textContent.slice(-1);
      before.textContent = before.textContent.slice(0, -1);
    }
    break;
  case 39:  // right arrow
    if(!cursor.classList.contains("empty")) {
      before.textContent += cursor.textContent;
      if(after.textContent) {
        cursor.textContent = after.textContent.slice(0, 1);
        after.textContent = after.textContent.slice(1);
      } else {
        cursor.textContent = "C";
        cursor.classList.add("empty");
      }
    }
    break;
  default:
    console.log(event.keyCode);
    break;
  }
});
