import { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  contentConfig: {
    pageName: string
    header: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
    show_summary?: boolean
  }
}

const pageContent: FC<IProps> = memo(() => {
  return <div>Home</div>
})

export default pageContent
