import myRequest from '@/service'

// 所属菜单（菜单管理）
export function getMenuByMenu() {
  return myRequest.get({
    url: `/common/menu`
  })
}

// 所属菜单（权限管理）
export function getMenuByPerm() {
  return myRequest.get({
    url: `/common/perm`
  })
}

// 所有用户
export function getAllUser() {
  return myRequest.get({
    url: `/common/user`
  })
}

// 所有部门
export function getAllDept() {
  return myRequest.get({
    url: `/common/dept`
  })
}

// 权限树
export function getPermTree() {
  return myRequest.get({
    url: `/common/tree`
  })
}

// 角色等级
export function getRoleLevel() {
  return myRequest.get({
    url: `/common/level`
  })
}

// 所有角色
export function getAllRole() {
  return myRequest.get({
    url: `/common/roles`
  })
}

// 角色权限
export function getRolePerm(id: number) {
  return myRequest.get({
    url: `/common/role/${id}`
  })
}

// 所有类型
export function getAllType() {
  return myRequest.get({
    url: `/common/type`
  })
}

// 修改密码
export function editPassword(data: any) {
  return myRequest.post({
    url: `/common/password`,
    data
  })
}
