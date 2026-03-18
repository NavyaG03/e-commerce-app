import {
  Facebook,
  Instagram,
  Twitter,
  Pinterest,
  Room,
  Phone,
  MailOutline,
} from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
display: flex;
${mobile({flexDirection:"column"})}`
const Left = styled.div`
  flex: 1;
  display: flex;
  padding: 20px;
  flex-direction: column;
`;
const Logo = styled.h1`
/* font-weight: bold; */
/* font-size: 16px; */
`

const Desc = styled.p`
  margin: 20px 0px;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({display:"none"})}
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({backgroundColor:"#fff8f8"})}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.div`
  width: 50%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  gap: 15px;
   /* flex-wrap: wrap; */
`;
const PaymentImg = styled.img`
  height: 30px;
  object-fit: contain;
`;

const paymentMethods = [
  {
    name: "Mastercard",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png",
  },
  {
    name: "PayPal",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png",
  },
  {
    name: "American Express",
    src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/200px-American_Express_logo_%282018%29.svg.png",
  },
];

export default function Footer() {
  return (
    <Container>
      <Left>
        <Logo>MickeyMouse.</Logo>
        <Desc>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi
          aperiam ea obcaecati, neque dicta illo vero iusto minus! Mollitia
          earum aperiam fuga similique temporibus itaque voluptatem consectetur
          culpa sequi eaque.
        </Desc>
        <SocialContainer>
          <SocialIcon color="#3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="#E44054">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="#55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="#E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/>
          9104,Meera Bhawan,BITS Pilani
        </ContactItem>
        <ContactItem >
          <Phone style={{marginRight:"10px"}} />
          +91 9415427721
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} />
          navyalmgc@gmail.com
        </ContactItem>
      <Payment>
        {paymentMethods.map((method) => (
          <PaymentImg key={method.name} src={method.src} alt={method.name} />
        ))}
      </Payment>
      </Right>
    </Container>
  );
}
