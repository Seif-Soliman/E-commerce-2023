import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { fetchCategories } from "../../store/category/thunk";
import styles from "./Category.module.css";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";
import { CategoryType } from "../../store/category/categoryTypes";
import GridList from "../../components/Layout/GridList/GridList";
import { ProductType } from "../../store/product/productTypes";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";

const Category = () => {
  const categories = useAppSelector((state) => state.category.category);
  const dispatch = useAppDispatch();

  const categoryFetchState = useAppSelector((state) => state.category.loading);
  const errorMsg = useAppSelector((state) => state.category.errorMsg);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const renderData = (record: CategoryType | ProductType) => {
    if ("prefix" in record) {
      return <CartegoryCard key={record.id} {...(record as CategoryType)} />;
    } else {
      return (
        <ProductCard
          key={(record as ProductType).id}
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
        <h1>{t("Categories")}</h1>
        <GridList
          loading={categoryFetchState}
          error={errorMsg}
          data={Object.values(categories)}
          renderFunction={renderData}
        />
      </ul>
    </main>
  );
};

export default Category;
