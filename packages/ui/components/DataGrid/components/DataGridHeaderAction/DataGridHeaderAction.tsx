import { Stack } from '@bilflo.ui/ui-component-library';
import { SxProps } from '@mui/material';
import React from 'react';

export interface DataGridHeaderActionPropsType {
  children?: React.ReactNode;
  sx?: SxProps;
  key: 'DataGridHeaderAction';
}
const DataGridHeaderAction: React.FC<DataGridHeaderActionPropsType> = ({
  children,
  sx
}) => {
  return (
    <Stack
      flexDirection="row"
      sx={{
        position: 'absolute',
        background: '#F7F8F9',
        left: '-5px',
        zIndex: 99999999,
        pl: '10px',
        ...sx
      }}
    >
      {children}
    </Stack>
  );
};

export default DataGridHeaderAction;
