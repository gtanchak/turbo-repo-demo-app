import { Divider, MenuItem } from '@mui/material';
import {
  BilfloSearchField,
  Box,
  Checkbox,
  Typography
} from '@bilflo.ui/ui-component-library';
import { capitalizeFirstLetter, stringSeparator } from '@bilflo.ui/utils';
import Drag from './components/Drag/Drag';
import useEditColumnsModal from './useEditColumnsModal';
import { useStyle } from './useStyle';

import PrimaryTableModal from '../PrimaryTableModal';

const EditColumnsModal = ({ openModal, handleClose, localStorageKey }: any) => {
  const {
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
  } = useEditColumnsModal(handleClose, localStorageKey);

  const {
    mainContent,
    columnContent,
    columnSearchContent,
    columnSelectContent,
    dragColumnContent,
    modalDivider,
    checkboxLabel,
    buttonPadding
  } = useStyle();

  return (
    <PrimaryTableModal
      headerText="Edit Columns"
      buttonText="Save"
      openModal={openModal}
      handleClose={handleClose}
      actionButtonHandler={saveButtonHandler}
      buttonPadding={buttonPadding}
    >
      <Box sx={mainContent}>
        <Box sx={columnContent}>
          <Box sx={columnSearchContent}>
            <BilfloSearchField placeholder="Search" onChange={onSearch} />
          </Box>
          <Box sx={columnSelectContent}>
            {!searchField && (
              <MenuItem
                value="allSelect"
                sx={{
                  py: '8px !important',
                  '& .MuiCheckbox-indeterminate': {
                    width: '36px',
                    height: '36px'
                  }
                }}
              >
                <Checkbox
                  name="allSelect"
                  label="Select all"
                  sx={checkboxLabel}
                  checked={allSelected || isAllSelected}
                  onChange={toggleAllSelected}
                  indeterminate={!!isIndeterminate}
                />
              </MenuItem>
            )}
            {!searchField && <Divider />}
            {filteredColumns.map((column: any, index: number) => {
              if (!column.dragDisabled) {
                return (
                  <MenuItem key={index} value={column}>
                    <Checkbox
                      checked={column.isChecked}
                      onChange={toggleSelected(column.field)}
                      sx={checkboxLabel}
                      label={capitalizeFirstLetter(
                        stringSeparator(column.field)
                      )}
                      name={column.id}
                    />
                  </MenuItem>
                );
              }
            })}
          </Box>
        </Box>
        <Box>
          <Divider orientation="vertical" flexItem sx={modalDivider} />
        </Box>
        <Box>
          <Typography sx={dragColumnContent}>
            Selected Columns {`(${selectedCount})`}
          </Typography>
          <Box>
            <Drag
              columns={columns}
              selected={selected}
              setColumns={setColumns}
              setSelected={setSelected}
              setAllSelected={setAllSelected}
            />
          </Box>
        </Box>
      </Box>
    </PrimaryTableModal>
  );
};

export default EditColumnsModal;
