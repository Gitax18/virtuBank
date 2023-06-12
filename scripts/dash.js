// main label
const labelTime = document.getElementById('label-time');
const balance = document.getElementById('balance');
const sumin = document.getElementById('sumin')
const sumout = document.getElementById('sumout')

// relocation buttons
const getLoan = document.getElementById('getloan');
const transfer = document.getElementById('transfer');
const deleteAccount = document.getElementById('delete');

// movements 
const movementContainer = document.querySelector('.movement-container');  
// when movements has 0 rows
const noMovementsMessage = document.querySelector('.no-movements');  

// setting real time to time label
const currentTime = new Date();

const year = `${currentTime.getFullYear()}`.padStart(2, 0)
const month = `${currentTime.getMonth() + 1}`.padStart(2, 0)
const day = `${currentTime.getDate()}`.padStart(2, 0)
const hours = `${currentTime.getHours()}`.padStart(2, 0)
const mins = `${currentTime.getMinutes()}`.padStart(2, 0)

const period = currentTime.getHours() >= 13 ? 'p.m' : 'a.m'

labelTime.textContent = `${day}/${month}/${year}, ${hours}:${mins} ${period}`

// setting movements in localstorage 
localStorage.setItem('movements', [100, 4000, -800, -120, 80]);
console.log(localStorage.getItem('movements').split(','))