import { FiSkipForward } from 'react-icons/fi'
import navigateNextMail from '../../../utils/navigateNextEmail'
import CustomButton from '../../Elements/Buttons/CustomButton'
import * as local from '../../../constants/emailDetailConstants'
import * as global from '../../../constants/globalConstants'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import {
  selectViewIndex,
  setSessionViewIndex,
} from '../../../Store/emailDetailSlice'
import { selectLabelIds } from '../../../Store/labelsSlice'
import {
  selectActiveEmailListIndex,
  selectCoreStatus,
  selectEmailList,
} from '../../../Store/emailListSlice'
import { selectComposeEmail } from '../../../Store/composeSlice'
import useMultiKeyPress from '../../../Hooks/useMultiKeyPress'
import { selectInSearch } from '../../../Store/utilsSlice'
import modifierKey from '../../../utils/setModifierKey'

const actionKeys = [modifierKey, global.KEY_SHIFT, global.KEY_K]

const SkipOption = () => {
  const dispatch = useAppDispatch()
  const viewIndex = useAppSelector(selectViewIndex)
  const labelIds = useAppSelector(selectLabelIds)
  const emailList = useAppSelector(selectEmailList)
  const sessionViewIndex = useAppSelector(selectViewIndex)
  const inSearch = useAppSelector(selectInSearch)
  const coreStatus = useAppSelector(selectCoreStatus)
  const composeEmail = useAppSelector(selectComposeEmail)
  const activeEmailListIndex = useAppSelector(selectActiveEmailListIndex)

  const handleEvent = () => {
    dispatch(setSessionViewIndex(sessionViewIndex + 1))
    navigateNextMail({
      dispatch,
      viewIndex,
      labelIds,
      activeEmailList: emailList[activeEmailListIndex],
      coreStatus,
      composeEmail,
    })
  }
  useMultiKeyPress(handleEvent, actionKeys, inSearch)

  return (
    <CustomButton
      icon={<FiSkipForward />}
      label={local.BUTTON_SKIP}
      onClick={handleEvent}
      suppressed
    />
  )
}

export default SkipOption
