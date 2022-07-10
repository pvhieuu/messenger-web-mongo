import { useDispatch, useSelector } from 'react-redux'
import ChatInfo from '../../components/ChatInfo'
import ContentChat from '../../components/ContentChat'
import ContentSidebar from '../../components/ContentSidebar'
import FooterChat from '../../components/FooterChat'
import FooterSidebar from '../../components/FooterSidebar'
import HeaderChat from '../../components/HeaderChat'
import {
  chatInfoSelector,
  showChatInfoSelector,
} from '../../components/HeaderChat/selectors'
import HeaderSidebar from '../../components/HeaderSidebar'
import styles from './Dashboard.module.scss'
import { io } from 'socket.io-client'
import { url } from '../../api'
import { memo, useEffect } from 'react'
import { store } from '../../redux/store'
import { updateStatusOnlineThunk } from './thunks'
import { BACKGROUND_COLOR } from '../../interfaces'
import { myInfoSelector } from '../../components/HeaderSidebar/selectors'

export const socket = io(url)

function Dashboard() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const showChatInfo = useSelector(showChatInfoSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const myInfo = useSelector(myInfoSelector)

  useEffect(() => {
    dispatch(updateStatusOnlineThunk({ status_online: true }))
    socket.emit('update status online', {
      user_id: myInfo._id,
      data: {
        status_online: true,
      },
    })
  }, [dispatch, myInfo._id])

  return (
    <div
      className={styles.Dashboard}
      style={{
        backgroundColor: chatInfo?.background_color
          ? chatInfo.background_color
          : BACKGROUND_COLOR.white,
      }}
    >
      <div className={styles.sidebar}>
        <HeaderSidebar />
        <ContentSidebar />
        <FooterSidebar />
      </div>
      {chatInfo && (
        <div className={styles.main}>
          <div className={styles.chat}>
            <HeaderChat />
            <ContentChat />
            <FooterChat />
          </div>
          {showChatInfo && <ChatInfo />}
        </div>
      )}
    </div>
  )
}

export default memo(Dashboard)
