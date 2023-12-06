import { Loading } from "../../hoc/Loading";

type props<T> = {
  loading: boolean;
  error: string | null;
  renderData?: JSX.Element[];
  children?: JSX.Element;
  data: T[];
  renderFunction?: (record: T) => JSX.Element;
};

const GridList = <T,>({ renderFunction, data, loading, error }: props<T>) => {
  const cloneElement = Object.values(data).map((record, index) => {
    if (renderFunction) {
      // Use the index as the key prop
      return <div key={index}>{renderFunction(record)}</div>;
    }
  });

  return (
    <Loading loading={loading} error={error}>
      {cloneElement}
    </Loading>
  );
};

export default GridList;
