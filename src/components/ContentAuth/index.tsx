import { memo, ReactNode } from 'react'
import { IBtnRedirect, REDIRECTS } from '../../constants'
import styles from './ContentAuth.module.scss'

function ContentAuth({ children }: { children: ReactNode }) {
  return (
    <div className={styles.ContentAuth}>
      <div className={styles.containerAuth}>
        <div className={styles.left}>
          <h1>Hang out anytime, anywhere</h1>
          <p>
            Messenger makes it easy and fun to stay close to your favourite
            people.
          </p>
          {children}
        </div>
        <div className={styles.right}>
          <img
            src={require('../../assets/img/backgroundAuth.png')}
            alt='background'
          />
          <div className={styles.containerBtnDownload}>
            {REDIRECTS.map((redirect: IBtnRedirect) => (
              <a
                key={redirect.href}
                href={redirect.href}
                target='_blank'
                rel='noreferrer'
              >
                <img src={redirect.img} alt='appstore' />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(ContentAuth)
