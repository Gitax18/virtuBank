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
const getLoanBtn = document.querySelector('#loanBtn');

// checking if user own credit card
const hasApplyForCredit = localStorage.getItem('credit');

// Event Listeners
noScrBtn1.addEventListener('click', ()=>{
    noCreScr1.style.display = 'none'
    noCreScr2.style.display = 'flex' 
})

noScrBtn2.addEventListener('click', ()=>{
    createCreditCard()
    noCreditCardScreen.style.display = 'none'

})

getLoanBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const isFormFilled = validateForm()
    console.log(isFormFilled)

    if(isFormFilled === true){

        if (localStorage.getItem('movements') != null){

        const movements = localStorage.getItem('movements').split(',');
        const movementDates = localStorage.getItem('movementTime').split(',')

        console.log(movements)
        movements.push(loanAmount.value)
        movementDates.push(new Date().toISOString())
        localStorage.removeItem('movements')
        localStorage.removeItem('movementTime')
        localStorage.setItem('movements', movements)
        localStorage.setItem('movementTime', movementDates)
    } else{
        localStorage.setItem('movements', [loanAmount.value])
        localStorage.setItem('movementTime', [new Date().toISOString()])
        }


         loanTaker.value = accountNo.value = creditCardNo.value = loanAmount.value = ''

        alert('loan approved')
        

    } else{
        alert('fill the form correctly, check your details')
    }
})


// functions 
function validateForm(){
    const LoanTakerName = loanTaker.value 
    const AccountNo = accountNo.value 
    const CreditCard = creditCardNo.value 
    const Loan = loanAmount.value 

    console.log(LoanTakerName)
    console.log(AccountNo)
    console.log(CreditCard)
    console.log(Loan)


    if(LoanTakerName.toLowerCase() === localStorage.getItem('firstname').toLowerCase()+' '+localStorage.getItem('lastname').toLowerCase()
    && CreditCard === localStorage.getItem('creditCardNumber').split(' ').join('')
    && AccountNo === localStorage.getItem('account-no')
    && Loan <= 15000){
       
        console.log(LoanTakerName.toLowerCase() == localStorage.getItem('firstname').toLowerCase()+' '+localStorage.getItem('lastname').toLowerCase())
        console.log(CreditCard == localStorage.getItem('creditCardNumber').split(' ').join(''))

        return true
    } else return false 


}


function createCreditCard(){
    const cardNum1  = Math.trunc((Math.random()*4999) + 1000)
    const cardNum2  = Math.trunc((Math.random()*4999) + 1000)
    const cardNum3  = Math.trunc((Math.random()*4999) + 1000)
    const cardNum4  = Math.trunc((Math.random()*4999) + 1000)

    const creditCardNumber = `${String(cardNum1)} ${String(cardNum2)} ${String(cardNum3)} ${String(cardNum4)} `
    const expYear = new Date().getFullYear().toString().substring(2)
    const expMonth = `${new Date().getMonth() + 1}`.padStart(2,0)

    const expDate = `${expMonth}/${Number(expYear) + 5}`

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

    cardholder.innerHTML = localStorage.getItem('firstname') +' '+ localStorage.getItem('lastname')


    localStorage.setItem('credit', 'true')
}

function updateCreditCard() {
    const creditCardNum = localStorage.getItem('creditCardNumber').split(' ')
    
    numSection1.innerHTML = creditCardNum[0]
    numSection2.innerHTML = creditCardNum[1]
    numSection3.innerHTML = creditCardNum[2]
    numSection4.innerHTML = creditCardNum[3]

    
    expiryDate.innerHTML = localStorage.getItem('creditCardExp')

    cardCVC.innerHTML = localStorage.getItem('creditCardCVC')

    cardholder.innerHTML = localStorage.getItem('firstname') +' '+ localStorage.getItem('lastname')
}



// checking if user does not own credit card then show him screen to request for credit card
if (hasApplyForCredit == 'false'){
    console.log(noCreditCardScreen)
    noCreditCardScreen.style.display = 'block'  
    noCreScr1.style.display = 'flex'
    noCreScr2.style.display = 'none'
} else{
    updateCreditCard()
}
