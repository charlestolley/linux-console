var body = document.querySelector("body");
var before;// = document.getElementById("before");
var cursor;// = document.getElementById("cursor");
var after;

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
  //c.textContent = "hello".slice(-1);// String.fromCharCode(event.which);
  before.textContent += String.fromCharCode(event.which);
});

body.addEventListener("keydown", function(event) {
  cursor.isTyping = true;
  cursor.classList.add("flash");

  switch(event.keyCode) {
  case 8:
    before.textContent = before.textContent.slice(0, -1);
    break;
  case 37:
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
  case 39:
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
