import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const User: FC<IProps> = memo(() => {
  return <div>User</div>
})

export default User
