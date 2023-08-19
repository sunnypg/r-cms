import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Dept: FC<IProps> = memo(() => {
  return <div>Dept</div>
})

export default Dept
