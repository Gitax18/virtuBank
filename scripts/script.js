// getting container form html
const container = document.querySelector('.app-container');



// login form html
const loginForm = `
            <section class="login-form-container">
            <form class="login-form grid grid-col-1 gap-sm">
                <h2 class="greet-heading-login">Welcome</h2> 
                <hr class="login-divider">
                <input type="email" name="email" id="email-login" placeholder="Email" required>
                <input type="password" name="password" id="password-login" placeholder="Password" required>

                <button type="submit" id="btn-login" class="b">Login</button>
                <div class='login-links'>
                    <span><a href="#" id="register-link">Create a account?</a></span>
                    <span><a href="#" id="forgot-password-link">Forgot password?</a></span>
                </div>
            </form>
            </section>
`

// register form html 
const registerForm = `
            <section class="register-form-container">
                <h2 class="greet-heading-register">Create Your Account</h2>
                <hr class="register-divider">
                <form class="register-form grid grid-col-2 gap-sm">
                    <input type="text" name="firstname" id="firstname"  required placeholder="First Name">
                    <input type="text" name="lastname" id="lastname" required  placeholder="Last Name">
                    <input type="email" name="email" id="email" required  placeholder="Email">
                    <input type="tel" name="mobile" id="mobile"  required placeholder="Mobile no.">
                    <input type="text" name="password" id="password"  required placeholder="Password"></input>
                    <input type="text" name="address" id="address" required  placeholder="Address">
                    <input type="text" name="city" id="city"  required placeholder="City">
                    <input type="text" name="state" id="state"  required placeholder="State">
                    <div class="credit-card-option">
                        <label>Do you want Credit Card:</label>
                        <input type="radio" name="radio-credit" id="card-true" value=true checked>
                        <label for="card-true">yes</label>
                        <input type="radio" name="radio-credit" id="card-false" value=false>
                        <label for="card-false">no</label>
                    </div>
                    <button type="submit" id="btn-register">Register</button> <br>
                </form>
            </section>
`
const user = {}


// ************************* FUNCTIONS
function registerUser(  ){
    // e.preventDefault()
    localStorage.clear()

    let formFilled = false

    const firstname = document.getElementById('firstname') 
    const lastname = document.getElementById('lastname') 
    const email = document.getElementById('email') 
    const mobile = document.getElementById('mobile') 
    const address = document.getElementById('address') 
    const city = document.getElementById('city') 
    const state = document.getElementById('state') 
    const password = document.getElementById('password') 
    const wantcard = document.getElementById('card-true')

// checking that all the form input are full if they are not then data does not store
    if (firstname.value !== '' &&
        lastname.value !== '' &&
        email.value !== '' && 
        mobile.value !== '' &&
        address.value !== '' &&
        city.value !== '' &&
        state.value !== '' &&
        password.value !== ''){

            localStorage.setItem('firstname', firstname.value)
            localStorage.setItem('lastname', lastname.value)
            localStorage.setItem('email', email.value)
            localStorage.setItem('mobile', mobile.value)
            localStorage.setItem('address', address.value)
            localStorage.setItem('city', city.value)
            localStorage.setItem('state', state.value)
            localStorage.setItem('password', password.value)

            if (wantcard.checked) localStorage.setItem('credit', true)
            else localStorage.setItem('credit', false)

            formFilled = true

            alert(`Dear ${firstname.value}, Your account has been registered, login to continue`)
            container.innerHTML = loginForm

        } else alert('fill the form completely')
        
        // if (formFilled) window.location.reload()
}



function loginUser(e){
    e.preventDefault()
    const loginEmail = document.getElementById('email-login')
    const loginPassword = document.getElementById('password-login')
    
    if (loginEmail.value === localStorage.getItem('email')
    && loginPassword.value === localStorage.getItem('password')){
        loginEmail.value = loginPassword.value = ''
        alert('login success')

    } else alert('Wrong credentials')

    
}

// localStorage.clear()
if (localStorage.getItem('email') === null){
    container.innerHTML = registerForm
    const greet = document.getElementById('greet--heading')
    greet.textContent = "Register to continue"
    document.getElementById('btn-register').addEventListener('click', registerUser)
} else{
    container.innerHTML = loginForm
    const crtActBtn = document.getElementById('register-link')

    function register() {
        localStorage.clear()
        location.reload()
    }

    crtActBtn.addEventListener('click', register)
    const greet = document.getElementById('greet--heading')
    greet.textContent = "Login to continue"
    document.getElementById('btn-login').addEventListener('click', loginUser)
    
}