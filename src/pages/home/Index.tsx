import { Col, Container, Row } from "react-bootstrap";
import slides from "../../../../server/data.json";
import { Slider } from "./Slider";
import GridList from "../../components/Layout/GridList/GridList";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchProducts } from "../../store/product/thunk";
import { receivedProducts } from "../../store/product/productSlice";
import i18n from "../../locales/i18n";
import { ProductType } from "../../store/product/productTypes";
import { CategoryType } from "../../store/category/categoryTypes";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";

const Index = () => {
  const items = slides.items.map((item) => ({
    ...item,
    price: parseFloat(item.price),
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then((action) => {
      if (fetchProducts.fulfilled.match(action)) {
        dispatch(receivedProducts(action.payload));
      }
    });
  }, [dispatch]);

  const products = useAppSelector((state) => state.product.products);
  const productFetchState = useAppSelector((state) => state.product.loading);
  const errorMsg = useAppSelector((state) => state.product.errorMsg);

  const renderData = (record: CategoryType | ProductType, index: number) => {
    if ("prefix" in record) {
      return (
        <Col xs={12} sm={6} md={4} lg={3} key={record.id}>
          <CartegoryCard {...(record as CategoryType)} />
        </Col>
      );
    } else if (index % 5 === 0) {
      return (
        <Col xs={12} sm={6} md={4} lg={3} key={`${record.id}_${index}`}>
          <ProductCard {...(record as ProductType)} />
        </Col>
      );
    }
  };

  useEffect(() => {
    const currentLanguage = i18n.language;
    if (currentLanguage === "sa") {
      document.body.dir = "rtl";
    } else {
      document.body.dir = "ltr";
    }
  }, []);

  const { t } = useTranslation();

  return (
    <main
      className="page"
      style={{ minHeight: "100vh", backgroundColor: "#eee" }}
    >
      <Container>
        <Slider slides={items} />
        <h1>{t("Most Popular")}</h1>
        <Row xs={1} sm={2} md={3} lg={4}>
          <GridList
            data={products}
            loading={productFetchState}
            error={errorMsg}
            renderFunction={renderData}
          />
        </Row>
      </Container>
    </main>
  );
};

export default Index;
