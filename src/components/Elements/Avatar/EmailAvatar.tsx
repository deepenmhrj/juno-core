import React from 'react'
import getRandomColor from '../../../utils/getRandomColor'
import * as S from './EmailAvatarStyles'

const EmailAvatar = ({ avatarURL }: { avatarURL: string }) => {
  const intialCreator = () => {
    const splittedURL = avatarURL && avatarURL.split('<')
    if (splittedURL) {
      const name = splittedURL[0]
      const initials = name.match(/\b\w/g) || []
      const finalIntials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      return finalIntials
    }
    return '##'
  }

  const staticInitials = intialCreator()

  return (
    <S.EmailAvatarContainer randomColor={getRandomColor(staticInitials)}>
      <span>{staticInitials}</span>
    </S.EmailAvatarContainer>
  )
}

export default EmailAvatar