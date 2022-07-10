import {
  BACKGROUND_COLOR,
  IChat,
  ICreateMessageDto,
  MAIN_COLOR,
  MAIN_EMOJI,
  TYPE_MESSAGE,
} from '../interfaces'
import _ from 'lodash'

export const isKeySpace = (value: string) => _.isEqual(value, ' ')

export const createDtoSendMessage = (
  content: string,
  type: TYPE_MESSAGE,
  chatInfo: IChat
): ICreateMessageDto => ({
  content: _.trim(content),
  type,
  chat_id: chatInfo._id,
  guest_chat_id: chatInfo.guest_chat_id,
  guest_id: chatInfo.guest._id,
  nickname_host: chatInfo.nickname_host,
  nickname_guest: chatInfo.nickname_guest,
  color: chatInfo.color as MAIN_COLOR,
  emoji: chatInfo.emoji as MAIN_EMOJI,
  background_color: chatInfo.background_color as BACKGROUND_COLOR,
})

export const formatContentMessage = (content: string) => {
  if (_.startsWith(content, 'fa')) {
    content = TYPE_MESSAGE.ICON
  }
  if (_.startsWith(content, 'data:image')) {
    content = TYPE_MESSAGE.IMAGE
  }
  if (_.startsWith(content, 'data:video')) {
    content = TYPE_MESSAGE.VIDEO
  }
  if (_.startsWith(content, 'data:audio')) {
    content = TYPE_MESSAGE.VOICE
  }
  return content
}
