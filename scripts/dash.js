'use strict';

// redirecting user if not registered
if(localStorage.getItem('firstname') === null) location.href = 'index.html'

// main label
const labelTime = document.getElementById('label-time');
const labelBalance = document.getElementById('balance');
const labelSumIn = document.getElementById('sumin')
const labelSumOut = document.getElementById('sumout')
const usernameLabel = document.getElementById('username');

// relocation buttons
const getLoan = document.getElementById('getloan');
const transfer = document.getElementById('transfer');
const deleteAccount = document.getElementById('delete');
const profile = document.getElementById('profile');

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
// fake movements
// localStorage.setItem('movements', [-100, 3000, 4000, -100, -500, 700]);
// localStorage.setItem('movementTime', [
//     "2019-09-01T14:48:00.000Z",
//     "2020-06-12T10:48:00.000Z",
//     "2022-10-02T12:12:00.000Z",
//     "2022-11-05T18:43:00.000Z",
//     "2023-01-06T22:08:00.000Z",
//     "2023-05-11T19:12:00.000Z",
// ]);

// localStorage.removeItem('movements')


const hasMovs = localStorage.getItem('movements');

// calling all functions
greetUserLabel()
addMovements()
addTotalBalance()
calculateSumOut()
calculateSumIn()

// ******************* Event listeners
getLoan.addEventListener('click', ()=> location.href = 'credit.html')
transfer.addEventListener('click', ()=> location.href = 'transfer.html')
deleteAccount.addEventListener('click', ()=> location.href = 'remove.html')
profile.addEventListener('click', ()=> location.href = 'profile.html')



// ******************* Functions
// function to greet the user
function greetUserLabel(){
    if (hasMovs !== null){
        const time = new Date();
        const period = 'Welcome'; 
        console.log(time.getHours())
        console.log(period)
        const user = localStorage.getItem('firstname')
        usernameLabel.innerText = `${period}, ${user}`
    }
} 

// function to add movement to the movement container
function addMovements(){
    if (hasMovs === null){
        movementContainer.textContent = 0
        movementContainer.innerHTML = `
        <!-- no movement -->
        <div class="no-movements">
            <p class="no-mov-logo">ㄟ( ▔, ▔ )ㄏ</p>
            <p class="no-mov-message">no payments till now </p>
        </div>
        `
    } else {
        const movements = localStorage.getItem('movements')
                        .split(',')
                        .map(e => Number(e))
        
        movements.forEach((mov,ind) =>{
            // getting movement time
            const type = mov > 0 ? 'deposit' : 'withdraw';

            const movDates = localStorage.getItem('movementTime').split(',');
            const movDate = new Date(movDates[ind])
            const y = `${movDate.getFullYear()}`.padStart(2, 0)
            const m = `${movDate.getMonth() + 1}`.padStart(2, 0)
            const d = `${movDate.getDate()}`.padStart(2, 0)
            const date = `${d}/${m}/${y}`;

            const movementString = `
            <!-- a row -->
            <div class="movement-row">
                <div class="labelleft"> 
                    <span class="movement-${type}">${type.toUpperCase()}</span>
                    <span class="movement-time">${date}</span>
                </div>
                <div class="labelright"> 
                    <span class="movement-amount">₹ ${Math.abs(mov)}/-</span>
                </div>
            </div>
            `

            movementContainer.insertAdjacentHTML('afterbegin', movementString)
        })
    }
}


// function to calculate total balance in the account
function addTotalBalance(){
    if (hasMovs !== null){
        const movements = localStorage.getItem('movements')
                        .split(',')
                        .map(e => Number(e))
        
        const balance = Math.trunc(movements.reduce((acc, mov) => acc + mov, 0))

        
        labelBalance.innerHTML = `₹ ${Intl.NumberFormat('en-IN').format(balance > 0 ? balance : 0)} /-`
        
    }
}

// function to add to cash goes out of account (sum-out)
function calculateSumOut(){
    if (hasMovs !== null){
        const sumout = localStorage.getItem('movements')
                        .split(',')
                        .map(e => Number(e))
                        .filter(e => e < 0)
                        .map(e => Math.abs(e))
                        .reduce((a,e) => a+e,0)

        labelSumOut.innerText = `₹ ${Math.trunc(sumout)}/-`
        
    }


}
// function to add to cash goes out of account (sum-out)
function calculateSumIn(){
    if (hasMovs !== null){
        const sumin = localStorage.getItem('movements')
                        .split(',')
                        .map(e => Number(e))
                        .map(e => Math.abs(e))
                        .reduce((a,e) => a+e,0)

        labelSumIn.innerText = `₹ ${Math.trunc(sumin)}/-`
        
    }
}
