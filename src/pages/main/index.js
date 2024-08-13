import { Component } from "react";

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