// --- Çizgileri ve Sayıları Oluşturma ---
const ticksContainer = document.getElementById('ticksContainer');
const numbersContainer = document.getElementById('numbersContainer');

// 60 saniye/dakika çizgisi (Her 5 çizgide bir saat çizgisi kalın olacak)
for (let i = 0; i < 60; i++) {
    const tick = document.createElement('div');
    tick.classList.add('tick');
    if (i % 5 === 0) {
        tick.classList.add('hour-tick'); 
    }
    // Her çizgiyi 6 derece döndür (360 / 60 = 6)
    tick.style.transform = `rotate(${i * 6}deg)`;
    ticksContainer.appendChild(tick);
}

// 1'den 12'ye kadar sayılar
for (let i = 1; i <= 12; i++) {
    const numContainer = document.createElement('div');
    numContainer.classList.add('number-container');
    // Sayı taşıyıcısını 30 derece döndür (360 / 12 = 30)
    numContainer.style.transform = `rotate(${i * 30}deg)`;

    const num = document.createElement('div');
    num.classList.add('number');
    num.textContent = i;
    // Sayının baş aşağı durmaması için tersine döndür
    num.style.transform = `translateX(-50%) rotate(-${i * 30}deg)`;

    numContainer.appendChild(num);
    numbersContainer.appendChild(numContainer);
}

// --- Saat Mekanizması ---
const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');
const digitalTime = document.getElementById('digitalTime');
const digitalDate = document.getElementById('digitalDate');

function updateClock() {
    const now = new Date();
    
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    const secondsDegrees = ((seconds / 60) * 360);
    const minutesDegrees = ((minutes / 60) * 360) + ((seconds/60)*6);
    const hoursDegrees = ((hours / 12) * 360) + ((minutes/60)*30);

    if(seconds === 0) secondHand.style.transition = 'none';
    else secondHand.style.transition = 'transform 0.05s cubic-bezier(0.4, 2.08, 0.55, 0.44)';

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;

    
    const padZero = (num) => num.toString().padStart(2, '0');
    digitalTime.textContent = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    digitalDate.textContent = now.toLocaleDateString('tr-TR', options).toLocaleUpperCase('tr-TR');
}

setInterval(updateClock, 1000);
updateClock();

// --- Sürükleme ve Çevirme Mantığı ---
const scene = document.getElementById('scene');
const clockContainer = document.getElementById('clockContainer');

let isDragging = false;
let startX, startY;
let isFlipped = false;

scene.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
});

window.addEventListener('mouseup', handleDragEnd);
window.addEventListener('mouseleave', handleDragEnd);

function handleDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.clientX;
    const endY = e.clientY;
    const diffX = Math.abs(endX - startX);
    const diffY = Math.abs(endY - startY);

    if (diffX > 30 || diffY > 30) {
        isFlipped = !isFlipped;
        if (isFlipped) {
            clockContainer.classList.add('is-flipped');
        } else {
            clockContainer.classList.remove('is-flipped');
        }
    }
}