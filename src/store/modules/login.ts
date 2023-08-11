import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: 'admin',
    password: '123456'
  },
  reducers: {
    changeUserAction(state, { payload }) {
      state.username = payload
    }
  }
})
export const { changeUserAction } = loginSlice.actions
export default loginSlice.reducer
