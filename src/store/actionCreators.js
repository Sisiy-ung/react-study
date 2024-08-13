import * as actionTypes from './actionTypes'

export const getCity = (city) => {
    return (dispatch) => {
        const action = {
            type: actionTypes.CURRENT_CITY,
            city
        }
        dispatch(action)
    }
}

export const getWeather = (data) => {
    return (dispatch) => {
        const action = {
            type: actionTypes.CURRENT_WEATHER,
            weatherData: data
        }
        dispatch(action)
    }
}

export const getForecast = (data) => {
    return (dispatch) => {
        const action = {
            type: actionTypes.FORECAST_WEATHER,
            forecast: data
        }
        dispatch(action)
    }
}

export const getInit = () => {
    return (dispatch) => {
        const action = {
            type: actionTypes.FIRST_INIT,
            init: false
        }
        dispatch(action)
    }
}

export const changeCity = (city) => {
    return dispatch => {
        const action = {
            type: actionTypes.CHANGE_CITY,
            city: city
        }
        dispatch(action)
    }
}