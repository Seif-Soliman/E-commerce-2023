import styles from "./FilteredProducts.module.css";
import { useAppSelector } from "../../store/hooks";
import { ProductType } from "../../store/product/productTypes";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import GridList from "../../components/Layout/GridList/GridList";
import { CategoryType } from "../../store/category/categoryTypes";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";

export function FilteredProducts() {
  const items = useAppSelector((state) => state.filterproduct.products);
  const productFetchState = useAppSelector(
    (state) => state.filterproduct.loading
  );
  const errorMsg = useAppSelector((state) => state.filterproduct.errorMsg);

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

  return (
    <main className="page">
      <ul className={styles.products}>
        <GridList
          data={Object.values(items)}
          renderFunction={renderData}
          loading={productFetchState}
          error={errorMsg}
        />
      </ul>
    </main>
  );
}
