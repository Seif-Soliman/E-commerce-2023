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

  const handleClick = (productId: string, max_quantity: number) => {
    dispatch(removeFromCart(parseInt(productId)));
    dispatch(
      updateQuantityFilterProduct({
        id: parseInt(productId),
        quantity: max_quantity,
      })
    );
  };

  function onQuantityChanged(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) {
    const quantity = Number(e.target.value) || 0;
    dispatch(updateQuantity({ quantity, id }));
    dispatch(updateQuantityFilterProduct({ id, quantity }));
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
          {Object.entries(items).map(([id, quantity]: [string, number]) => {
            const productId = parseInt(id); // Parse the ID string to a number
            const product = products.find((prod) => prod.id === productId); // Find the product by ID

            return (
              <tr key={id}>
                <td>{product?.title}</td>
                <td>
                  <select
                    className={styles.input}
                    value={quantity}
                    onChange={(e) => onQuantityChanged(e, productId)} // Convert the ID back to string for compatibility
                  >
                    {[...Array(product?.max_quantity || 0)].map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </td>
                <td>${product?.price}</td>
                <td>
                  <button
                    aria-label={`Remove ${product?.title} from Shopping Cart`}
                    onClick={() =>
                      handleClick(
                        productId.toString(),
                        product?.max_quantity || 0
                      )
                    }
                  >
                    X
                  </button>
                </td>
              </tr>
            );
          })}
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
