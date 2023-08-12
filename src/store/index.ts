import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './modules/login'
import homeReducer from './modules/home'
import { useSelector, useDispatch, TypedUseSelectorHook, shallowEqual } from 'react-redux'

const store = configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer
  }
})

// 给state指定类型
type getStateType = typeof store.getState

type stateType = ReturnType<getStateType>
type dispatchType = typeof store.dispatch

// useAppSelector 的 hook
export const useAppSelector: TypedUseSelectorHook<stateType> = useSelector

export const useAppDispatch: () => dispatchType = useDispatch
export const appShallowEqual = shallowEqual

export default store
