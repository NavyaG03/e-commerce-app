import { Search, ShoppingCartOutlined } from '@mui/icons-material'
import Badge from '@mui/material/Badge'
import styled from 'styled-components'
import {mobile} from "../responsive"

const Container = styled.div`
    height: 60px;
    ${mobile({height:"50px"})}
`
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({padding:"10px 0"})}
`
const Left = styled.div`
    flex:1;
    display:flex;
    align-items: center;
`
const Langauge = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({display:"none"})}
`
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({margin:"0 10px"})}
`
const Input = styled.input`
    border: none;
    ${mobile({width:"50px"})}
`
const Centre = styled.div`
flex:1;
text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({fontSize:"24px"})}
`
const Right = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
flex:1;
${mobile({flex:2,justifyContent:"center"})}
`

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({fontSize:"12px",marginLeft:"10px"})}
`
export default function Navbar() {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Langauge>EN</Langauge>
                    <SearchContainer>
                        <Input placeholder="Search" />
                        <Search style={{color:"gray",fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Centre>
                    <Logo>MickeyMouse.</Logo>
                </Centre>
                <Right>
                    <MenuItem>Register</MenuItem>
                    <MenuItem>Sign In</MenuItem>
                    <MenuItem>
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlined />
                        </Badge></MenuItem>
                </Right>
            </Wrapper>
        </Container>
    )
}
