import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SearchWrapper } from './style'
import { Select } from 'antd'
import * as actionCreators from '../../store/actionCreators'
import axios from 'axios'
const { Option } = Select;
let loading = false
let currentValue;
let unfound = null;
let timer
function fetch(value, callback) {
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    currentValue = value
    timer = setTimeout(() => {
        axios.get('/city/citys.json').then((res) => {
            var item = []
            item = res.data.citys.filter(i => i.citysName.includes(value))
            callback(item.slice(0, 10))
            loading = false
        })

    }, 300)
}
class SearchCity extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hotcity: [],
            data: [],
            value: undefined
        }
    }
    componentDidMount() {

    }
    handleSearch = (value) => {
        if (value) {
            loading = true
            fetch(value, data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    }
    handleChange(value) {
        console.log(this.state.data, 'this.state.data')

    }
    handleBlur = () => unfound = null;
    render() {
        // onSearch 文本框值变化时的回调
        // onChange 选中 option，或 input 的 value 变化时，调用此函数
        console.log(this.state.data, 'this.state.data')
        const options = this.state.data.map(item => <Option key={item.id}>{item.cityName}</Option>)
        return (
            <SearchWrapper>
                <Select
                    showSearch
                    value={this.state.value}
                    placeholder='请输入城市名，快速查询天气信息'
                    defaultActiveFirstOption='flase'
                    showArrow='true'
                    filterOption={false}
                    onSearch={this.handleSearch}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    notFoundContent={null}
                    style={{ width: '75%' }}
                    bordered='false'
                    loading={loading}
                    notFoundContent={unfound}
                >
                    {options}
                </Select>
            </SearchWrapper>
        )
    }

}
const mapState = (state) => ({
    city: state.get('city'),
    cityHistory: state.get('cityHistory'),
})

const mapDispatch = (dispatch) => ({
    changeCity(city) {
        dispatch(actionCreators.changeCity(city))
    }
})
export default connect(mapState, mapDispatch)(withRouter(SearchCity))