// form elements

const receiver = document.getElementById('receiver');
const acctNo = document.getElementById('rec-act-no');
const ifsc = document.getElementById('ifsc');
const amount = document.getElementById('amount')

// buttons
const sendBtn = document.getElementById('transfer-btn');


// **************** functions

function validate() {
    if(receiver.value == ''
    || acctNo.value == ''
    || ifsc.value == ''
    || amount.value == ''){
        alert('Please fill the form correctly.')
        return false
    }else{
        const movs = localStorage.getItem('movements');
        const movArr = movs.split(',')
        const movSum = movArr.map(e => Number(e)).reduce((a,e)=> a + e, 0);
        console.log(acctNo.value.length)
        if(acctNo.value.length !== 10){
            alert('account number must be of 10 digits')
            return false
        }

        if(Number(amount.value) >= (0.30 * movSum) + 1){
            alert(`amount cannot exceed 30% of total balance i.e ${ 0.30 * movSum }`)
            return false
        }

        if(Number(amount.value) < 0){
            alert('please enter amount correctly')
            return false
        }

        return true
    }
}

// ****************** Events
sendBtn.addEventListener('click', (e)=>{
    e.preventDefault()

    const isValidate = validate();
    if (isValidate){
        // getting movements
        const movs = localStorage.getItem('movements');
        const movArr = movs.split(',').map(e => Number(e))

        // getting movement time
        const movTime = localStorage.getItem('movementTime').split(',');
        const now = new Date().toISOString()
        
        movTime.push(now)
        localStorage.removeItem('movementTime')
        localStorage.setItem('movementTime', movTime)

        movArr.push(-(Number(amount.value)))
        localStorage.removeItem('movements')
        localStorage.setItem('movements', movArr)

        alert('Transaction done!')
        amount.value = receiver.value = ifsc.value = acctNo.value = ''
        location.href = 'dashboard.html'
    }

})