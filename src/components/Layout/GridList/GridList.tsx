import { Loading } from "../../Loading/Loading";

type props<T> = {
  loading: boolean;
  error: string | null;
  renderData?: React.ReactElement[];
  children?: React.ReactElement;
  data: T[];
  renderFunction?: (record: T, index: number) => React.ReactElement | null;
};

const GridList = <T,>({ renderFunction, data, loading, error }: props<T>) => {
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
