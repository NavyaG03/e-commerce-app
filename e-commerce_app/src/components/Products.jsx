import styled from "styled-components";
import { useState, useEffect } from "react";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export default function Products({ cat, filters, sort }) {
  const [Products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/product?category=${cat}`
            : "http://localhost:5000/api/product",
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setfilteredProducts(
        Products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key]?.includes(value);
          }),
        ),
      );
  }, [Products, cat, filters]);

  useEffect(() => {
    if (sort === "asc") {
      setSortedProducts(
        [...filteredProducts].sort((a, b) => a.price - b.price),
      );
    } else if (sort === "desc") {
      setSortedProducts(
        [...filteredProducts].sort((a, b) => b.price - a.price),
      );
    } else {
      setSortedProducts(
        [...filteredProducts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      );
    }
  }, [filteredProducts, sort]);

  return (
    <Container>
      {cat
        ? sortedProducts.map((item) => <Product key={item._id} item={item} />)
        : Products.map((item) => <Product key={item._id} item={item} />)}
    </Container>
  );
}
