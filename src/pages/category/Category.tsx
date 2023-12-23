/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchCategories } from "../../store/category/thunk";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";
import { CategoryType } from "../../store/category/categoryTypes";
import GridList from "../../components/Layout/GridList/GridList";
import { ProductType } from "../../store/product/productTypes";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import i18n from "../../locales/i18n";
import { useTranslation } from "react-i18next";
import { Col, Container, Row } from "react-bootstrap";

const Category = () => {
  const categories = useAppSelector((state) => state.category.category);
  const dispatch = useAppDispatch();

  const categoryFetchState = useAppSelector((state) => state.category.loading);
  const errorMsg = useAppSelector((state) => state.category.errorMsg);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
    <main className="page">
      <Container>
        <h1>{t("Categories")}</h1>
        <Row>
          <GridList
            loading={categoryFetchState}
            error={errorMsg}
            data={Object.values(categories)}
            renderFunction={renderData}
          />
        </Row>
      </Container>
    </main>
  );
};

export default Category;
