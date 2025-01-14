import { useEffect } from 'react'
import { selectLabelIds } from '../../../Store/labelsSlice'
import { selectViewIndex } from '../../../Store/emailDetailSlice'
import * as global from '../../../constants/globalConstants'
import navigateNextMail from '../../../utils/navigateNextEmail'
import loadNextPage from '../../../utils/loadNextPage'
import {
  selectEmailListSize,
  selectIsSilentLoading,
} from '../../../Store/utilsSlice'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import DetailNavigationView from './DetailNavigationView'
import {
  IEmailListObject,
  IEmailListObjectSearch,
} from '../../../Store/emailListTypes'
import { selectCoreStatus } from '../../../Store/emailListSlice'
import { selectComposeEmail } from '../../../Store/composeSlice'

const DetailNavigationContainer = ({
  activeEmailList,
}: {
  activeEmailList: IEmailListObject | IEmailListObjectSearch
}) => {
  const labelIds = useAppSelector(selectLabelIds)
  const isSilentLoading = useAppSelector(selectIsSilentLoading)
  const viewIndex = useAppSelector(selectViewIndex)
  const dispatch = useAppDispatch()
  const emailFetchSize = useAppSelector(selectEmailListSize)
  const coreStatus = useAppSelector(selectCoreStatus)
  const composeEmail = useAppSelector(selectComposeEmail)

  const isDisabledPrev = !!(
    activeEmailList.threads[viewIndex - 1] === undefined
  )

  const isDisabledNext =
    activeEmailList.nextPageToken === undefined &&
    activeEmailList.threads[viewIndex + 1] === undefined

  const nextButtonSelector = () => {
    if (
      activeEmailList.threads.length > 0 &&
      activeEmailList.threads[viewIndex + 1] !== undefined &&
      labelIds
    ) {
      navigateNextMail({
        labelIds,
        activeEmailList,
        viewIndex,
        dispatch,
        coreStatus,
        composeEmail,
      })
    }
    if (!labelIds.includes(global.ARCHIVE_LABEL)) {
      // If loading isn't already happening, load the nextPage
      const { nextPageToken } = activeEmailList as IEmailListObject
      if (
        activeEmailList.nextPageToken !== null &&
        activeEmailList.threads[viewIndex + 1] === undefined &&
        !isSilentLoading
      ) {
        return loadNextPage({
          nextPageToken,
          labelIds,
          dispatch,
          maxResults: emailFetchSize,
        })
      }
    }

    return null
  }

  // Load additional emails when the first, current viewed email happens to be the last in the list
  useEffect(() => {
    let mounted = true
    if (viewIndex > -1 && !isSilentLoading) {
      if (activeEmailList.threads.length - 1 === viewIndex && mounted) {
        const { nextPageToken } = activeEmailList
        const silentLoading = true
        if (
          nextPageToken &&
          activeEmailList.threads[viewIndex + 1] === undefined &&
          mounted
        ) {
          if (!labelIds.includes(global.ARCHIVE_LABEL) && mounted) {
            return loadNextPage({
              nextPageToken,
              labelIds,
              dispatch,
              silentLoading,
              maxResults: emailFetchSize,
            })
          }
        }
      }
    }
    return () => {
      mounted = false
    }
  }, [viewIndex, isSilentLoading])

  return (
    <DetailNavigationView
      labelIds={labelIds}
      activeEmailList={activeEmailList}
      viewIndex={viewIndex}
      isDisabledPrev={isDisabledPrev}
      isDisabledNext={isDisabledNext}
      nextButtonSelector={nextButtonSelector}
    />
  )
}

export default DetailNavigationContainer
