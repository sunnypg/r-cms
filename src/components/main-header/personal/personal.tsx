import { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Modal, Descriptions, Tag } from 'antd'
import type { DescriptionsProps } from 'antd'

interface IProps {
  children?: ReactNode
  isModalOpen: boolean
  setIsModalOpen: any
  userInfo: any
}

const items: DescriptionsProps['items'] = []

const personal: FC<IProps> = memo((props) => {
  const handleOk = () => {
    props.setIsModalOpen(false)
  }

  const handleCancel = () => {
    props.setIsModalOpen(false)
  }

  const keyToLabelMap: any = {
    name: '姓名',
    username: '用户名',
    ip: '登录IP',
    login_at: '登录时间',
    created_at: '创建时间',
    dept: '部门',
    roles: '角色'
  }

  useEffect(() => {
    for (const key in props.userInfo) {
      if (key !== 'id' && key !== 'uid' && key !== 'bid') {
        items.push({
          key,
          label: keyToLabelMap[key],
          children:
            key === 'roles'
              ? props.userInfo[key].map((item: any) => {
                  return <Tag color="processing">{item}</Tag>
                })
              : props.userInfo[key]
        })
      }
    }
  }, [items])
  return (
    <>
      <Modal
        title="个人信息"
        width={1000}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Descriptions bordered items={items} column={3} />
      </Modal>
    </>
  )
})

export default personal
