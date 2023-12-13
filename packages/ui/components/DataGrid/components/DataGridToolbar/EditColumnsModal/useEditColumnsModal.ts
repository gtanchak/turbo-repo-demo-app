import { useEffect, useState } from 'react';
import { useDataGridContext } from '../../../DataGrid';

const useEditColumnsModal = (handleClose: any, localStorageKey: any) => {
  const [columns, setColumns] = useState<any[]>([]);
  const [searchField, setSearchField] = useState<string>('');
  const [allSelected, setAllSelected] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>({});
  const [filteredColumns, setFilteredColumns] = useState<any[]>([]);
  const selectedCount =
    selected &&
    Object.values(selected).length &&
    Object.values(selected).filter(Boolean).length;

  const { dataGridRef: apiRef } = useDataGridContext();
  let dragDisabledCount = 0;
  columns &&
    columns?.forEach((item: any) => item?.dragDisabled && dragDisabledCount++);

  const isAllSelected = selectedCount === columns?.length - dragDisabledCount;

  const isIndeterminate =
    selectedCount && selectedCount !== columns?.length - dragDisabledCount;

  const hideColumn = JSON.parse(
    localStorage.getItem(`${localStorageKey}-hide-column`)!
  );

  useEffect(() => {
    let editColumnData: any = apiRef?.current.getAllColumns();
    if (
      editColumnData &&
      editColumnData?.length &&
      editColumnData?.[0].field === '__check__'
    )
      editColumnData.splice(0, 1);

    const finalHiddenColumn = {
      ...hideColumn,
      ...apiRef?.current?.state?.columns.columnVisibilityModel
    };
    editColumnData = editColumnData.map((column: any, index: number) => {
      return {
        ...column,
        id: index,
        field: column.field,
        dragDisabled: column.dragDisabled ? true : false,
        isChecked: finalHiddenColumn[column.field] === false ? false : true
      };
    });
    let selecteddata = {};
    const visibleColumnName = apiRef?.current
      .getVisibleColumns()
      .map((item) => item.field);

    apiRef?.current
      .getAllColumns()
      .map((item) => item.field)
      .forEach((item, index) => {
        if (visibleColumnName?.includes(item)) {
          selecteddata = { ...selecteddata, [item]: true };
        } else {
          selecteddata = { ...selecteddata, [item]: false };
        }
      });

    setColumns(editColumnData);
    setSelected(selecteddata);
  }, [apiRef?.current.state]);

  const toggleAllSelected = (e: any) => {
    const { checked } = e.target;
    setAllSelected(checked);
    if (columns) {
      setSelected(
        columns.reduce((selected: any, { id, field, dragDisabled }: any) => {
          if (!dragDisabled) {
            return {
              ...selected,
              [field]: checked
            };
          } else {
            return {
              ...selected,
              [field]: checked
            };
          }
        }, {})
      );
      setColumns(
        columns.map((column: any) => {
          if (
            apiRef?.current?.state?.pinnedColumns?.left?.includes(column.field)
          ) {
            return column;
          }
          return { ...column, isChecked: checked };
        })
      );
    }
  };

  useEffect(() => {
    const updatedFilteredColumns = columns.filter(
      (col) =>
        col.field !== '__check__' &&
        col.field.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredColumns(updatedFilteredColumns);
  }, [columns, searchField]);

  const toggleSelected = (field: any) => (e: any) => {
    const { checked } = e.target;

    if (!e.target.checked) {
      setAllSelected(false);
    }

    setSelected((selected: any) => ({
      ...selected,
      [field]: checked
    }));

    setColumns(
      columns.map((column: any) => {
        if (column.field === field) {
          return { ...column, isChecked: checked };
        } else {
          return { ...column };
        }
      })
    );
  };

  const onSearch = (e: any) => {
    setSearchField(e.target.value);
  };

  const saveButtonHandler = () => {
    let columnVisibilityModel: any = {};
    const reOrderColumn = columns.filter((column: any) => column.isChecked);

    columns.map((column: any) => {
      if (!column.isChecked && !column.dragDisabled) {
        columnVisibilityModel = {
          ...columnVisibilityModel,
          [column.field]: false
        };
      } else {
        columnVisibilityModel = {
          ...columnVisibilityModel,
          [column.field]: true
        };
      }
    });

    localStorage.setItem(
      `${localStorageKey}-hide-column`,
      JSON.stringify(columnVisibilityModel)
    );

    localStorage.setItem(
      `${localStorageKey}-reorder-column`,
      JSON.stringify([reOrderColumn.map((item) => item.field)].flat())
    );

    reOrderColumn.forEach((column: any, index: number) => {
      apiRef?.current.setColumnIndex(
        column.field,
        index + (dragDisabledCount + 1)
      );
    });
    apiRef?.current.updateColumns(
      apiRef?.current.getAllColumns().map((item) => {
        if (
          Object.prototype.hasOwnProperty.call(
            columnVisibilityModel,
            item.field
          )
        ) {
          return {
            ...item,
            hide: !columnVisibilityModel[item.field]
          };
        }
        return {
          ...item,
          hide: !columnVisibilityModel[item.field]
        };
      })
    );
    setSearchField('');
    handleClose();
  };

  return {
    saveButtonHandler,
    onSearch,
    searchField,
    allSelected,
    isAllSelected,
    toggleAllSelected,
    isIndeterminate,
    filteredColumns,
    selected,
    toggleSelected,
    selectedCount,
    columns,
    setColumns,
    setSelected,
    setAllSelected
  };
};

export default useEditColumnsModal;
