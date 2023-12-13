/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react';
import { useDataGridContext } from './DataGrid';

const useDataGrid = ({
  getDataGridApiRef,
  localStorageKey,
  columnVisibilityModel
}: any) => {
  const { dataGridRef } = useDataGridContext();
  const hideColumn = JSON.parse(
    localStorage.getItem(`${localStorageKey}-hide-column`)!
  );
  const reorderColumn = JSON.parse(
    localStorage.getItem(`${localStorageKey}-reorder-column`)!
  );

  useEffect(() => {
    dataGridRef?.current?.restoreState({
      columns: {
        orderedFields: reorderColumn || []
      }
    });
    dataGridRef?.current?.setColumnVisibilityModel({
      ...columnVisibilityModel,
      ...hideColumn
    });
  }, [dataGridRef, hideColumn, reorderColumn]);

  return { dataGridRef };
};
export default useDataGrid;
