import styles from './popover.module.scss'
import {ReactNode, FC} from 'react'

type Props = {
  children: ReactNode
  id: string
}

const popover = {popover: 'auto'}

export const Popover: FC<Props> = ({children, id}) => {
  return (
    <div className={styles['menu-wrapper']} {...popover} id={id}>
      {children}
    </div>
  )
}
