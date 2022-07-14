export interface ICreateUserDto {
  phone_or_email: string
  password: string
  repassword: string
  fullname: string
}

export interface ICreateChatDto {
  guest_id: string
}

export interface IDeleteChatDto {
  chat_id: string
  guest_chat_id: string | null
  guest_id: string
}

export interface ILoginAccountUserDto {
  phone_or_email: string
  password: string
}

export interface IChangeAvatarDto {
  new_avatar: string | null
}

export interface IUser {
  _id: string
  fullname: string
  fresh_name: string
  avatar: string | null
  status_online: boolean
  last_logout: Date | null
}

export interface IChat {
  _id: string
  host: IUser
  guest: IUser
  nickname_host: string | null
  nickname_guest: string | null
  guest_chat_id: string | null
  last_message:
    | [
        {
          _id: string
          content: string
          type: TYPE_MESSAGE
          sender_id: string
          createdAt: Date
        }
      ]
    | []
  readed: boolean
  color: string
  background_color: string
  emoji: string
  createdAt: Date
  updatedAt: Date
}

export enum TYPE_MESSAGE {
  TEXT = 'text',
  ICON = 'icon',
  IMAGE = 'image',
  VOICE = 'voice',
  VIDEO = 'video',
  CONFIG = 'config',
}

export interface IMessage {
  _id: string
  content: string
  type: TYPE_MESSAGE
  sender_id: string
  receiver_id: string
  chat_id: string
  guest_message_id: string | null
  emoji: string | null
  createdAt: Date
  updatedAt: Date
}

export interface ICreateMessageDto {
  content: string
  type: TYPE_MESSAGE
  chat_id: string
  guest_id: string
  guest_chat_id: string | null
  nickname_host: string | null
  nickname_guest: string | null
  color: MAIN_COLOR
  emoji: MAIN_EMOJI
  background_color: BACKGROUND_COLOR
}

export interface IUpdateReadedDto {
  chat_id: string
}

export interface IUpdateStatusOnlineDto {
  status_online: boolean
}

export interface IUpdateNicknameDto {
  data: {
    nickname_host: string | null
    nickname_guest: string | null
  }
  chat_id: string
  guest_chat_id: string
  guest_id: string
}

export enum MAIN_COLOR {
  PRIMARY = '#0a7cff',
  SECONDARY = '#6c757d',
  SUCCESS = '#28a745',
  DANGER = '#dc3545',
  WARNING = '#ffc107',
  INFO = '#17a2b8',
  VIOLET = '#b103fc',
  DARK = '#343a40',
}

export enum BACKGROUND_COLOR {
  white = '#fff',
  blue = '#f0f7ff',
  green = '#f0fff4',
  red = '#fff0f2',
  violet = '#fcf0ff',
  orange = '#fffaf0',
}

export interface IUpdateColorDto {
  chat_id: string
  guest_chat_id: string
  guest_id: string
  color: string
}

export interface IUpdateBackgroundColorDto {
  chat_id: string
  guest_chat_id: string
  guest_id: string
  background_color: string
}

export enum MAIN_EMOJI {
  LIKE = 'fas fa-thumbs-up',
  LOVE = 'fas fa-heart',
  SMILE = 'far fa-smile',
  POO = 'fas fa-poo',
  BALL = 'fas fa-futbol',
  GHOST = 'fas fa-ghost',
  APPLE = 'fab fa-apple',
  BAN = 'fas fa-ban',
}

export interface IUpdateEmojiDto {
  chat_id: string
  guest_chat_id: string
  guest_id: string
  emoji: string
}

export interface IGetListMessagesDto {
  chat_id: string
  page: number
}

export enum MESSAGE_EMOJI {
  LOVE = '❤️',
  LAUGH = '🤣',
  SAD = '😞',
  ANGRY = '😡',
  WOW = '😮',
}

export interface IUpdateMsgEmojiDto {
  emoji: string | null
  message_id: string
  guest_message_id: string | null
  chat_id: string
  guest_chat_id: string
}
