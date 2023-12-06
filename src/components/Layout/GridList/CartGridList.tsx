import React from "react";
import { Loading } from "../../hoc/Loading";

type props<T> = {
  loading: boolean;
  error: string | null;
  renderData?: JSX.Element[];
  children?: JSX.Element;
  data: { [id: string]: T };
  renderFunction?: (record: [string, T]) => JSX.Element;
};

const CartGridList = <T,>({
  renderFunction,
  data,
  loading,
  error,
}: props<T>) => {
  const cloneElement = Object.entries(data).map((record) => {
    if (renderFunction) {
      // Add a key prop to the element returned by renderFunction
      return React.cloneElement(renderFunction(record), { key: record[0] });
    }
  });

  return (
    <Loading loading={loading} error={error}>
      {cloneElement}
    </Loading>
  );
};

export default CartGridList;
