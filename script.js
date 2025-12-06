const btn = document.querySelector('.setter');
const sec = document.querySelector('input');
const timer = document.querySelector('.timer');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let sound = null;
let val;
if (Notification.permission != "granted") {
    Notification.requestPermission();
}

fetch("beep.wav")          
  .then(res => res.arrayBuffer())
  .then(data => audioContext.decodeAudioData(data))
  .then(decoded => sound = decoded);

function showNotification() {
    if (Notification.permission == 'granted') {
        const noti = new Notification("COUNTDOWN TIMER", {
            body: "Time is UP!!!!"
        })
    }
}

function playSound() {
    if (!sound) return;              
    const source = audioContext.createBufferSource();
    source.buffer = sound;
    source.connect(audioContext.destination);
    source.start();
}

btn.addEventListener('click', function() {
    val = sec.value;
    sec.value = "";
    if (!val || val < 0) {
        alert("Enter valid time");
    }
    if (val > 0) {
        const countdown = setInterval(function(){
            timer.innerHTML = `${val}`;
            val--;
            if (val < 0) {
                timer.innerHTML = `0`;
                clearInterval(countdown);
                showNotification();
                if (audioContext.state === "suspended") audioContext.resume();
                    playSound();
            }
        },1000);
    }
})


