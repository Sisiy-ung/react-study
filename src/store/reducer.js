import {fromJS} from 'immutable'
import * as actionTypes from './actionTypes'


// 默认情况会将数组准换为List类型，将对象转换为Map类型
const defaultState = fromJS({
    city: '',
    cityHistory: [],
    weatherData: {},
    forecast: [],
    init: true
})

export default(state=defaultState, action) => {
    if(action.type === actionTypes.CHANGE_CITY) {
        return state.set('city', action.city)
    }
    if(action.type === actionTypes.CURRENT_WEATHER) {
        return state.set('weatherData', action.weatherData)
    }
    if(action.type === actionTypes.FORECAST_WEATHER) {
        return state.set('forecast', action.forecast)
    }
    if(action.type === actionTypes.FIRST_INIT) {
        return state.set('init', false)
    }
    if(action.type === actionTypes.CHANGE_CITY) {
        return state.merge({
            city: action.city,
            cityHistory: [...new Set(state.get('cityHistory').concat(action.city))]
        })
    }
    return state
}