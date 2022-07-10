import clsx from 'clsx'
import { memo, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BACKGROUND_COLORS, MAIN_COLORS, MAIN_EMOJIS } from '../../constants'
import { createDtoSendMessage, isKeySpace } from '../../helpers'
import {
  IUpdateBackgroundColorDto,
  IUpdateColorDto,
  IUpdateEmojiDto,
  IUpdateNicknameDto,
  TYPE_MESSAGE,
} from '../../interfaces'
import { store } from '../../redux/store'
import { sendMessageThunk } from '../ContentChat/thunks'
import { sliceContentSidebar } from '../ContentSidebar/slice'
import { chatInfoSelector } from '../HeaderChat/selectors'
import {
  updateBackgroundColorThunk,
  updateColorThunk,
  updateEmojiThunk,
  updateNicknameThunk,
} from '../HeaderChat/thunks'
import styles from './ChatInfo.module.scss'
import _ from 'lodash'

function ChatInfo() {
  const dispatch = useDispatch<typeof store.dispatch>()
  const [showOptions1, setShowOptions1] = useState(false)
  const [showOptions2, setShowOptions2] = useState(false)
  const [showOptions3, setShowOptions3] = useState(false)
  const [showModalNickname, setShowModalNickname] = useState(false)
  const [showModalColor, setShowModalColor] = useState(false)
  const [showModalEmoji, setShowModalEmoji] = useState(false)
  const [hostNickname, setHostNickname] = useState('')
  const [guestNickname, setGuestNickname] = useState('')

  const chatInfo = useSelector(chatInfoSelector)
  const { guest } = chatInfo

  useEffect(() => {
    setHostNickname(
      chatInfo.nickname_host ? chatInfo.nickname_host : chatInfo.host.fullname
    )
    setGuestNickname(
      chatInfo.nickname_guest
        ? chatInfo.nickname_guest
        : chatInfo.guest.fullname
    )
  }, [chatInfo])

  const handleChangeNickname = useCallback(() => {
    const data = {
      nickname_host: _.trim(hostNickname) ? _.trim(hostNickname) : null,
      nickname_guest: _.trim(guestNickname) ? _.trim(guestNickname) : null,
    }
    const updateNicknameDto: IUpdateNicknameDto = {
      guest_chat_id: chatInfo.guest_chat_id,
      guest_id: chatInfo.guest._id,
      chat_id: chatInfo._id,
      data,
    }
    dispatch(updateNicknameThunk(updateNicknameDto))
    dispatch(
      sendMessageThunk(
        createDtoSendMessage(
          `🚀🚀🚀 ${chatInfo.host.fullname} changed nickname 🚀🚀🚀`,
          TYPE_MESSAGE.CONFIG,
          { ...chatInfo, ...data }
        )
      )
    )
    dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
    setShowModalNickname(false)
  }, [dispatch, chatInfo, guestNickname, hostNickname])

  const handleChangeColor = useCallback(
    (color: string) => {
      const udpateColorDto: IUpdateColorDto = {
        guest_id: chatInfo.guest._id,
        guest_chat_id: chatInfo.guest_chat_id,
        chat_id: chatInfo._id,
        color,
      }
      dispatch(updateColorThunk(udpateColorDto))
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(
            `🔥🔥🔥 ${chatInfo.host.fullname} changed color of chat 🔥🔥🔥`,
            TYPE_MESSAGE.CONFIG,
            { ...chatInfo, color }
          )
        )
      )
      dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
      setShowModalColor(false)
    },
    [dispatch, chatInfo]
  )

  const handleChangeBgColor = useCallback(
    (bgColor: string) => {
      const udpateBackgroundColorDto: IUpdateBackgroundColorDto = {
        guest_id: chatInfo.guest._id,
        guest_chat_id: chatInfo.guest_chat_id,
        chat_id: chatInfo._id,
        background_color: bgColor,
      }
      dispatch(updateBackgroundColorThunk(udpateBackgroundColorDto))
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(
            `🔥🔥🔥 ${chatInfo.host.fullname} changed color of chat 🔥🔥🔥`,
            TYPE_MESSAGE.CONFIG,
            { ...chatInfo, background_color: bgColor }
          )
        )
      )
      dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
      setShowModalColor(false)
    },
    [dispatch, chatInfo]
  )

  const handleChangeEmoji = useCallback(
    (emoji: string) => {
      const updateEmojiDto: IUpdateEmojiDto = {
        guest_id: chatInfo.guest._id,
        guest_chat_id: chatInfo.guest_chat_id,
        chat_id: chatInfo._id,
        emoji,
      }
      dispatch(updateEmojiThunk(updateEmojiDto))
      dispatch(
        sendMessageThunk(
          createDtoSendMessage(
            `⚽⚽⚽ ${chatInfo.host.fullname} changed emoji of chat ⚽⚽⚽`,
            TYPE_MESSAGE.CONFIG,
            { ...chatInfo, emoji }
          )
        )
      )
      dispatch(sliceContentSidebar.actions.moveToTop(chatInfo._id))
      setShowModalEmoji(false)
    },
    [dispatch, chatInfo]
  )

  return (
    <div className={styles.ChatInfo}>
      <img
        src={
          guest.avatar ? guest.avatar : require('../../assets/img/avatar.png')
        }
        alt='avatar'
      />
      <p>
        {chatInfo.nickname_guest ? chatInfo.nickname_guest : guest.fullname}
      </p>
      <div
        onClick={() => setShowOptions1(!showOptions1)}
        className={styles.label}
      >
        <span>Tuỳ chỉnh đoạn chat</span>
        <i
          className={clsx(
            'far fa-angle-down',
            showOptions1 ? styles.rotate : ''
          )}
        ></i>
      </div>
      {showOptions1 && (
        <ul>
          <li onClick={() => setShowModalColor(true)}>
            <i
              className='fas fa-dot-circle'
              style={{ color: chatInfo.color }}
            ></i>
            <span>Đổi chủ đề</span>
            {showModalColor && (
              <div
                onClick={(e) => {
                  setShowModalColor(false)
                  e.stopPropagation()
                }}
                className={styles.color}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={styles.modalColor}
                >
                  <p>Main color</p>
                  <ul>
                    {MAIN_COLORS.map((color: string) => (
                      <li
                        key={color}
                        className={styles.ballColor}
                        style={{ backgroundColor: color }}
                        onClick={() => handleChangeColor(color)}
                      ></li>
                    ))}
                  </ul>
                  <p>Background color</p>
                  <ul>
                    {BACKGROUND_COLORS.map((bgColor: string) => (
                      <li
                        key={bgColor}
                        className={styles.ballColor}
                        style={{ backgroundColor: bgColor }}
                        onClick={() => handleChangeBgColor(bgColor)}
                      ></li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
          <li onClick={() => setShowModalEmoji(true)}>
            <i className={chatInfo.emoji} style={{ color: chatInfo.color }}></i>
            <span>Thay đổi biểu tượng cảm xúc</span>
            {showModalEmoji && (
              <div
                onClick={(e) => {
                  setShowModalEmoji(false)
                  e.stopPropagation()
                }}
                className={styles.emoji}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={styles.modalEmoji}
                >
                  <p>Main emoji</p>
                  <ul>
                    {MAIN_EMOJIS.map((emoji) => (
                      <i
                        key={emoji}
                        style={{ color: chatInfo.color }}
                        className={emoji}
                        onClick={() => handleChangeEmoji(emoji)}
                      ></i>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
          <li onClick={() => setShowModalNickname(true)}>
            <i className='far fa-text-size'></i>
            <span>Chỉnh sửa biệt danh</span>
            {showModalNickname && (
              <div
                onClick={(e) => {
                  setShowModalNickname(false)
                  e.stopPropagation()
                }}
                className={styles.nickname}
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className={styles.modalNickname}
                >
                  <p>Change nickname</p>
                  <label htmlFor='host_nickname'>
                    {chatInfo.host.fullname}
                  </label>
                  <input
                    type='text'
                    name='host_nickname'
                    placeholder='Nickname'
                    value={hostNickname}
                    onChange={(e) => {
                      if (!isKeySpace(e.target.value)) {
                        setHostNickname(e.target.value)
                      }
                    }}
                  />
                  <label htmlFor='guest_nickname'>
                    {chatInfo.guest.fullname}
                  </label>
                  <input
                    type='text'
                    name='guest_nickname'
                    placeholder='Nickname'
                    value={guestNickname}
                    onChange={(e) => {
                      if (!isKeySpace(e.target.value)) {
                        setGuestNickname(e.target.value)
                      }
                    }}
                  />
                  <div className={styles.containerBtnSubmit}>
                    <button onClick={() => setShowModalNickname(false)}>
                      Back
                    </button>
                    <button
                      onClick={handleChangeNickname}
                      style={{ backgroundColor: chatInfo.color }}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            )}
          </li>
          <li>
            <i className='far fa-search'></i>
            <span>Tìm kiếm trong cuộc trò chuyện</span>
          </li>
        </ul>
      )}
      <div
        onClick={() => setShowOptions2(!showOptions2)}
        className={styles.label}
      >
        <span>File phương tiện, file và liên kết</span>
        <i
          className={clsx(
            'far fa-angle-down',
            showOptions2 ? styles.rotate : ''
          )}
        ></i>
      </div>
      {showOptions2 && (
        <ul>
          <li>
            <i className='far fa-photo-video'></i>
            <span>File phương tiện</span>
          </li>
          <li>
            <i className='fas fa-file-alt'></i>
            <span>File</span>
          </li>
          <li>
            <i className='far fa-link'></i>
            <span>Liên kết</span>
          </li>
        </ul>
      )}
      <div
        onClick={() => setShowOptions3(!showOptions3)}
        className={styles.label}
      >
        <span>Tuỳ chỉnh đoạn chat</span>
        <i
          className={clsx(
            'far fa-angle-down',
            showOptions3 ? styles.rotate : ''
          )}
        ></i>
      </div>
      {showOptions3 && (
        <ul>
          <li>
            <i className='fas fa-bell'></i>
            <span>Tắt thông báo</span>
          </li>
          <li>
            <i className='fas fa-minus-circle'></i>
            <span>Chặn</span>
          </li>
          <li>
            <i className='fas fa-exclamation-circle'></i>
            <span>Báo cáo</span>
          </li>
        </ul>
      )}
    </div>
  )
}

export default memo(ChatInfo)
