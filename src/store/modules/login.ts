import { createSlice } from '@reduxjs/toolkit'

interface Istate {
  username: string
  password: string
}

const initialState: Istate = {
  username: 'admin',
  password: '123456'
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeUserAction(state, { payload }) {
      state.username = payload
    }
  }
})
export const { changeUserAction } = loginSlice.actions
export default loginSlice.reducer
