import { ChangeEvent, useEffect, useState } from 'react'
import { FiArrowRightCircle } from 'react-icons/fi'
import Dialog from '@mui/material/Dialog'
import * as S from './IntroductionStyles'
import CustomButton from '../Elements/Buttons/CustomButton'
import { useAppSelector } from '../../Store/hooks'
import updateSettingsLabel from '../../utils/Settings/updateSettingsLabel'
import {
  selectSettingsLabelId,
  selectShowIntroduction,
} from '../../Store/utilsSlice'

const DIALOG_HEADER = 'Welcome to Juno'
const DIALOG_CONTENT_DEVELOPMENT =
  'This app is still in development, some things might break or not be there yet - and is looking for your help. See for more information on the settings page.'
const DIALOG_HEADER_INTRODUCTION = 'How it works'
const DIALOG_CONTENT_INTRODUCTION_1 =
  'Your homepage is your To Do list of emails. You can populate it by marking emails from your Inbox as To Do.'
const DIALOG_CONTENT_INTRODUCTION_2 =
  'On top of the Inbox and To Do, there is a special button you should give it a shot. Also, you can navigate between pages via the top-right menu.'
const DIALOG_HEADER_PRIVACY = 'Privacy'
const DIALOG_CONTENT_PRIVACY =
  'Juno does not store any of your information - nada! It only serves as an interaction layer between you and your Gmail.'
const CONFIRM_BUTTON = "Let's go"

const Introduction = () => {
  const [open, setOpen] = useState(false)
  const settingsLabelId = useAppSelector(selectSettingsLabelId)
  const showIntroduction = useAppSelector(selectShowIntroduction)

  useEffect(() => {
    if (showIntroduction) {
      setOpen(true)
    }
  }, [showIntroduction])

  const handleCloseDefault = (event: ChangeEvent<{}>, reason: string) => {
    if (reason === 'backdropClick') {
      return null
    }
    if (reason === 'escapeKeyDown') {
      updateSettingsLabel({ settingsLabelId, showIntroduction: false })
      setOpen(false)
      return null
    }
    return null
  }

  const handleClose = () => {
    updateSettingsLabel({ settingsLabelId, showIntroduction: false })
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onClose={handleCloseDefault}
      aria-labelledby="introduction-dialog"
      aria-describedby="alert-dialog-for-first-users"
    >
      <S.DialogContent>
        <S.DialogHeader>{DIALOG_HEADER}</S.DialogHeader>
        <S.InnerContent>
          <p>{DIALOG_CONTENT_DEVELOPMENT}</p>
          <S.DialogSubHeader>{DIALOG_HEADER_INTRODUCTION}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_INTRODUCTION_1}</p>
          <p>{DIALOG_CONTENT_INTRODUCTION_2}</p>
          <S.DialogSubHeader>{DIALOG_HEADER_PRIVACY}</S.DialogSubHeader>
          <p>{DIALOG_CONTENT_PRIVACY}</p>
        </S.InnerContent>
        <CustomButton
          onClick={handleClose}
          label={CONFIRM_BUTTON}
          icon={<FiArrowRightCircle />}
        />
      </S.DialogContent>
    </Dialog>
  )
}

export default Introduction
