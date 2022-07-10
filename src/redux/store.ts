import { configureStore } from '@reduxjs/toolkit'
import { sliceContentChat } from '../components/ContentChat/slice'
import { sliceContentSidebar } from '../components/ContentSidebar/slice'
import { sliceFooterChat } from '../components/FooterChat/slice'
import { sliceFormLogin } from '../components/FormLogin/slice'
import { sliceFormRegister } from '../components/FormRegister/slice'
import { sliceHeaderChat } from '../components/HeaderChat/slice'
import { sliceHeaderSidebar } from '../components/HeaderSidebar/slice'
import { sliceDashboard } from '../pages/Dashboard/slice'

export const store = configureStore({
  reducer: {
    FormRegister: sliceFormRegister.reducer,
    FormLogin: sliceFormLogin.reducer,
    HeaderChat: sliceHeaderChat.reducer,
    HeaderSidebar: sliceHeaderSidebar.reducer,
    ContentSidebar: sliceContentSidebar.reducer,
    ContentChat: sliceContentChat.reducer,
    FooterChat: sliceFooterChat.reducer,
    Dashboard: sliceDashboard.reducer,
  },
})
