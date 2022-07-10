import styles from './FormRegister.module.scss'
import { Link } from 'react-router-dom'
import { memo, useCallback, useState } from 'react'
import { ICreateUserDto } from '../../interfaces'
import { isKeySpace } from '../../helpers'
import { useDispatch, useSelector } from 'react-redux'
import { registerNewUserThunk } from './thunks'
import { store } from '../../redux/store'
import { messageSelector, successSelector } from './selectors'
import { sliceFormRegister } from './slice'
import { ROUTERS } from '../../constants'
import _ from 'lodash'

function FormRegister() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [hidePassword, setHidePassword] = useState(true)
  const [hideRepassword, setHideRepassword] = useState(true)
  const [phoneOrEmail, setPhoneOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repassword, setRepassword] = useState('')
  const [fullname, setFullname] = useState('')

  const success = useSelector(successSelector)
  const message = useSelector(messageSelector)

  const handleRegister = useCallback(() => {
    const createUserDto: ICreateUserDto = {
      phone_or_email: _.trim(phoneOrEmail),
      password: _.trim(password),
      repassword: _.trim(repassword),
      fullname: _.trim(fullname),
    }
    dispatch(registerNewUserThunk(createUserDto))
  }, [dispatch, fullname, password, phoneOrEmail, repassword])

  window.onkeydown = useCallback(
    (e: any) => {
      if (
        e.key === 'Enter' &&
        _.trim(phoneOrEmail) &&
        _.trim(password) &&
        _.trim(repassword) &&
        _.trim(fullname)
      ) {
        handleRegister()
      }
    },
    [handleRegister, phoneOrEmail, password, repassword, fullname]
  )

  return (
    <div className={styles.FormRegister}>
      <input
        type='text'
        placeholder='Email or phone number'
        value={phoneOrEmail}
        onChange={(e) => {
          if (!isKeySpace(e.target.value)) {
            setPhoneOrEmail(e.target.value)
            dispatch(sliceFormRegister.actions.setMessage(''))
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
              dispatch(sliceFormRegister.actions.setMessage(''))
            }
          }}
        />
        <i
          onClick={() => setHidePassword(!hidePassword)}
          className={hidePassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
        ></i>
      </div>
      <div className={styles.containerInput}>
        <input
          type={hideRepassword ? 'password' : 'text'}
          placeholder='Re-password'
          value={repassword}
          onChange={(e) => {
            if (!isKeySpace(e.target.value)) {
              setRepassword(e.target.value)
              dispatch(sliceFormRegister.actions.setMessage(''))
            }
          }}
        />
        <i
          onClick={() => setHideRepassword(!hideRepassword)}
          className={hideRepassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
        ></i>
      </div>
      <input
        type='text'
        placeholder='Fullname'
        value={fullname}
        onChange={(e) => {
          if (!isKeySpace(e.target.value)) {
            setFullname(e.target.value)
            dispatch(sliceFormRegister.actions.setMessage(''))
          }
        }}
      />
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
        <button onClick={handleRegister}>Register</button>
        <Link
          onClick={() => dispatch(sliceFormRegister.actions.setMessage(''))}
          to={ROUTERS.login}
        >
          Already have an account?
        </Link>
      </div>
    </div>
  )
}

export default memo(FormRegister)
