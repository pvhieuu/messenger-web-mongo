import { memo } from 'react'
import ContentAuth from '../../components/ContentAuth'
import FooterAuth from '../../components/FooterAuth'
import FormRegister from '../../components/FormRegister'
import HeaderAuth from '../../components/HeaderAuth'
import styles from './Register.module.scss'

function Register() {
  return (
    <div className={styles.Register}>
      <HeaderAuth />
      <ContentAuth>
        <FormRegister />
      </ContentAuth>
      <FooterAuth />
    </div>
  )
}

export default memo(Register)
