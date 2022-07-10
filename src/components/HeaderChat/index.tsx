import clsx from 'clsx'
import moment from 'moment'
import { memo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './HeaderChat.module.scss'
import { chatInfoSelector, showChatInfoSelector } from './selectors'
import { sliceHeaderChat } from './slice'

function HeaderChat() {
  const dispatch = useDispatch()
  const [showVideoCall, setShowVideoCall] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const showChatInfo = useSelector(showChatInfoSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const { guest } = chatInfo

  showVideoCall &&
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })

  return (
    <div className={styles.HeaderChat}>
      <div className={styles.left}>
        <div
          className={clsx(
            styles.containerAvatar,
            guest.status_online ? styles.online : ''
          )}
        >
          <img
            src={
              guest.avatar
                ? guest.avatar
                : require('../../assets/img/avatar.png')
            }
            alt='avatar'
          />
        </div>
        <div className={styles.containerName}>
          <p>
            {chatInfo.nickname_guest ? chatInfo.nickname_guest : guest.fullname}
          </p>
          {!guest.status_online && (
            <span>
              {guest.last_logout && moment(guest.last_logout).fromNow()}
            </span>
          )}
        </div>
      </div>
      <div style={{ color: chatInfo.color }} className={styles.right}>
        <i className='fas fa-phone-alt'></i>
        <i onClick={() => setShowVideoCall(true)} className='fas fa-video'>
          {showVideoCall && (
            <div
              onClick={(e) => {
                setShowVideoCall(false)
                window.location.reload()
                e.stopPropagation()
              }}
              className={styles.video}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className={styles.modalVideo}
              >
                <p>Video call</p>
                <video ref={videoRef} autoPlay></video>
                <div className={styles.containerBtnSubmit}>
                  <button
                    onClick={() => {
                      setShowVideoCall(false)
                      window.location.reload()
                    }}
                  >
                    Back
                  </button>
                  <button
                    onClick={() =>
                      alert('Tính năng chưa hoàn thiện, vui lòng thử lại sau')
                    }
                    style={{ backgroundColor: chatInfo.color }}
                  >
                    Call
                  </button>
                </div>
              </div>
            </div>
          )}
        </i>
        <i
          onClick={() =>
            dispatch(sliceHeaderChat.actions.setShowChatInfo(!showChatInfo))
          }
          className='fas fa-ellipsis-h'
        ></i>
      </div>
    </div>
  )
}

export default memo(HeaderChat)
