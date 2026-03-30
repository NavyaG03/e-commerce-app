import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../redux/cartRedux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({padding:"10px"})}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" ? "none" : "1px solid black"};
  background-color: ${(props) => props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" ? "white" : "black"};

  &:hover {
    background-color: ${(props) => props.type === "filled" ? "#333" : "#f5f5f5"};
  }
`;

const TopTexts = styled.div`
${mobile({display:"none"})}`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({flexDirection:"column"})}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColour = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.colour};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({marginBottom:"20px"})}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 20px 0;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" ? "500" : "300"};
  font-size: ${(props) => props.type === "total" ? "24px" : "16px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: #333;
  }
`;

export default function Cart() {
  const cart=useSelector(state=>state.cart)
  const dispatch=useDispatch()
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag (2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product, index) => (
              <>
                <Product key={product._id}>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductColour colour={product.colour} />
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Remove style={{cursor:"pointer"}} onClick={()=>dispatch(decrementQuantity(product._id))} />
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <Add style={{cursor:"pointer"}} onClick={()=>dispatch(incrementQuantity(product._id))} />
                    </ProductAmountContainer>
                    <ProductPrice>₹ {product.price*product.quantity}</ProductPrice>
                  </PriceDetail>
                </Product>
                {index < cart.products.length - 1 && <Hr />}
              </>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 49</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>- ₹ 49</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
}
