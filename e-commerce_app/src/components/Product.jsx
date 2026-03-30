import styled from "styled-components";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Info = styled.div`
  opacity: 0;
  width: 240px;
  height: 300px;
  background-color: rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  transition: all 0.5s ease;
  cursor: pointer;
  position: absolute;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5fbfd;
  position: relative;
  overflow: hidden;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  width: 200px;
  height: 260px;
  object-fit: cover;
  z-index: 2;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
export default function Product({ item }) {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
          <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
}
