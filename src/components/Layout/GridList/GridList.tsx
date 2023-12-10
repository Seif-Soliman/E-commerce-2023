import { Loading } from "../../Loading/Loading";

type props<T> = {
  loading: boolean;
  error: string | null;
  renderData?: JSX.Element[];
  children?: JSX.Element;
  data: T[];
  renderFunction?: (record: T) => JSX.Element | null;
};

const GridList = <T,>({ renderFunction, data, loading, error }: props<T>) => {
  const cloneElement = Object.values(data).map((record) => {
    if (renderFunction) {
      return renderFunction(record);
    }
  });

  return (
    <Loading loading={loading} error={error}>
      {cloneElement}
    </Loading>
  );
};

export default GridList;
