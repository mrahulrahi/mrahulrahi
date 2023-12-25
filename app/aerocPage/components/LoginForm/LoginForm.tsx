import React from 'react'
import './LoginForm.css'

const LoginForm = () => {
  return (
    <div className='login-page'>
        <section>
        <form>
            <h1>Login</h1>
            <div className="login-inputbox">
                {/* <ion-icon name="mail-outline"></ion-icon> */}
                <input type="email" required />
                <label htmlFor="">Email</label>
            </div>
            <div className="login-inputbox">
                {/* <ion-icon name="lock-closed-outline"></ion-icon> */}
                <input type="password" required />
                <label htmlFor="">Password</label>
            </div>
            <div className="login-forget">
                <label htmlFor=""><input type="checkbox" />Remember Me</label>
              <a href="#">Forget Password</a>
            </div>
            <button>Log in</button>
            <div className="login-register">
                <p>Don't have a account <a href="#">Register</a></p>
            </div>
        </form>
    </section>
    </div>
  
  )
}

export default LoginForm
