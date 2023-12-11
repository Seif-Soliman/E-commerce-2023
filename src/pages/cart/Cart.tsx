import React from "react";
import classNames from "classnames";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  getTotalPrice,
  removeFromCart,
  updateQuantity,
} from "../../store/cart/cartSlice";
import { checkoutCart } from "../../store/cart/thunk";
import styles from "./Cart.module.css";
import { updateQuantityFilterProduct } from "../../store/filteredProduct/filterProductSlice";

export function Cart() {
  const dispatch = useAppDispatch();

  const products = useAppSelector((state) => state.product.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  const errorMsg = useAppSelector((state) => state.cart.errorMsg);

  const handleClick = (productId: string, quantity: number) => {
    dispatch(removeFromCart(productId));
    dispatch(
      updateQuantityFilterProduct({ id: productId, quantity: quantity })
    );
  };

  function onQuantityChanged(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ quantity, id }));
  }

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

  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={tableClasses}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(items).map(
            (
              [id, quantity]: [id: string, quantity: number] //obj.entry split entry into array of arrays
            ) => (
              <tr key={id}>
                <td>{products[id].title}</td>
                <td>
                  <select
                    className={styles.input}
                    value={quantity}
                    onChange={(e) => onQuantityChanged(e, id)}
                  >
                    {[...Array(products[id].max_quantity)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${products[id].price}</td>
                <td>
                  <button
                    aria-label={`Remove ${products[id].title} from Shopping Cart`}
                    onClick={() => handleClick(id, quantity)}
                  >
                    X
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
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
