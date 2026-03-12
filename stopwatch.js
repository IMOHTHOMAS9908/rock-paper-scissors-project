


let interval;
let startTime = localStorage.getItem("startTime");
let running = localStorage.getItem("running") === "true";

const display = document.getElementById("display");
const alarm = document.getElementById("alarm");

let mode = localStorage.getItem("mode") || "stopwatch";

setMode(mode);


if (running && startTime) {
  startTime = parseInt(startTime);
  interval = setInterval(updateTime, 1000);
}

function setMode(m){
  mode = m;
  localStorage.setItem("mode", mode);

  if(mode === "timer"){
    document.getElementById("timerInputs").style.display = "block";
  } else {
    document.getElementById("timerInputs").style.display = "none";
  }
}

function start(){

  if(!startTime){
    startTime = Date.now();
    localStorage.setItem("startTime", startTime);
  }

  running = true;
  localStorage.setItem("running", true);

  clearInterval(interval);
  interval = setInterval(updateTime, 1000);
}

function stop(){
  clearInterval(interval);
  running = false;
  localStorage.setItem("running", false);
}

function reset(){

  clearInterval(interval);

  startTime = null;
  running = false;

  localStorage.removeItem("startTime");
  localStorage.setItem("running", false);

  display.textContent = "00:00:00";
}

function updateTime(){

  const now = Date.now();
  const elapsed = Math.floor((now - startTime) / 1000);

  let h = Math.floor(elapsed / 3600);
  let m = Math.floor((elapsed % 3600) / 60);
  let s = elapsed % 60;

  display.textContent =
    String(h).padStart(2,"0") + ":" +
    String(m).padStart(2,"0") + ":" +
    String(s).padStart(2,"0");

  if(mode === "timer"){

    let setH = parseInt(document.getElementById("setH").value) || 0;
    let setM = parseInt(document.getElementById("setM").value) || 0;
    let setS = parseInt(document.getElementById("setS").value) || 0;

    let target = setH*3600 + setM*60 + setS;

    if(elapsed >= target && target > 0){
      alarm.play();
      reset();
    }

  }

}