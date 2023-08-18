import { memo, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { editPassword } from '@/service/main/main'

interface IProps {
  children?: ReactNode
  isModalOpen: boolean
  setIsModalOpen: any
}

type FieldType = {
  password?: string
}

const password: FC<IProps> = memo((props) => {
  const fromRef = useRef<any>()
  const handleOk = () => {
    fromRef.current.validateFields().then(async (values: any) => {
      const res = await editPassword(values)
      message.success(res.message)
      props.setIsModalOpen(false)
    })
  }

  const handleCancel = () => {
    props.setIsModalOpen(false)
  }

  return (
    <>
      <Modal
        title="修改密码"
        width={500}
        open={props.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form ref={fromRef} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
          <Form.Item<FieldType>
            label="新密码"
            name="password"
            rules={[{ required: true, message: '请输入新密码' }]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
})

export default password
