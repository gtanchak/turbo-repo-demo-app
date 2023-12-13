import { DataGridProProps } from '@mui/x-data-grid-pro';
import { MutableRefObject, SetStateAction } from 'react';
import { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';

export interface CommanDataGridPropsType extends DataGridProProps {
  getDataGridApiRef?: (
    apiRef: React.MutableRefObject<GridApiPro> | undefined
  ) => void;
  disableQuickSearchFilter?: boolean;
  disableTableActionMenu?: boolean;
  HeaderActionMenu?: React.ReactNode;
  localStorageKey: string;
}
export interface DataGridContextType {
  dataGridRef?: React.MutableRefObject<GridApiPro> | undefined;
  setDataGridRef: React.Dispatch<
    SetStateAction<MutableRefObject<GridApiPro> | undefined>
  >;
}
