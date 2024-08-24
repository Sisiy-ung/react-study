import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { SearchWrapper, Recommend, Tag, TagWrapper, His } from './style'
import { Select } from 'antd'
import * as actionCreators from '../../store/actionCreators'
import axios from 'axios'
import { Link } from 'react-router-dom'
const { Option } = Select;
let loading = false
let currentValue;
let unfound = null;
let timeout
function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;

    function fake() {
        axios.get('/city/citys.json').then((res) => {
            var tem = []
            tem = res.data.citys.filter((item) => item.citysName.includes(value))

            callback(tem.slice(0, 10))
            console.log(tem.slice(0, 10), 'item.slice(0, 10)')

            loading = false

        })
    }

    timeout = setTimeout(fake, 300);
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
        // 获取热门城市
        const fetchData = async () => {
            const result = await axios('/city/hotcity.json')
            console.log(result.data.hotList, 'hotcity-result')
            this.setState({
                hotcity: result.data.hotList
            })
        }
        fetchData()
    }
    handleSearch = (value) => {
        if (value) {
            loading = true
            fetch(value, data => this.setState({ data }));
        } else {
            this.setState({ data: [] });
        }
    }
    handleChange = (value) => {
        this.state.data.map(item => {
            if (item.id == value) {
                let city = item.citysName.split(',')[0]
                this.props.changeCity(city)
                this.props.history.push('/')
                this.setState({ data: [] })
            }
        })

    }
    handleBlur = () => unfound = null;
    render() {
        // onSearch 文本框值变化时的回调
        // onChange 选中 option，或 input 的 value 变化时，调用此函数
        const options = this.state.data.map(item => <Option key={item.id}>{item.citysName}</Option>)
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
                    style={{ width: '75%' }}
                    bordered='false'
                    loading={loading}
                    notFoundContent={unfound}
                >
                    {options}
                </Select>

                <Recommend>
                    <p>热门城市</p>
                    <Tag>
                        {
                            this.state.hotcity.map((item) => (
                                <Link key={item} to="/">
                                    <TagWrapper onClick={() => this.props.changeCity(item)}>{item}市</TagWrapper>
                                </Link>
                            ))
                        }
                    </Tag>
                </Recommend>
                <Recommend>
                    <p>历史记录</p>
                    <His>
                        {
                            this.props.cityHistory.map((item) => (
                                <Link key={item} to="/">
                                    <TagWrapper onClick={() => this.props.cityHistory(item)}>{item}市</TagWrapper>
                                </Link>
                            ))
                        }
                    </His>
                </Recommend>
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