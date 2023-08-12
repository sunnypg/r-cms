import myRequest from '@/service'

// 获取页面数据列表
export function getPageListData(pageName: string, queryInfo: any) {
  return myRequest.get({
    url: `/${pageName}`,
    params: queryInfo
  })
}

// 新增页面数据
export function addPage(pageName: string, addInfo: any) {
  return myRequest.post({
    url: `/${pageName}`,
    data: addInfo
  })
}

// 删除页面数据
export function deletePageById(pageName: string, id: number) {
  return myRequest.delete({
    url: `/${pageName}/${id}`
  })
}

// 编辑页面数据
export function editPage(pageName: string, id: number, editInfo: any) {
  return myRequest.put({
    url: `/${pageName}/${id}`,
    data: editInfo
  })
}

// 编辑页面状态
export function editStatus(pageName: string, id: number) {
  return myRequest.patch({
    url: `/${pageName}/${id}`
  })
}

// 分配权限
export function PermRole(id: number, data: any) {
  return myRequest.patch({
    url: `/role/${id}`,
    data
  })
}

// 导出数据概括
export function getLineExport(data: any) {
  return myRequest.post({
    url: `/line/export`,
    data
  })
}
