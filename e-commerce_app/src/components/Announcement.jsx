import styled from "styled-components"

const Container=styled.div`
height: 30px;
background-color: teal;
color: white;
font-size: 14px;
font-weight: 500;
display: flex;
align-items: center;
justify-content: center;
`
export default function Announcement() {
  return (
    <Container>
      Super Deal! Free shipping on orders above $500
    </Container>
  )
}
