import { memo } from 'react'
import styles from './FooterSidebar.module.scss'

function FooterSidebar() {
  return (
    <div className={styles.FooterSidebar}>
      <button>
        <i className='fas fa-download'></i>
        <span>Install app Messenger</span>
      </button>
    </div>
  )
}

export default memo(FooterSidebar)
