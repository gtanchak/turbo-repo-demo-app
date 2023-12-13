import { BilfloSearchField, Box } from '@bilflo.ui/ui-component-library';
import { DataGridHeaderType } from './types';
import DataGridToolbar from '../DataGridToolbar';
import { useDataGridContext } from '../../DataGrid';

const DataGridHeader = ({
  localStorageKey,
  HeaderActionMenu,
  disableTableActionMenu,
  disableQuickSearchFilter
}: DataGridHeaderType) => {
  const { dataGridRef } = useDataGridContext();
  const handelSearch = (event: any) => {
    dataGridRef?.current?.setQuickFilterValues([event.target.value]);
  };
  return (
    <div className="flex flex-col md:flex-row justify-between items-enter pb-4 w-full">
      {!disableQuickSearchFilter && (
        <BilfloSearchField
          className={'!w-full md:!w-[270px]'}
          placeholder="Search name, assignment, & more"
          onChange={handelSearch}
        />
      )}
      <Box sx={{ width: '100%', flex: 1 }}>{HeaderActionMenu}</Box>
      {!disableTableActionMenu && (
        <DataGridToolbar localStorageKey={localStorageKey} />
      )}
    </div>
  );
};

export default DataGridHeader;
