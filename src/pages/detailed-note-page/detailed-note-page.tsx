import style from './detailed-note-page.module.scss'
import {FC} from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {useLocalization} from '../../hooks/useLocalization'
import {DetailedNote} from '../../components/detailed-note'
import {ROUTE_PATH} from '../../services/routes-paths'
import {useAppSelector} from '../../redux/hooks/redux-hooks'

export const DetailedNotePage: FC = () => {
  const {id} = useParams()
  const localization = useLocalization()
  const navigate = useNavigate()
  const {notes: publicNotes} = useAppSelector(state => state.publicNotes)
  const {notes: personalNotes} = useAppSelector(state => state.personalNotes)

  //TODO add request for note data
  const publicNote = publicNotes.find(note => note.id === id)
  const noteData = publicNote ? publicNote : personalNotes.find(note => note.id === id)

  return (
    <div className={style.wrapper}>
      <button className={style.navigate} onClick={() => navigate(-1)}>
        {localization.back}
      </button>
      {!noteData ? (
        <Navigate to={ROUTE_PATH.page404} />
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
