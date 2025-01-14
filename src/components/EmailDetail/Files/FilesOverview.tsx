import CircularProgress from '@mui/material/CircularProgress'
import * as ES from '../EmailDetailStyles'
import * as S from './FilesOverviewStyles'
import * as local from '../../../constants/filesOverviewConstants'
import { IEmailListThreadItem } from '../../../Store/emailListTypes'
import TimeStampDisplay from '../../Elements/TimeStamp/TimeStampDisplay'
import SenderNameFull from '../../Elements/SenderName/senderNameFull'
import { selectProfile } from '../../../Store/baseSlice'
import { useAppSelector } from '../../../Store/hooks'
import checkAttachment from '../../../utils/checkAttachment'
import EmailAttachmentBubble from '../Attachment/EmailAttachmentBubble'
import EmailAvatar from '../../Elements/Avatar/EmailAvatar'

interface IFilesOverview {
  threadDetail: IEmailListThreadItem | null
  isLoading: boolean
}

const FilesOverview = (props: IFilesOverview) => {
  const { threadDetail, isLoading } = props
  const { emailAddress } = useAppSelector(selectProfile)

  const files = () => {
    if (threadDetail?.messages) {
      return threadDetail.messages
        .slice(0)
        .reverse()
        .map((message) => {
          const result = checkAttachment(message)
          const staticSenderNameFull = SenderNameFull(message, emailAddress)
          if (result.length > 0) {
            return (
              <S.FileEmailRow key={message.id}>
                <S.NameTimestampRow>
                  <S.AvatarName>
                    <EmailAvatar avatarURL={staticSenderNameFull} />
                    <span>{staticSenderNameFull}</span>
                  </S.AvatarName>
                  <TimeStampDisplay threadTimeStamp={message.internalDate} />
                </S.NameTimestampRow>
                <S.BubbleWrapper>
                  {result.map((item, index) => (
                    <EmailAttachmentBubble
                      attachmentData={item}
                      messageId={message.id}
                      key={item.body.attachmentId}
                      index={index}
                    />
                  ))}
                </S.BubbleWrapper>
              </S.FileEmailRow>
            )
          }
          return null
        })
    }
    return null
  }

  const staticFiles = files()?.filter((item) => item !== null)

  return (
    <ES.DetailRow>
      <ES.EmailDetailContainer>
        <S.FilesWrapper>
          {!isLoading && staticFiles && staticFiles.length > 0 ? (
            staticFiles
          ) : (
            <span>{local.NO_FILES}</span>
          )}
          {isLoading && <CircularProgress />}
        </S.FilesWrapper>
      </ES.EmailDetailContainer>
      <ES.EmailOptionsPlaceholder />
    </ES.DetailRow>
  )
}

export default FilesOverview
