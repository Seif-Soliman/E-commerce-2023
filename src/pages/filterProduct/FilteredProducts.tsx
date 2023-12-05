import styles from "./FilteredProducts.module.css";
import { useAppSelector } from "../../store/hooks";
import { ProductType } from "../../store/product/productTypes";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import GridList from "../../components/Layout/GridList/GridList";

export function FilteredProducts() {
  const items = useAppSelector((state) => state.filterproduct.products);
  const productFetchState = useAppSelector(
    (state) => state.filterproduct.loading
  );
  const errorMsg = useAppSelector((state) => state.filterproduct.errorMsg);

  const renderData = (product: ProductType) => {
    return <ProductCard key={product.id} product={product} />;
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
