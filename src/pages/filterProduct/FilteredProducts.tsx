import { useAppSelector } from "../../store/hooks";
import { ProductType } from "../../store/product/productTypes";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import GridList from "../../components/Layout/GridList/GridList";
import { CategoryType } from "../../store/category/categoryTypes";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";
import { Col, Container, Row } from "react-bootstrap";

export function FilteredProducts() {
  const items = useAppSelector((state) => state.product.products);
  const productFetchState = useAppSelector((state) => state.product.loading);
  const errorMsg = useAppSelector((state) => state.product.errorMsg);

  const renderData = (record: CategoryType | ProductType, index: number) => {
    if ("prefix" in record) {
      return (
        <Col xs={12} sm={6} md={4} lg={3} key={record.id}>
          <CartegoryCard {...(record as CategoryType)} />
        </Col>
      );
    } else {
      return (
        <Col xs={12} sm={6} md={4} lg={3} key={`${record.id}_${index}`}>
          <ProductCard {...(record as ProductType)} />
        </Col>
      );
    }
  };

  return (
    <main className="page">
      <Container>
        <Row>
          <GridList
            data={Object.values(items)}
            renderFunction={renderData}
            loading={productFetchState}
            error={errorMsg}
          />
        </Row>
      </Container>
    </main>
  );
}
