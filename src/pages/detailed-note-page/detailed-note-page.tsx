import style from './detailed-note-page.module.scss'
import {FC} from 'react'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {useLocalization} from '../../hooks/useLocalization'
import {DetailedNote} from '../../components/detailed-note'
import {ROUTE_PATH} from '../../services/routes-paths'
import {useGetNoteQuery} from '../../api/endpoints'
import Spinner from '../../assets/spinner.svg?react'

export const DetailedNotePage: FC = () => {
  const {id} = useParams()
  const {data, isLoading, isError} = useGetNoteQuery(id as string)
  const localization = useLocalization()
  const navigate = useNavigate()

  return (
    <div className={style.wrapper}>
      <button className={style.navigate} onClick={() => navigate(-1)}>
        {localization.back}
      </button>
      {isLoading && <Spinner />}
      {data && (
        <DetailedNote
          title={data.title}
          text={data.text}
          tags={data.tags}
          background={data.color}
        />
      )}
      {(isError || data === null) && <Navigate to={ROUTE_PATH.page404} />}
    </div>
  )
}
