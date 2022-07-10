import _ from 'lodash'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { EMOJI } from '../../constants'
import { createDtoSendMessage, isKeySpace } from '../../helpers'
import { TYPE_MESSAGE } from '../../interfaces'
import { store } from '../../redux/store'
import { sendingSelector } from '../ContentChat/selectors'
import { sendMessageThunk } from '../ContentChat/thunks'
import { sliceContentSidebar } from '../ContentSidebar/slice'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './FooterChat.module.scss'
import { contentSelector } from './selectors'
import { sliceFooterChat } from './slice'

function FooterChat() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [showEmojiModal, setShowEmojiModal] = useState(false)
  const [linkImage, setLinkImage] = useState('')
  const [linkVideo, setLinkVideo] = useState('')
  const [linkAudio, setLinkAudio] = useState('')
  const [valueInput, setValueInput] = useState('')

  const inputFileRef = useRef<HTMLInputElement | null>(null)
  const content = useSelector(contentSelector)
  const chatInfo = useSelector(chatInfoSelector)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const sending = useSelector(sendingSelector)

  useEffect(() => {
    if (_.trim(linkImage)) {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(_.trim(linkImage), TYPE_MESSAGE.IMAGE, chatInfo)
        )
      )
      dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
      setLinkImage('')
    }
  }, [linkImage, dispatch, chatInfo])

  useEffect(() => {
    if (_.trim(linkVideo)) {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(_.trim(linkVideo), TYPE_MESSAGE.VIDEO, chatInfo)
        )
      )
      dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
      setLinkVideo('')
    }
  }, [linkVideo, dispatch, chatInfo])

  useEffect(() => {
    if (_.trim(linkAudio)) {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(_.trim(linkAudio), TYPE_MESSAGE.VOICE, chatInfo)
        )
      )
      dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
      setLinkAudio('')
    }
  }, [linkAudio, dispatch, chatInfo])

  const handleSendMessage = useCallback(() => {
    dispatch(
      sendMessageThunk(
        createDtoSendMessage(content, TYPE_MESSAGE.TEXT, chatInfo)
      )
    )
    dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
    dispatch(sliceFooterChat.actions.setContent(''))
    inputRef.current?.focus()
  }, [dispatch, content, chatInfo])

  window.onkeydown = useCallback(
    (e: any) => {
      if (e.key === 'Enter' && _.trim(content)) {
        handleSendMessage()
      }
    },
    [content, handleSendMessage]
  )

  const handleSendMainIcon = useCallback(() => {
    dispatch(
      sendMessageThunk(
        createDtoSendMessage(chatInfo.emoji, TYPE_MESSAGE.ICON, chatInfo)
      )
    )
    dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
    inputRef.current?.focus()
  }, [dispatch, chatInfo])

  window.onclick = useCallback(() => {
    if (showEmojiModal) {
      setShowEmojiModal(false)
    }
  }, [showEmojiModal])

  const handleSendEmoji = useCallback(
    (emoji: string) => {
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(emoji, TYPE_MESSAGE.ICON, chatInfo)
        )
      )
      dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
      setShowEmojiModal(false)
    },
    [dispatch, chatInfo]
  )

  const handleChangeFile = useCallback((e: any) => {
    const file = e.target.files[0]
    if (file) {
      if (_.startsWith(file.type, 'image')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setLinkImage(reader.result?.toString() || '')
        }
        reader.onerror = function () {
          setLinkImage('')
        }
      }
      if (_.startsWith(file.type, 'video')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setLinkVideo(reader.result?.toString() || '')
        }
        reader.onerror = function () {
          setLinkVideo('')
        }
      }
      if (_.startsWith(file.type, 'audio')) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
          setLinkAudio(reader.result?.toString() || '')
        }
        reader.onerror = function () {
          setLinkAudio('')
        }
      }
    } else {
      setLinkImage('')
      setLinkVideo('')
      setLinkAudio('')
    }
  }, [])

  return (
    <div className={styles.FooterChat}>
      {sending && <p>Sending...</p>}
      <i style={{ color: chatInfo.color }} className='fas fa-plus-circle'></i>
      <i
        onClick={() => inputFileRef.current?.click()}
        style={{ color: chatInfo.color }}
        className='far fa-photo-video'
      >
        <input
          onChange={(e) => {
            handleChangeFile(e)
            setValueInput('')
          }}
          ref={inputFileRef}
          type='file'
          value={valueInput}
        />
      </i>
      <i style={{ color: chatInfo.color }} className='fas fa-microphone'></i>
      <div className={styles.containerInput}>
        <input
          ref={inputRef}
          type='text'
          placeholder='Aa'
          value={content}
          onChange={(e) => {
            if (!isKeySpace(e.target.value)) {
              dispatch(sliceFooterChat.actions.setContent(e.target.value))
            }
          }}
        />
        <i
          onClick={(e) => {
            setShowEmojiModal(!showEmojiModal)
            e.stopPropagation()
          }}
          style={{ color: chatInfo.color }}
          className='fas fa-smile'
        ></i>
        {showEmojiModal && (
          <ul onClick={(e) => e.stopPropagation()}>
            {EMOJI.map((emoji) => (
              <li key={emoji} onClick={() => handleSendEmoji(emoji)}>
                {emoji}
              </li>
            ))}
          </ul>
        )}
      </div>
      {_.trim(content) ? (
        <i
          onClick={handleSendMessage}
          style={{ color: chatInfo.color }}
          className='fas fa-paper-plane'
        ></i>
      ) : (
        <i
          onClick={handleSendMainIcon}
          style={{ color: chatInfo.color }}
          className={chatInfo.emoji}
        ></i>
      )}
    </div>
  )
}

export default memo(FooterChat)
