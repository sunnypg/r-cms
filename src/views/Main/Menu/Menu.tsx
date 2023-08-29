import { appShallowEqual, useAppDispatch, useAppSelector } from '@/store'
import { GetPageData } from '@/store/modules/system'
import { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Table, Button, Switch, Card, Pagination, Space, Form, Input } from 'antd'
import type { ColumnsType } from 'antd/es/table'

interface IProps {
  children?: ReactNode
}

const Menu: FC<IProps> = memo(() => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(GetPageData({ pageName: 'menu', queryInfo: {} }))
  }, [])

  const { pageData, pagination } = useAppSelector(
    (state) => ({
      pageData: state.system.pageData,
      pagination: state.system.pagination
    }),
    appShallowEqual
  )

  console.log(pageData, pagination)

  interface DataType {
    key: React.ReactNode
    name: string
    path: string
    created_at: string
    status: boolean
    children?: DataType[]
  }

  const columns: ColumnsType<DataType> = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path',
      align: 'center'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: boolean) => <Switch defaultChecked={status} onChange={statusChange} />
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'action',
      align: 'center',
      render: () => (
        <Space wrap>
          <Button type="primary" danger>
            删除
          </Button>
          <Button type="primary">编辑</Button>
        </Space>
      )
    }
  ]

  const statusChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }

  const pageChange = (page: number, pageSize: number) => {
    console.log(page, pageSize)
  }
  type FieldType = {
    name?: string
    status?: string
  }

  return (
    <div style={{ backgroundColor: '#f5f5f5', height: '100%' }}>
      <div className="searchFrom" style={{ padding: '10px' }}>
        <Card bordered={false}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{}}
            autoComplete="off"
            layout="inline"
          >
            <Form.Item<FieldType>
              label="菜单名称"
              name="name"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="状态"
              name="status"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Card>
      </div>
      <div className="table" style={{ padding: '10px' }}>
        <Card title="菜单列表" bordered={false}>
          <Button type="primary">新增</Button>
          <Button type="primary">刷新</Button>
          <Table bordered columns={columns} dataSource={pageData} pagination={false} />
          <Pagination
            total={pagination.total}
            pageSizeOptions={[10, 20, 30, 50, 100]}
            showSizeChanger
            showQuickJumper
            onChange={pageChange}
            showTotal={(total) => `共 ${total} 条`}
          />
        </Card>
      </div>
    </div>
  )
})

export default Menu
