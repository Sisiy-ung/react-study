import { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import * as actionCreators from '@/'
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
}

const mapState = (state) => {
    return({
        city: state.get('city'),
        weatherData: state.get('weatherData'),
        forecast: state.get('forecast'),
        init: state.get('init')
    })
}

const mapDispatch = (dispatch) => ({
    getCity(city) {
        dispatch()
    }
})

export default connect(mapState, mapDispatch)(withRouter(Home))