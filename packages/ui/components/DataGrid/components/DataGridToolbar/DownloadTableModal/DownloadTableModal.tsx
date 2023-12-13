import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

import {
  Box,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  theme,
  Typography
} from '@bilflo.ui/ui-component-library';
import { useStyle } from './useStyle';

import PrimaryTableModal from '../PrimaryTableModal';
import { useDataGridContext } from '../../../DataGrid';

const DownloadTableModal = ({
  openModal,
  handleClose,
  formatTypes,
  properties
}: any) => {
  const {
    mainContent,
    fileFormatText,
    propertyFormateText,
    propertyFormateValue,
    formateOptions,
    buttonPadding,
    selectDropBox,
    selectBox
  } = useStyle();
  const { dataGridRef: apiRef } = useDataGridContext();
  const [formate, setFormate] = useState<any>(formatTypes[0]);
  const [selectedProperty, setSelectedProperty] = useState<any>(properties[0]);

  const exportBlob = (blob: any, filename: any) => {
    // Save the blob in a file
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    });
  };

  function convertToCSV(objArray: any, getAllColumns: any) {
    const array =
      typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;

    let csv = '';

    for (let i = 0; i < array.length; i++) {
      const row = array[i];
      const keys = Object.keys(row).filter((item) =>
        getAllColumns.includes(item)
      );

      if (i === 0) {
        csv += keys.join(',') + '\n';
      }
      const values = keys.map((key) =>
        typeof row[key] === 'object' ? row[key]?.value : `"${row[key]}"`
      );

      csv += values.join(',') + '\n';
    }

    return csv;
  }

  const DownloadButtonHandler = () => {
    let data: any = apiRef?.current.getDataAsCsv(); // setting up all data with applying  filter

    if (selectedProperty === 'All properties on records') {
      // setting up all data without applying any filter
      const getAllColumns = apiRef?.current
        ?.getAllColumns()
        .map((item) => item.field);

      const allrows = apiRef?.current
        ?.getAllRowIds()
        ?.map((item) => apiRef?.current?.getRow(item));
      data = convertToCSV(allrows, getAllColumns);
    }

    if (formate === 'XLSX') {
      const blob = new Blob([data], {
        type: 'application/vnd.ms-excel'
      });
      exportBlob(blob, `export_data.${formate.toLowerCase()}`);
    } else {
      if (selectedProperty === 'All properties on records') {
        const blob = new Blob([data], {
          type: 'text/csv'
        });
        exportBlob(blob, `export_data.${formate.toLowerCase()}`);
      } else {
        apiRef?.current.exportDataAsCsv({ fileName: 'export_data' });
      }
    }
    handleClose();
  };

  const handleChange = (event: SelectChangeEvent) => {
    setFormate(event.target.value);
  };

  const handlePropertyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedProperty((event.target as HTMLInputElement).value);
  };

  return (
    <PrimaryTableModal
      headerText="Download Table"
      buttonText="Download"
      openModal={openModal}
      handleClose={handleClose}
      actionButtonHandler={DownloadButtonHandler}
      buttonPadding={buttonPadding}
    >
      <Stack direction="column" sx={mainContent}>
        <Box>
          <Typography sx={fileFormatText}>File Format</Typography>
        </Box>
        <Box>
          <Select
            value={formate}
            onChange={handleChange}
            displayEmpty
            fullWidth
            sx={selectBox}
            MenuProps={{
              sx: selectDropBox
            }}
            IconComponent={({ className }: any) => {
              return (
                <Icon
                  icon={faChevronDown}
                  className={className}
                  style={{
                    position: 'absolute',
                    right: '15px',
                    color: theme.palette.primary.main
                  }}
                />
              );
            }}
          >
            <MenuItem value={formate}>
              <Typography sx={formateOptions}>{formate}</Typography>
            </MenuItem>
            {formatTypes.map(
              (item: any, index: any) =>
                formate !== item && (
                  <MenuItem key={formate} value={item}>
                    <Typography sx={formateOptions}>{item}</Typography>
                  </MenuItem>
                )
            )}
          </Select>
        </Box>
        <Box>
          <Typography sx={propertyFormateText}>
            Properties you’d like to export
          </Typography>
        </Box>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={selectedProperty}
          name="radio-buttons-group"
          onChange={handlePropertyChange}
        >
          {properties.map((property: any) => (
            <Radio
              key={property}
              value={property}
              label={property}
              sx={propertyFormateValue}
            />
          ))}
        </RadioGroup>
      </Stack>
    </PrimaryTableModal>
  );
};

export default DownloadTableModal;
