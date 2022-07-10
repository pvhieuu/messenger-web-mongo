import { memo } from 'react'
import ContentAuth from '../../components/ContentAuth'
import FooterAuth from '../../components/FooterAuth'
import FormLogin from '../../components/FormLogin'
import HeaderAuth from '../../components/HeaderAuth'
import styles from './Login.module.scss'

function Login() {
  return (
    <div className={styles.Login}>
      <HeaderAuth />
      <ContentAuth>
        <FormLogin />
      </ContentAuth>
      <FooterAuth />
    </div>
  )
}

export default memo(Login)
