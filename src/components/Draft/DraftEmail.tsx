import React, { useEffect } from 'react'
import EmailList from '../EmailList/EmailList'
import { setCurrentLabels } from '../../Store/labelsSlice'
import { selectBaseLoaded } from '../../Store/baseSlice'
import * as local from '../../constants/draftConstants'
import { useAppDispatch, useAppSelector } from '../../Store/hooks'

const DraftEmail = () => {
  const baseLoaded = useAppSelector(selectBaseLoaded)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (baseLoaded) {
      dispatch(setCurrentLabels(local.LABEL_ARRAY))
    }
  }, [baseLoaded])

  return <EmailList />
}

export default DraftEmail