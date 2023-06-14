'use strict';

// Elements to show user does'nt own credit card
const noCreditCardScreen = document.querySelector('.no-credit-card');
const noCreScr1 = document.querySelector('.screen-1');
const noCreScr2 = document.querySelector('.screen-2');

const noScrBtn1 = document.getElementById('get-btn')
const noScrBtn2 = document.getElementById('continue-btn')

//  credit card elements
// card numbers
const numSection1 = document.querySelector('.num-1');
const numSection2 = document.querySelector('.num-2');
const numSection3 = document.querySelector('.num-3');
const numSection4 = document.querySelector('.num-4');
// cardholder name
const cardholder = document.querySelector('.cardholder');
// card expiry date
const expiryDate = document.querySelector('.exp-date');

const cardCVC = document.querySelector('.cvc')

// credit form elements
const loanTaker = document.querySelector('#name');
const accountNo = document.querySelector('#account-no');
const creditCardNo = document.querySelector('#card-no');
const loanAmount = document.querySelector('#amount');

// checking if user own credit card
const hasApplyForCredit = localStorage.getItem('credit');

// Event Listeners
noScrBtn1.addEventListener('click', ()=>{
    noCreScr1.style.display = 'none'
    noCreScr2.style.display = 'flex' 
})

noScrBtn2.addEventListener('click', ()=>{
    noCreditCardScreen.style.display = 'none'
    createCreditCard()

})


// functions 
function createCreditCard(){
    const cardNum1  = Math.trunc((Math.random()*4999) + 1000)
    const cardNum2  = Math.trunc((Math.random()*4999) + 1000)
    const cardNum3  = Math.trunc((Math.random()*4999) + 1000)
    const cardNum4  = Math.trunc((Math.random()*4999) + 1000)

    const creditCardNumber = `${String(cardNum1)} ${String(cardNum2)} ${String(cardNum3)} ${String(cardNum4)} `
    const expYear = new Date().getFullYear().toString().substring(-2)
    const expMonth = `${new Date().getMonth()}`.padStart(2,0)

    const expDate = `${expMonth}/${expYear}`

    const cvc = Math.trunc(Math.random()*888) + 100

    localStorage.setItem('creditCardNumber', creditCardNumber)
    localStorage.setItem('creditCardExp', expDate) 
    localStorage.setItem('creditCardCVC', cvc)

    numSection1.innerHTML = cardNum1
    numSection2.innerHTML = cardNum2
    numSection3.innerHTML = cardNum3
    numSection4.innerHTML = cardNum4

    expiryDate.innerHTML = expDate

    cardCVC.innerHTML = cvc

    cardholder.innerHTML = localStorage.getItem('firstname') + localStorage.getItem('lastname')

    localStorage.setItem('credit', 'true')
}

function updateCreditCard() {
    const creditCardNum = localStorage.getItem('creditCardNumber').split()
    
}

// checking if user does not own credit card then show him screen to request for credit card
if (hasApplyForCredit == 'false'){
    console.log(noCreditCardScreen)
    noCreditCardScreen.style.display = 'block'  
    noCreScr1.style.display = 'flex'
    noCreScr2.style.display = 'none'
} else{
    numSection1.innerHTML = cardNum1
    numSection2.innerHTML = cardNum2
    numSection3.innerHTML = cardNum3
    numSection4.innerHTML = cardNum4

    expiryDate.innerHTML = expDate

    cardCVC.innerHTML = cvc

    cardholder.innerHTML = localStorage.getItem('firstname') + localStorage.getItem('lastname')

}
