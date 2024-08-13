import {createStore, compose, applyMiddleware} from "redux"
import reducer from './reducer'
import thunk from 'redux-thunk' // Redux中间件thunk，它允许在action creators中写异步逻辑

// 创建一个redux store，并使用redux DevTools来增强store的功能

// 获取redux DevTools提供的增强函数
const componentEnhanders = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 创建一个增强器， 使用redux DevTools提供的增强函数，并将thunk中间件应用于store
const enhancer = componentEnhanders(applyMiddleware(thunk))

// createStore创建了redux store
const store = createStore(reducer, enhancer)

export default store
