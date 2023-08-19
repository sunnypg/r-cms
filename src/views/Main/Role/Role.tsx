import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Role: FC<IProps> = memo(() => {
  return <div>Role</div>
})

export default Role
