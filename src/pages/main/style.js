import styled from 'styled-components'

export const HomeWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${props => props.imgUrl});
  background-size: cover;
  color: white;
  a{
    color: #fff;
  }
`

export const Header = styled.div`
  text-align: center;
  padding-top: 30px;
  font-size: 15px;
  font-weight: bold;
  span{
    margin-right: 5px;
  }
`

export const Temperature = styled.div`
  text-align: center;
  padding-top:30px;
  h2{
    font-size: 70px;
    margin: 0;
    padding:0;
    color: white;
  }
  span{
    padding-right: 10px;
    letter-spacing: 1px;
  }
`