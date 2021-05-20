import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebaseconfig';

const Login = () => {

  const historial = useHistory()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [msgerror, setMsgError] = useState(null)


  const RegistrarUsuario = (e) => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, pass)
    // .then( r => alert('Usuario registrado'))
      .then( r => {
        historial.push('/')
      })
      .catch(e => {

        if(e.code == 'auth/invalid-email'){
          setMsgError('Formato Email incorrecto')
        }
        if(e.code == 'auth/weak-password'){
          setMsgError('La password debe tener 6 caracteres o mas')
        }    

      })
    
  }

  const LoginUsuario = () => {
    auth.signInWithEmailAndPassword(email, pass)
    // .then( (r) => console.log(r))
    .then( (r) => {
      // luego de logearse mandamos a las targetas
      historial.push('/admin')
    })
    .catch( (err) => {
      // auth/wrong-password
      if(err.code == 'auth/wrong-password'){
        setMsgError('password incorrecto')
      }
      //para mas errores
    })
  }

  return(
    <div className='row mt-5'>

      <div className='col'></div>
      <div className='col'>

        <form onSubmit={RegistrarUsuario} className='form-group'>

          <div className="input-group mb-3">
            <div className='input-group-prepend'>
              <span className="input-group-text">Correo</span>
            </div>
            <input 
            onChange={(e) => {setEmail(e.target.value)}}
            className='form-control'
            placeholder='Introduce tu correo electronico'
            type="email"/>
          </div>

          <div className="input-group mb-3">
            <div className='input-group-prepend'>
              <span className="input-group-text">Contraseña</span>
            </div>
            <input 
            onChange={(e) => {setPass(e.target.value)}}
            className='form-control'
            placeholder='Introduce una contraseña'
            type="password"/>
          </div>

          <input
            className='btn btn-info btn-block mt-4'
            value='Registrar Usuario'
            type="submit"/>

        </form>

        <button
          onClick= {LoginUsuario} 
          className='btn btn-success btn-block'>
          Iniciar sesion
        </button>

        {
          msgerror != null
          ? (
            <div>
              {msgerror}
            </div>
          )
          : (
            <span></span>
          )
        }

      </div>
      
      <div className='col'></div>
      
      
    </div>
  )

}

export default Login