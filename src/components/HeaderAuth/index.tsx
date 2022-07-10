import { memo, useEffect, useState } from 'react'
import styles from './HeaderAuth.module.scss'
import clsx from 'clsx'

function HeaderAuth() {
  const [border, setBorder] = useState(false)

  useEffect(() => {
    const handleScroll = () => setBorder(window.scrollY > 10)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={clsx(styles.HeaderAuth, border ? styles.border : '')}>
      <div className={styles.containerHeader}>
        <img
          onClick={() => window.location.reload()}
          src={require('../../assets/img/logo.png')}
          alt='logo'
        />
        <ul>
          <li>Rooms</li>
          <li>Features</li>
          <li>Desktop app</li>
          <li>Privacy and safety</li>
          <li>For developers</li>
        </ul>
      </div>
    </div>
  )
}

export default memo(HeaderAuth)
