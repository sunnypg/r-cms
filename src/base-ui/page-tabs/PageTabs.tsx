import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Tabs } from 'antd'
import { PageTabsWrapper } from './style'
import { myLocalStorage } from '@/utils/storage'
import { useNavigate } from 'react-router-dom'

type TargetKey = React.MouseEvent | React.KeyboardEvent | string

interface IProps {
  children?: ReactNode
  activeKey: string
  setActiveKey: any
  items: any
  setItems: any
  setBreadcrumbInfo: any
  menuClick: any
}

const PageTabs: FC<IProps> = memo((props) => {
  const navigateTo = useNavigate()
  const onChange = (key: string) => {
    const activeItem = props.items.find((item: any) => item.key === key)
    // console.log(activeItem)

    // props.setBreadcrumbInfo(activeItem.children)

    props.menuClick({ key, keyPath: activeItem.children })

    // props.setActiveKey(key)
    // myLocalStorage.setStorage('activeKey', key)
    // navigateTo(key)
  }

  const remove = (targetKey: TargetKey) => {
    const targetIndex = props.items.findIndex((pane: any) => pane.key === targetKey)
    const newPanes = props.items.filter((pane: any) => pane.key !== targetKey)
    if (newPanes.length && targetKey === props.activeKey) {
      const { key } = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex]
      props.setActiveKey(key)
      myLocalStorage.setStorage('activeKey', key)
      navigateTo(key)
    }
    props.setItems(newPanes)
    myLocalStorage.setStorage('tabsItems', newPanes)
  }

  const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
    if (action === 'remove') {
      remove(targetKey)
      console.log(targetKey)
    }
  }

  return (
    <PageTabsWrapper>
      <div>
        <Tabs
          hideAdd
          onChange={onChange}
          activeKey={props.activeKey}
          type="editable-card"
          onEdit={onEdit}
          items={props.items}
          size="large"
        />
      </div>
    </PageTabsWrapper>
  )
})

export default PageTabs
