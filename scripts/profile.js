// fixed values
const profileOwner = document.getElementById('name-title')
const ifsc = document.getElementById('ifsc-no')
const acctNo = document.getElementById('acct-no')
const creeditNo = document.getElementById('credit-no')

// form elements
const fnameIn = document.getElementById('firstname')
const lnameIn = document.getElementById('lastname')
const emailIn = document.getElementById('email')
const passwordIn = document.getElementById('password')
const mobileIn = document.getElementById('mobile-no')
const addressIn = document.getElementById('address')
const cityIn = document.getElementById('city')
const stateIn = document.getElementById('state')

// form button 
const editSaveBtn = document.getElementById('edit-save');

// adding fixed value to html
profileOwner.textContent = localStorage.getItem('firstname')+' '+localStorage.getItem('lastname')
ifsc.textContent = `VB00192`
acctNo.textContent = localStorage.getItem('account-no')
creeditNo.textContent = localStorage.getItem('creditCardNumber')

// adding values to input
fnameIn.value = localStorage.getItem('firstname')
lnameIn.value = localStorage.getItem('lastname')
emailIn.value = localStorage.getItem('email')
passwordIn.value = localStorage.getItem('password')
mobileIn.value = localStorage.getItem('mobile')
addressIn.value = localStorage.getItem('address')
cityIn.value = localStorage.getItem('city')
stateIn.value = localStorage.getItem('state')

// functions to validate form
function validateForm(){
    if(fnameIn.value == '' ||
    lnameIn.value == '' || 
    emailIn.value == '' || 
    passwordIn.value == '' ||
    mobileIn.value == '' || 
    addressIn.value  == '' ||
    cityIn.value == '' || 
    stateIn.value == '' ){
        alert('fields cannot be left blank')
        return false
    }else{
        if (String(Number(mobileIn.value)) == 'NaN'){
            alert('Mobile Number: Wrong Format')
            return false
        }

        if (emailIn.value.includes('@') == false || emailIn.value.includes('.') == false){
            alert('Email: wrong format')
            return false
        }

        return true
    }
}

// Event listeners 

editSaveBtn.addEventListener('click', function (e){
    e.preventDefault()

    if(editSaveBtn.textContent == 'edit'){
        editSaveBtn.textContent = 'save';
        const inputs = [...document.querySelectorAll('input')]
        inputs.forEach(e=> e.style.pointerEvents = 'all');
        inputs.forEach(e=> e.style.border = '2px solid black');

        editSaveBtn.style.backgroundColor = '#00850d'
    } else{
        const isValidate = validateForm()

        if(isValidate){
            editSaveBtn.textContent = 'edit';
            const inputs = [...document.querySelectorAll('input')]
            inputs.forEach(e=> e.style.pointerEvents = 'none');
            inputs.forEach(e=> e.style.border = '1px solid grey');
            editSaveBtn.style.backgroundColor = '#0067d5'

            localStorage.setItem('firstname',fnameIn.value)
            localStorage.setItem('lastname',lnameIn.value)
            localStorage.setItem('email',emailIn.value)
            localStorage.setItem('password',passwordIn.value)
            localStorage.setItem('mobile',mobileIn.value)
            localStorage.setItem('address',addressIn.value)
            localStorage.setItem('city',cityIn.value)
            localStorage.setItem('state',stateIn.value)

            location.href = 'profile.html'
            // fnameIn.value == '' 
            // lnameIn.value == ''  
            // emailIn.value == ''  
            // passwordIn.value == '' 
            // mobileIn.value == ''  
            // addressIn.value  == '' 
            // cityIn.value == ''  
            // stateIn.value == ''
        }
    }
})