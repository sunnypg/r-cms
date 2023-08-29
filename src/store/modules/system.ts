import { getPageListData } from '@/service/main/system/system'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const GetPageData = createAsyncThunk(
  'MenuByMenu',
  async ({ pageName, queryInfo }: { pageName: string; queryInfo: any }, { dispatch }) => {
    console.log(pageName, queryInfo)

    const res = await getPageListData(pageName, queryInfo)
    console.log(res)

    dispatch(changePageData(res))
  }
)

interface Istate {
  pageData: any[]
  pagination: any
}

const initialState: Istate = {
  pageData: [],
  pagination: {}
}

const systemSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    changePageData(state, { payload }) {
      for (const menu of payload.data) {
        menu.key = menu.id
        for (const subMenu of menu.children) {
          subMenu.key = subMenu.id
        }
      }
      state.pageData = payload.data
      state.pagination = payload.meta.pagination
    }
  }
})
export const { changePageData } = systemSlice.actions
export default systemSlice.reducer
