import React from 'react'
import { Cloudy } from './style'

class WeatherCircle extends React.Component{
    render() {
        return (
            <Cloudy>
                <span className="cloud"></span>
            </Cloudy>
        )
    }
}

export default WeatherCircle