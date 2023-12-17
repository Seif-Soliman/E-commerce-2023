import { FC } from "react";
import { CategoryType } from "../../../store/category/categoryTypes";
import { ProductType } from "../../../store/product/productTypes";
import { Loading } from "../../Loading/Loading";

type GridListProps = {
  loading: boolean;
  error: string | null;
  // renderData?: React.ReactElement[];
  renderData?: (props: CategoryType | ProductType) => React.ReactNode;
  children?: React.ReactNode;
  data: (CategoryType | ProductType)[];
  renderFunction?: (
    record: CategoryType | ProductType,
    index: number
  ) => React.JSX.Element;
};

const GridList: FC<GridListProps> = ({
  renderFunction,
  data,
  loading,
  error,
}) => {
  const cloneElement = data
    .map((record, index) => {
      if (renderFunction) {
        return renderFunction(record, index);
      }
      return null;
    })
    .filter((element) => element !== null);

  return (
    <Loading loading={loading} error={error}>
      {cloneElement}
    </Loading>
  );
};

export default GridList;
