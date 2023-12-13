import { SxProps } from '@mui/material';
import { ReactNode } from 'react';

export interface DataGridToolbar {
  localStorageKey: string;
  children?: ReactNode;
  sx?: SxProps;
}
