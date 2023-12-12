import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { receivedProducts } from "../../store/product/productSlice";
import { fetchProducts } from "../../store/product/thunk";
import styles from "./Products.module.css";
import ProductCard from "../../components/e-commerce/productCard/ProductCard";
import GridList from "../../components/Layout/GridList/GridList";
import { ProductType } from "../../store/product/productTypes";

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

  // const renderData = (product: ProductType) => {
  //   return <ProductCard key={product.id} product={product} />;
  // };

  return (
    <main className="page">
      <ul className={styles.products}>
        <h1>All Products</h1>
        <GridList
          data={products}
          loading={productFetchState}
          error={errorMsg}
          renderFunction={(product: ProductType, index: number) => (
            <ProductCard key={`${product.id}_${index}`} product={product} />
          )}
        />
      </ul>
    </main>
  );
}
