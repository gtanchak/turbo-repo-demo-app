import React, { useEffect, useState } from 'react';
import {
  Box,
  DataGrid as DataGridUi,
  LoadingComponent,
  NoRowFoundComponent,
  ResizeIcon,
  SortedAscendingIcon,
  SortedDescendingIcon,
  UnsortedIcon
} from '@bilflo.ui/ui-component-library';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import { GridApiPro } from '@mui/x-data-grid-pro/models/gridApiPro';
import { useGridApiRef } from '@mui/x-data-grid-pro';
import { CommanDataGridPropsType, DataGridContextType } from './types';
import useDataGrid from './useDataGrid';
import useStyle, { TableContainer } from './useStyle';
import DataGridHeader from './components/DataGridHeader/DataGridHeader';
import TableCard from '../TableCard/TableCard';

const DataGridContext = React.createContext({} as DataGridContextType);

export function useDataGridContext() {
  const context = React.useContext(DataGridContext);
  if (!context) {
    throw new Error(
      `Datagrid compound components cannot be rendered outside the Datagrid component`
    );
  }
  return context;
}

const DataGrid = (props: CommanDataGridPropsType) => {
  const [dataGridRef, setDataGridRef] = useState<
    React.MutableRefObject<GridApiPro> | undefined
  >(undefined);

  return (
    <DataGridContext.Provider value={{ dataGridRef, setDataGridRef }}>
      <DataGridModule {...props} />
    </DataGridContext.Provider>
  );
};

export default DataGrid;

const DataGridModule = (props: CommanDataGridPropsType) => {
  const {
    components,
    headerHeight,
    rowHeight,
    componentsProps,
    getDataGridApiRef,
    HeaderActionMenu,
    disableQuickSearchFilter,
    disableTableActionMenu,
    sx,
    columnVisibilityModel,
    ...rest
  } = props;

  const apiRef = useGridApiRef();
  const { setDataGridRef } = useDataGridContext();

  useEffect(() => {
    setDataGridRef(apiRef);
    if (getDataGridApiRef) {
      getDataGridApiRef(apiRef);
    }
  }, [apiRef, getDataGridApiRef, setDataGridRef]);

  const { dataGridCustomization } = useStyle(sx, rowHeight);
  const a = useDataGrid({
    getDataGridApiRef,
    localStorageKey: rest.localStorageKey,
    columnVisibilityModel: columnVisibilityModel
  });

  return (
    <TableCard>
      <Box className={TableContainer}>
        <DataGridHeader
          localStorageKey={rest.localStorageKey}
          disableTableActionMenu={disableTableActionMenu}
          HeaderActionMenu={HeaderActionMenu}
          disableQuickSearchFilter={disableQuickSearchFilter}
        />
        <DataGridUi
          apiRef={apiRef}
          sx={dataGridCustomization}
          disableColumnFilter
          disableColumnMenu
          headerHeight={headerHeight || 48}
          rowHeight={rowHeight || 48}
          // checkboxSelection
          // pagination
          // checkboxSelectionVisibleOnly
          // disableSelectionOnClick
          // disableColumnReorder
          // rowsPerPageOptions={[25, 50, 100, 200]}
          // experimentalFeatures={{
          //   rowPinning: true
          // }}
          components={{
            Toolbar: () => <></>,
            ColumnResizeIcon: () => <ResizeIcon />,
            ColumnSortedAscendingIcon: () => <SortedAscendingIcon />,
            ColumnSortedDescendingIcon: () => <SortedDescendingIcon />,
            ColumnUnsortedIcon: () => <UnsortedIcon />,
            LoadingOverlay: () => <LoadingComponent />,
            NoRowsOverlay: () => <NoRowFoundComponent />,
            ...components
          }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true
            },
            pagination: {
              labelDisplayedRows: ({ from, to, count, page }: any) => {
                return `Showing ${from}–${to} of ${count}`;
              },
              SelectProps: {
                IconComponent: (props: any) => (
                  <FontAwesomeIcon icon={faChevronDown} {...props} />
                ),
                MenuProps: {
                  anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'left'
                  },
                  transformOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                  },
                  sx: {
                    '& .MuiPaper-root': {
                      borderRadius: '8px',
                      boxShadow: '0px 8px 24px rgba(35, 47, 51, 0.16)'
                    }
                  }
                }
              }
            },
            ...componentsProps
          }}
          {...rest}
        />
      </Box>
    </TableCard>
  );
};
