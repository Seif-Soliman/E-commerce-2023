import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { receivedProducts } from "../../store/product/productSlice";
import { fetchProducts } from "../../store/product/thunk";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import GridList from "../../components/Layout/GridList/GridList";
import { ProductType } from "../../store/product/productTypes";
import { CategoryType } from "../../store/category/categoryTypes";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";

export function Products() {
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
        <Col // xs={12}
          // sm={6}
          // md={4}
          // lg={3}
          className="customWidth"
          key={record.id}
        >
          <CartegoryCard {...(record as CategoryType)} />
        </Col>
      );
    } else {
      return (
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={4}
          xl={3}
          className="customWidth"
          key={`${record.id}_${index}`}
        >
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
        <h1>{t("All Products")}</h1>
        <Row>
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
}
