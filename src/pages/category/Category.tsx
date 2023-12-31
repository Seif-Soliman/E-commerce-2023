import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
// import { recievedCategory } from "../../store/category/categorySlice";
import { fetchCategories } from "../../store/category/thunk";
import styles from "./Category.module.css";
import CartegoryCard from "../../components/e-commerce/categoryCard/CartegoryCard";
import { CategoryType } from "../../store/category/categoryTypes";
import GridList from "../../components/Layout/GridList/GridList";

const Category = () => {
  const categories = useAppSelector((state) => state.category.category);
  const dispatch = useAppDispatch();

  const categoryFetchState = useAppSelector((state) => state.category.loading);
  const errorMsg = useAppSelector((state) => state.category.errorMsg);

  useEffect(() => {
    dispatch(fetchCategories());
    // .then((action) => {
    //   if (fetchCategories.fulfilled.match(action)) {
    //     dispatch(recievedCategory(action.payload));
    //   }
    // });
  }, [dispatch]);

  const renderData = (category: CategoryType) => {
    return <CartegoryCard key={category.id} category={category} />;
  };

  return (
    <main className="page">
      <ul className={styles.products}>
        <h1>Categories</h1>
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
