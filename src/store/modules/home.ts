import {
  getMenuByMenu,
  getMenuByPerm,
  getAllUser,
  getAllDept,
  getPermTree,
  getRoleLevel,
  getAllRole,
  getRolePerm,
  getAllType
} from '@/service/main/main'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const GetMenuByMenu = createAsyncThunk('MenuByMenu', async (arg, { dispatch }) => {
  const res = await getMenuByMenu()
  dispatch(changeMenuByMenu(res.data))
})
export const GetMenuByPerm = createAsyncThunk('MenuByPerm', async (arg, { dispatch }) => {
  const res = await getMenuByPerm()
  dispatch(changeMenuByPerm(res.data))
})
export const GetAllUser = createAsyncThunk('AllUser', async (arg, { dispatch }) => {
  const res = await getAllUser()
  dispatch(changeAllUser(res.data))
})
export const GetAllDept = createAsyncThunk('AllDept', async (arg, { dispatch }) => {
  const res = await getAllDept()
  dispatch(changeAllDept(res.data))
})
export const GetPermTree = createAsyncThunk('PermTree', async (arg, { dispatch }) => {
  const res = await getPermTree()
  dispatch(changePermTree(res.data))
})
export const GetRoleLevel = createAsyncThunk('RoleLevel', async (arg, { dispatch }) => {
  const res = await getRoleLevel()
  dispatch(changeRoleLevel(res.data))
})
export const GetAllRole = createAsyncThunk('AllRole', async (arg, { dispatch }) => {
  const res = await getAllRole()
  dispatch(changeAllRole(res.data))
})
export const GetRolePerm = createAsyncThunk('RolePerm', async (id: number, { dispatch }) => {
  const res = await getRolePerm(id)
  dispatch(changeRolePerm(res.data))
})
export const GetAllType = createAsyncThunk('AllType', async (arg, { dispatch }) => {
  const res = await getAllType()
  dispatch(changeAllType(res.data))
})

interface Istate {
  MenuByMenu: any[]
  MenuByPerm: any[]
  AllDept: any[]
  AllRole: any[]
  AllUser: any[]
  PermTree: any[]
  RoleLevel: any[]
  RolePerm: any[]
  AllType: any[]
}

const initialState: Istate = {
  MenuByMenu: [],
  MenuByPerm: [],
  AllDept: [],
  AllRole: [],
  AllUser: [],
  PermTree: [],
  RoleLevel: [],
  RolePerm: [],
  AllType: []
}

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changeMenuByMenu(state, { payload }) {
      state.MenuByMenu = payload
    },
    changeMenuByPerm(state, { payload }) {
      state.MenuByPerm = payload
    },
    changeAllUser(state, { payload }) {
      state.AllUser = payload
    },
    changeAllDept(state, { payload }) {
      state.AllDept = payload
    },
    changePermTree(state, { payload }) {
      state.PermTree = payload
    },
    changeRoleLevel(state, { payload }) {
      state.RoleLevel = payload
    },
    changeAllRole(state, { payload }) {
      state.AllRole = payload
    },
    changeRolePerm(state, { payload }) {
      state.RolePerm = payload
    },
    changeAllType(state, { payload }) {
      state.AllType = payload
    }
  }
})
export const {
  changeMenuByMenu,
  changeAllDept,
  changeAllRole,
  changeAllType,
  changeAllUser,
  changeMenuByPerm,
  changePermTree,
  changeRoleLevel,
  changeRolePerm
} = homeSlice.actions
export default homeSlice.reducer
