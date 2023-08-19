import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const Menu: FC<IProps> = memo(() => {
  return <div>Menu</div>
})

export default Menu
