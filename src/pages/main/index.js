import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import * as actionCreators from '@/store/actionCreators'
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            foreData: [],
            preWeather: [],
            loading: true
        }
    }
    initWeather(city) {
        console.log(city, 'city')
    }
    componentDidMount() {

    }
    render() {

    }
}
// 接收 Redux store 的 state 作为参数
// 从 Redux store 的 state 中提取了 city、weatherData、forecast 和 init
const mapState = (state) => {
    return ({
        city: state.get('city'),
        weatherData: state.get('weatherData'),
        forecast: state.get('forecast'),
        init: state.get('init')
    })
}
// 返回一个对象，这个对象中包含了多个 action creators 函数，这些函数会将 action 分发到 Redux store 中

// 定义了 getCity、getInit、getWeather 和 getForecast 四个 action creators。每个 action creator 接收一些参数（如 city、data 等），然后通过调用 dispatch 方法来分发一个特定的 action 到 Redux store 中


// 这个 mapDispatch 函数通常会与 connect 函数一起使用，将这些 action creators 映射到 React 组件的 props 上，使得组件能够通过 props 调用这些 action creators 来更新 Redux store 中的状态。
const mapDispatch = (dispatch) => ({
    getCity(city) {
        dispatch(actionCreators.getCity(city))
    },
    getInit() {
        dispatch(actionCreators.getInit())
    },
    getWeather(data) {
        dispatch(actionCreators.getWeather(data))
    },
    getForecast(data) {
        dispatch(actionCreators.getForecast(data))
    }
})

// connect 是 Redux 提供的高阶函数，连接 React 组件与 Redux store
// connect 将 mapState 和 mapDispatch 函数与组件 Home 连接起来，并使用 withRouter 高阶组件对 Home 进行包装
export default connect(mapState, mapDispatch)(withRouter(Home))