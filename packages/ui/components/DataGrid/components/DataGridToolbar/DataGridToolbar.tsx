import {
  Box,
  Button,
  Icon,
  Menu,
  MenuItem,
  Stack,
  theme,
  Typography
} from '@bilflo.ui/ui-component-library';
import {
  faArrowDownToLine,
  faColumns
} from '@fortawesome/pro-regular-svg-icons';
import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import DownloadTableModal from './DownloadTableModal';
import EditColumnsModal from './EditColumnsModal';
import { DataGridToolbar } from './types';
import useStyle from './useStyle';
import { useDataGridContext } from '../../DataGrid';

const DataGridToolbar: React.FC<DataGridToolbar> = ({
  children,
  sx,
  localStorageKey = 'test'
}) => {
  const tableActionsData: any = [
    {
      name: 'Edit Columns',
      icon: (
        <Icon
          icon={faColumns}
          style={{
            color: theme.palette.primary.main,
            marginRight: '15px',
            marginLeft: '2px'
          }}
        />
      ),
      component: (openModal: any, handleClose: any) => (
        <EditColumnsModal
          openModal={openModal}
          handleClose={handleClose}
          localStorageKey={localStorageKey}
        />
      )
    },
    {
      name: 'Download Table',
      disabled: false,
      icon: (
        <Icon
          icon={faArrowDownToLine}
          style={{
            color: theme.palette.primary.main,
            marginRight: '15px',
            marginLeft: '2px'
          }}
        />
      ),
      component: (openModal: any, handleClose: any) => (
        <DownloadTableModal
          openModal={openModal}
          handleClose={handleClose}
          formatTypes={['CSV', 'XLSX']}
          properties={[
            'All properties on records',
            'Current filtered properties'
          ]}
        />
      )
    }
  ];

  const [openModal, setOpenModal] = useState<any>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [modalComponent, setModalComponent] = useState<any>();

  const { mainContainer, tableActionButton, rightContainer } = useStyle(sx);

  const { dataGridRef: apiRef } = useDataGridContext();

  const hideColumn = JSON.parse(
    localStorage.getItem(`${localStorageKey}-hide-column`)!
  );

  useEffect(() => {
    const state = apiRef?.current?.exportState();
    if (!hideColumn) {
      localStorage.setItem(
        `${localStorageKey}-hide-column`,
        JSON.stringify({})
      );
      localStorage.setItem(`${localStorageKey}-state`, JSON.stringify(state));
    }
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
    setOpenModal(false);
  };

  const handleOpen = (index: number) => () => {
    setAnchorEl(null);
    setOpenModal(true);
    setModalComponent(index);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Stack
      sx={mainContainer}
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
    >
      <Stack sx={rightContainer} flexDirection="row" alignItems="center">
        {children}
      </Stack>

      <Box>
        {tableActionsData[modalComponent]?.component(openModal, handleClose)}
        <Button
          onClick={handleClick}
          variant="outlined"
          color="secondary"
          sx={tableActionButton}
          endIcon={
            <Icon
              icon={faChevronDown}
              style={{
                height: '12px',
                width: '12px'
              }}
            />
          }
        >
          Table Actions
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              '&.MuiPaper-root': {
                boxShadow: '0px 8px 24px rgba(35, 47, 51, 0.16)',
                borderRadius: '8px',
                width: 'auto'
              }
            }
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
        >
          {tableActionsData.map((tableAction: any, index: any) => {
            return (
              <MenuItem
                disabled={tableAction.disabled}
                key={index}
                onClick={handleOpen(index)}
              >
                {tableAction.icon}
                <Typography variant="h6" sx={{ fontWeight: '400' }}>
                  {tableAction.name}
                </Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
    </Stack>
  );
};

export default DataGridToolbar;
