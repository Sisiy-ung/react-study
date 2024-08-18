import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import * as actionCreators from '@/store/actionCreators'
import {
    HomeWrapper,
    Header,
    Temperature,
    Echartcontaier
} from './style'
import * as echarts from 'echarts';
import { Link } from 'react-router-dom'
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
        let _self = this
        window.AMap.plugin('AMap.Weather', function () {
            var weather = new window.AMap.Weather()
            // 实时天气查询
            weather.getLive(city, (err, data) => {
                // console.log(err, data, 'getLive-err, data')
                _self.props.getWeather(data)
            })
            weather.getForecast(city, (err, data) => {
                // console.log(city, err, data, 'getForecast-err, data')
                _self.setState({
                    preWeather: data.forecasts
                })
                data.forecasts.map((item) => {
                    _self.state.foreData.push(item.dayTemp)
                    console.log(_self.state.foreData, '_self.state.foreData')
                })
                // 初始化表格
                _self.initEchart(_self.state.foreData)
                _self.setState({
                    loading: false
                })
            })
        })
    }

    initEchart = (array) => {
        let domChart = this.dom
        // console.log(this.dom, 'this.dom')
        let myChart = null
    
        if (domChart) {
            myChart = echarts.init(domChart);
        } else {
            console.log('DOM element is undefined');
            return
        }
        let option = null
        option = {
            title: {
                show: true,
                text: '天气变化趋势',
                x: 'center',
                textStyle: {
                    color: 'grey'
                },
                padding: [5, 0, 30, 10]
            },
            xAxis: {
                show: false,
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
                grid: { bottom: "20" }
            },
            yAxis: {
                show: false
            },
            series: [
                {
                    data: array,
                    type: "line",
                    itemStyle: {
                        normal:
                        {
                            label: {
                                show: true,
                                formatter: "{c}℃"
                            },
                            lineStyle: {
                                color: 'white' //改变折线颜色
                            },
                            color: '#eee'
                        },
                    }
                }
            ]
        }
        myChart.setOption(option, true)
    }
    // mapState 函数定义了如何从 Redux store 的 state 中提取数据，并将这些数据映射到组件的 props 上。在你的 mapState 函数中，你从 Redux store 的 state 中提取了 city、weatherData、forecast 和 init 这些数据，并将它们作为对象的属性返回
    // 使用 connect(mapState, mapDispatch) 将 mapState 和 mapDispatch 与组件 Home 连接起来时，这些属性会被注入到 Home 组件的 props 中
    componentDidMount() {
        let _self = this
        if (_self.props.init) {
            window.AMap.plugin('AMap.Geolocation', function () {

                const geolocation = new window.AMap.Geolocation({
                    // 是否使用高精度定位，默认：true
                    enableHighAccuracy: true,
                    // 设置定位超时时间，默认：无穷大
                    timeout: 10000,
                    // 定位按钮的停靠位置的偏移量
                    offset: [10, 20],
                    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    zoomToAccuracy: true,
                    //  定位按钮的排放位置,  RB表示右下
                    position: 'RB'
                })
                geolocation.getCurrentPosition(function (status, result) {
                console.log( status,result, 'geolocation')
                    if (status === 'complete' && result.info === "SUCCESS") {
                        _self.props.getCity(result.addressComponent.city)
                        _self.initWeather(result.addressComponent.city)
                        _self.props.getInit()
                    }
                });

                // var citySearch = new window.AMap.CitySearch()
                // // console.log(citySearch, 'citySearch')
                // citySearch.getLocalCity(function (status, result) {
                //     console.log(status, result, 'getLocalCity')
                //     if (status === 'complete' && result.info === 'OK') {
                //         _self.props.getCity(result.city)
                //         _self.initWeather(result.city)
                //         _self.props.getInit()
                //     }
                // })
            })
        } else {
            _self.initWeather(_self.props.city)
        }

    }
    render() {
        const {  city, weatherData } = this.props
        console.log(this.props.city, weatherData, 'render-weatherData' )
        // const reportTime = new String(weatherData.reportTime)
        return (
            < HomeWrapper imgUrl={require('../../static/img/4.jpg')}>
                <Link to="/search">
                    <Header><span>{city}</span></Header>
                </Link>
                <Temperature>
                </Temperature>
            <Echartcontaier ref={(echart) => { this.dom = echart }}></Echartcontaier>
            </HomeWrapper>
        )

    }
}
// 接收 Redux store 的 state 作为参数
// 从 Redux store 的 state 中提取了 city、weatherData、forecast 和 init
// 将Redux的【状态】映射到组件的属性上 可以通过this.props.city
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
// 将操作（dispatch函数）映射到组件的属性上，包括这4个操作，这些操作会作为组件的属性，通过this.props.getCity
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