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