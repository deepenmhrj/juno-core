import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import ComposeHeader from '../Compose/ComposeHeader'
import InboxHeader from '../Inbox/InboxHeader'
import TodoHeader from '../ToDo/TodoHeader'
import DraftHeader from '../Draft/DraftHeader'
import SpamHeader from '../Spam/SpamHeader'
import SentHeader from '../Sent/SentHeader'
import NoMobileOverlay from '../NoMobileOverlay'
import Search from '../Search/Search'
import Settings from '../Settings/Settings'
import Introduction from '../Introduction/Introduction'
import { useAppSelector } from '../../Store/hooks'
import { selectSelectedEmails } from '../../Store/emailListSlice'
import SelectedOptions from './SelectedOptions/SelectedOptions'
import Help from '../Help/Help'

const SetHeader = memo(() => {
  const location = useLocation()

  // The email detail header is coming from EmailDetail.
  if (location.pathname === '/inbox') {
    return <InboxHeader />
  }
  if (location.pathname === '/') {
    return <TodoHeader />
  }
  if (location.pathname.includes('/compose')) {
    return <ComposeHeader />
  }
  if (location.pathname === '/drafts') {
    return <DraftHeader />
  }
  if (location.pathname === '/sent') {
    return <SentHeader />
  }
  if (location.pathname === '/spam') {
    return <SpamHeader />
  }
  return null
})

const ShowIntroduction = memo(() => {
  const location = useLocation()

  if (location.pathname === '/') {
    return <Introduction />
  }
  return null
})

const Header = () => {
  const selectedEmails = useAppSelector(selectSelectedEmails)

  return (
    <>
      <ShowIntroduction />
      <NoMobileOverlay />
      <SetHeader />
      <Search />
      <Settings />
      <Help />
      {selectedEmails.length > 0 && <SelectedOptions />}
    </>
  )
}

export default Header
