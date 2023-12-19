import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { receivedProducts } from "../../store/product/productSlice";
import { fetchProducts } from "../../store/product/thunk";
import styles from "./Products.module.css";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import GridList from "../../components/Layout/GridList/GridList";
import { ProductType } from "../../store/product/productTypes";
import { CategoryType } from "../../store/category/categoryTypes";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

export function Products() {
  const products = useAppSelector((state) => state.product.products);
  const productFetchState = useAppSelector((state) => state.product.loading);
  const errorMsg = useAppSelector((state) => state.product.errorMsg);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts()).then((action) => {
      if (fetchProducts.fulfilled.match(action)) {
        dispatch(receivedProducts(action.payload));
      }
    });
  }, [dispatch]);

  const renderData = (record: CategoryType | ProductType, index: number) => {
    if ("prefix" in record) {
      return <CartegoryCard key={record.id} {...(record as CategoryType)} />;
    } else {
      return (
        <ProductCard
          key={`${record.id}_${index}`}
          {...(record as ProductType)}
        />
      );
    }
  };
  useEffect(() => {
    i18n.changeLanguage("en");
  }, []);

  const { t } = useTranslation();
  return (
    <main className="page">
      <ul className={styles.products}>
        <h1>{t("All Products")}</h1>
        <GridList
          data={products}
          loading={productFetchState}
          error={errorMsg}
          renderFunction={renderData}
        />
      </ul>
    </main>
  );
}
