import React, { useState } from 'react'

function LoginOption(props) {
    const [formVisible, setFormVisible] = useState(true)

    const login = () => {
        setFormVisible(false)
        props.login()

    }

    const signUp = () => {
        setFormVisible(false)
        props.signUp()
    }




  return (
    <div>
    { formVisible ?
     <div className='form-container'>
        <div className='row'>
            <div className='col'>
                <button className='btn btn-success mt-3 d-block w-100 mb-2' onClick={login}>Login</button>
            </div>
        </div>
        <div className='row'>
            <div className='col'>
                <button className='btn btn-success mt-3 d-block w-100 mb-2' onClick={signUp}>Sign Up</button>
            </div>
        </div>
    </div> : null}
    </div>
  )
}

export default LoginOption