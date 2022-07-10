import styles from './FormLogin.module.scss'
import { Link } from 'react-router-dom'
import { memo, useCallback, useState } from 'react'
import { ILoginAccountUserDto } from '../../interfaces'
import { isKeySpace } from '../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { loginAccountUserThunk } from './thunks'
import { store } from '../../redux/store'
import { successSelector, messageSelector } from './selectors'
import { sliceFormLogin } from './slice'
import { ROUTERS } from '../../constants'
import _ from 'lodash'

function FormLogin() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [hidePassword, setHidePassword] = useState(true)
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [password, setPassword] = useState('')

  const success = useSelector(successSelector)
  const message = useSelector(messageSelector)

  const handleLogin = useCallback(() => {
    const loginAccountUserDto: ILoginAccountUserDto = {
      phone_or_email: _.trim(phoneOrEmail),
      password: _.trim(password),
    }
    dispatch(loginAccountUserThunk(loginAccountUserDto))
  }, [dispatch, phoneOrEmail, password])

  window.onkeydown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' && _.trim(phoneOrEmail) && _.trim(password)) {
        handleLogin()
      }
    },
    [handleLogin, phoneOrEmail, password]
  )

  return (
    <div className={styles.FormLogin}>
      <input
        type='text'
        placeholder='Email or phone number'
        value={phoneOrEmail}
        onChange={(e) => {
          if (!isKeySpace(e.target.value)) {
            setPhoneOrEmail(e.target.value)
            dispatch(sliceFormLogin.actions.setMessage(''))
          }
        }}
      />
      <div className={styles.containerInput}>
        <input
          type={hidePassword ? 'password' : 'text'}
          placeholder='Password'
          value={password}
          onChange={(e) => {
            if (!isKeySpace(e.target.value)) {
              setPassword(e.target.value)
              dispatch(sliceFormLogin.actions.setMessage(''))
            }
          }}
        />
        <i
          onClick={() => setHidePassword(!hidePassword)}
          className={hidePassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
        ></i>
      </div>
      <div
        style={{ color: success ? '#28a745' : '#dc3545' }}
        className={styles.announce}
      >
        {message && (
          <i
            className={
              success ? 'fas fa-check-circle' : 'fas fa-exclamation-circle'
            }
          ></i>
        )}
        <span>{message}</span>
      </div>
      <div className={styles.containerBtnSubmit}>
        <button onClick={handleLogin}>Log In</button>
        <Link
          onClick={() => dispatch(sliceFormLogin.actions.setMessage(''))}
          to={ROUTERS.register}
        >
          Don't have an account?
        </Link>
      </div>
    </div>
  )
}

export default memo(FormLogin)
