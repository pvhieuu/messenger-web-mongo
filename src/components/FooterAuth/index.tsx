import { memo } from 'react'
import styles from './FooterAuth.module.scss'

function FooterAuth() {
  return (
    <ul className={styles.FooterAuth}>
      <li>
        <strong>© Meta 2022.</strong> The Apple and Google Play logos are
        trademarks of their respective owners.
      </li>
      <li>Data Policy</li>
      <li>Terms</li>
      <li>
        English (US) <i className='fas fa-caret-down'></i>
      </li>
      <li>
        <img src={require('../../assets/img/fromFB.png')} alt='from facebook' />
      </li>
    </ul>
  )
}

export default memo(FooterAuth)
