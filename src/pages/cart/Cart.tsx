import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTotalPrice } from "../../store/cart/cartSlice";
import styles from "./Cart.module.css";
import CartCard from "../../components/e-commerce/cart/CartCard";
import { CartState } from "../../store/cart/initialState";
import { checkoutCart } from "../../store/cart/thunk";
import classNames from "classnames";
import CartGridList from "../../components/Layout/GridList/GridList";

export function Cart() {
  const products = useAppSelector((state) => state.product.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  const errorMsg = useAppSelector((state) => state.cart.errorMsg);

  const dispatch = useAppDispatch();
  console.log(products);
  console.log(items);

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
  }

  //classname to join different conditional classes for css
  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === "Error",
    [styles.checkoutLoading]: checkoutState === "Loading",
  });

  const renderData = (cart: CartState) => {
    return (
      <CartCard
        items={cart.items}
        products={products}
        // checkoutState={checkoutState}
        // errorMsg={errorMsg}
        totalPrice={totalPrice}
      />
    );
  };

  return (
    <main className="page">
      <h1>Cart</h1>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <CartGridList
          loading={false}
          error={null}
          data={Object.entries(items)}
          renderFunction={renderData}
        />
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${totalPrice}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form onSubmit={onCheckout}>
        {checkoutState === "Error" && errorMsg ? (
          <p className={styles.errorBox}>{errorMsg}</p>
        ) : null}
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
