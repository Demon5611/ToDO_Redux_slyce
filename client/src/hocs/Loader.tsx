import { Box } from '@mui/material';
import React from 'react';
import { Rings } from 'react-loader-spinner';

type LoaderProps = {
  children: React.ReactElement;
  isLoading: boolean;
};

export default function Loader({ children, isLoading }: LoaderProps): JSX.Element {
  if (isLoading)
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Rings
          height="100"
          width="100"
          color="#4fa94d"
          radius="16"
          wrapperStyle={{}}
          wrapperClass=""
          visible
          ariaLabel="rings-loading"
        />
      </Box>
    );
  return children;
}
