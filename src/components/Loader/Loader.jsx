import { Grid } from 'react-loader-spinner';
import { LoaderWrap } from './Loader.styled';

export const Loader = () => {
  return (
    <LoaderWrap>
      <Grid
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrap>
  );
};
