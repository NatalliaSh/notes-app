import style from './detailed-note-page.module.scss'
import {FC} from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {useAuth} from '../../hooks/useAuth'
import mockNotes from '../../mockNotes.json'
import mockPublicNotes from '../../mockPublicNotes.json'
import {useLocalization} from '../../hooks/useLocalization'
import {DetailedNote} from '../../components/detailed-note'
import {ROUTE_PATH} from '../../services/routes-paths'

export const DetailedNotePage: FC = () => {
  const {id} = useParams()
  const isAuth = useAuth()
  const localization = useLocalization()
  const navigate = useNavigate()

  //TODO add request for note data
  const publicNote = mockPublicNotes.find(note => note.id === id)
  const noteData = publicNote ? publicNote : mockNotes.find(note => note.id === id)

  return (
    <div className={style.wrapper}>
      <button className={style.navigate} onClick={() => navigate(-1)}>
        {localization.back}
      </button>
      {!noteData ? (
        <Navigate to={ROUTE_PATH.page404} />
      ) : !isAuth?.isAuth && !publicNote ? (
        <div>{localization.privateNote}</div>
      ) : (
        <DetailedNote
          title={noteData?.title}
          text={noteData.text}
          tags={noteData.tags}
          background={noteData.color}
        />
      )}
    </div>
  )
}
