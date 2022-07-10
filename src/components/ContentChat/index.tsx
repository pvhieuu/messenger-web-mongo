import clsx from 'clsx'
import _ from 'lodash'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MESSAGE_EMOJIS } from '../../constants'
import { IMessage, IUpdateMsgEmojiDto, TYPE_MESSAGE } from '../../interfaces'
import { socket } from '../../pages/Dashboard'
import { store } from '../../redux/store'
import { contentSelector } from '../FooterChat/selectors'
import { chatInfoSelector } from '../HeaderChat/selectors'
import styles from './ContentChat.module.scss'
import { listMessagesSelector, pageSelector } from './selectors'
import { sliceContentChat } from './slice'
import { getListMessagesThunk, updateEmojiThunk } from './thunks'

function ContentChat() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [typing, setTyping] = useState(false)
  const [scrollMany, setScrollMany] = useState(true)
  const [showEmoji, setShowEmoji] = useState('')

  const chatInfo = useSelector(chatInfoSelector)
  const listMessages = useSelector(listMessagesSelector)
  const content = useSelector(contentSelector)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const page = useSelector(pageSelector)

  useEffect(() => {
    socket.on(`listen vote emoji message of chat: ${chatInfo._id}`, (data) => {
      dispatch(
        sliceContentChat.actions.updateEmojiMessage({
          message_id: data.message_id,
          emoji: data.emoji,
        })
      )
    })

    return () => {
      socket.removeListener(`listen vote emoji message of chat: ${chatInfo._id}`)
    }
  }, [dispatch, chatInfo._id])

  useEffect(() => {
    if (_.trim(chatInfo._id) && page > 0) {
      dispatch(getListMessagesThunk({ chat_id: _.trim(chatInfo._id), page }))
    }
  }, [chatInfo._id, dispatch, page])

  useEffect(() => {
    socket.on(`listen message of chat: ${chatInfo._id}`, (data) => {
      dispatch(sliceContentChat.actions.listenMessage(data))
    })

    return () => {
      socket.removeListener(`listen message of chat: ${chatInfo._id}`)
    }
  }, [dispatch, chatInfo._id])

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const handleScroll = useCallback(
    (e: any) => {
      const ulElement = e.target
      if (ulElement.scrollTop === 0) {
        dispatch(sliceContentChat.actions.setPage(page + 1))
        ulElement.scrollTop = 10
      }
      setScrollMany(
        ulElement.scrollHeight - ulElement.scrollTop - ulElement.offsetHeight >
          50
      )
    },
    [dispatch, page]
  )

  useEffect(() => {
    setScrollMany(false)
  }, [chatInfo])

  useEffect(() => {
    if (!scrollMany) {
      scrollToBottom()
    }
  }, [listMessages, typing, scrollMany, scrollToBottom])

  useEffect(() => {
    socket.emit(
      'typing',
      _.trim(content)
        ? { chat_id: chatInfo.guest_chat_id, value: true }
        : { chat_id: chatInfo.guest_chat_id, value: false }
    )
  }, [content, chatInfo])

  useEffect(() => {
    socket.on(`listen typing of chat: ${chatInfo._id}`, (data) => {
      setTyping(data)
    })

    return () => {
      socket.removeListener(`listen typing of chat: ${chatInfo._id}`)
    }
  }, [chatInfo])

  const handleSetShowEmoji = useCallback(
    (id: string) => {
      setShowEmoji(showEmoji === id ? '' : id)
    },
    [showEmoji]
  )

  const sendEmojiMessage = useCallback(
    (
      emoji: string,
      message_id: string,
      guest_message_id: string | null,
      old_emoji: string | null
    ) => {
      const currentEmoji = emoji === old_emoji ? null : emoji
      const updateMsgEmojiDto: IUpdateMsgEmojiDto = {
        emoji: currentEmoji,
        message_id,
        guest_message_id,
        chat_id: chatInfo._id,
        guest_chat_id: chatInfo.guest_chat_id,
      }
      dispatch(updateEmojiThunk(updateMsgEmojiDto))
      socket.emit('vote emoji message', {
        chat_id: chatInfo.guest_chat_id,
        message_id: guest_message_id,
        emoji: currentEmoji,
      })
    },
    [chatInfo._id, dispatch, chatInfo.guest_chat_id]
  )

  return (
    <ul onScroll={handleScroll} className={styles.ContentChat}>
      {listMessages.map((message: IMessage) => {
        const classMe = message.sender_id === chatInfo.host._id
        const classIcon = message.type === TYPE_MESSAGE.ICON
        const classConfig = message.type === TYPE_MESSAGE.CONFIG
        return (
          <li
            key={message._id}
            className={clsx(
              classMe ? styles.me : '',
              classIcon ? styles.icon : '',
              classConfig ? styles.config : ''
            )}
          >
            {message.emoji && (
              <p style={classMe ? { right: -5 } : { left: -5 }}>
                {message.emoji}
              </p>
            )}
            {(message.type === TYPE_MESSAGE.TEXT ||
              message.type === TYPE_MESSAGE.ICON ||
              message.type === TYPE_MESSAGE.CONFIG) && (
              <span
                style={{
                  backgroundColor: classMe && !classIcon && chatInfo.color,
                  color: classIcon && chatInfo.color,
                }}
              >
                {classIcon && _.startsWith(message.content, 'fa') ? (
                  <i className={message.content}></i>
                ) : (
                  message.content
                )}
              </span>
            )}
            {message.type === TYPE_MESSAGE.IMAGE && (
              <img src={message.content} loading='lazy' alt='link img' />
            )}
            {message.type === TYPE_MESSAGE.VIDEO && (
              <video preload='none' controls src={message.content}></video>
            )}
            {message.type === TYPE_MESSAGE.VOICE && (
              <audio preload='none' controls>
                <source src={message.content} />
              </audio>
            )}
            {message.type !== TYPE_MESSAGE.ICON &&
              message.type !== TYPE_MESSAGE.CONFIG && (
                <div className={styles.options}>
                  {chatInfo.guest._id === message.sender_id && (
                    <i
                      onClick={() => handleSetShowEmoji(message._id)}
                      className='far fa-smile'
                    >
                      {showEmoji === message._id && (
                        <ul className={styles.modalEmoji}>
                          {MESSAGE_EMOJIS.map((emoji: string) => (
                            <li
                              onClick={() =>
                                sendEmojiMessage(
                                  emoji,
                                  message._id,
                                  message.guest_message_id,
                                  message.emoji
                                )
                              }
                              key={emoji}
                            >
                              {emoji}
                            </li>
                          ))}
                        </ul>
                      )}
                    </i>
                  )}
                  <i className='fas fa-share'></i>
                  <i className='fas fa-ellipsis-v'></i>
                </div>
              )}
          </li>
        )
      })}
      {typing && <p className={styles.typing}>Typing</p>}
      <div ref={messagesEndRef} />
    </ul>
  )
}

export default memo(ContentChat)
