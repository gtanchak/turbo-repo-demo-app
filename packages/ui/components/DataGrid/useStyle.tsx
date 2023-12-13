import { IStyle } from '@bilflo.ui/constants';
import { COLORS, FONTS } from '@bilflo.ui/ui-component-library';
import { useTheme } from '@mui/material';
import { css } from '@emotion/css';
import useDataGridStyle from './useDataGridStyle';

const useStyle = (sx: any, rowHeight: number | undefined): IStyle => {
  const theme = useTheme();
  const { dataGridProCommonStyle } = useDataGridStyle(rowHeight);

  return {
    resizeIconStyle: {
      height: theme.spacing(10),
      width: theme.spacing(0.5),
      backgroundColor: theme.palette.secondary.dark
    },
    dataGridCustomization: {
      ...dataGridProCommonStyle,
      border: 'none',
      '& .MuiDataGrid-cell:focus-within:not(.MuiDataGrid-cellCheckbox), & .MuiDataGrid-cell.MuiDataGrid-cell--editing:focus-within:not(.MuiDataGrid-cellCheckbox)':
        {
          // ...(!disableSingleCellSelection
          //   ? {
          //       border: `${theme.spacing(1)} solid ${
          //         theme.palette.primary.main
          //       } !important`
          //     }
          //   : {})
        },
      '& .MuiDataGrid-cell.MuiDataGrid-cell--editing': {
        boxShadow: 'none'
      },
      '& .MuiDataGrid-cell:focus-within': {
        outline: 'none'
      },
      '& .MuiDataGrid-selectedRowCount': {
        display: 'none'
      },
      '& .MuiDataGrid-virtualScroller': {
        position: 'relative',
        borderBottomLeftRadius: theme.spacing(4),
        borderBottomRightRadius: theme.spacing(4)
      },
      '& .MuiDataGrid-virtualScrollerContent': {
        border: `${theme.spacing(0.5)} solid ${theme.palette.secondary.dark}`,
        position: 'relative'
      },
      '& .virtualScrollerContent::after': {
        content: "''",
        position: 'absolute',
        top: 0,
        height: '500px',
        width: '500px'
      },
      '& .MuiDataGrid-cell': {
        p: theme.spacing(0, 6),
        boxSizing: 'border-box',
        position: 'relative',
        cursor: 'pointer'
      },
      '& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle': {
        fontWeight: 600
      },
      '& .MuiDataGrid-cell::before': {
        content: "''",
        position: 'absolute',
        height: theme.spacing(12),
        width: theme.spacing(0.5),
        backgroundColor: theme.palette.secondary.dark,
        right: 0,
        zIndex: 0
      },
      '& .MuiDataGrid-cell.MuiDataGrid-cell--editable.MuiDataGrid-cell::before':
        {
          backgroundColor: 'transparent'
        },
      '& .MuiDataGrid-columnHeaders': {
        backgroundColor: COLORS.column_header_color,
        border: `${theme.spacing(0.5)} solid ${theme.palette.secondary.dark}`,
        borderBottom: 'none',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px'
      },
      '& .MuiDataGrid-columnHeader--sortable': {
        p: theme.spacing(0, 6),
        boxSizing: 'border-box'
      },
      '& .MuiDataGrid-columnHeader--sortable:hover, & .MuiDataGrid-columnHeader:last-child:hover':
        {
          boxShadow: `2px 0 0 ${theme.palette.primary.main}, -2px 0 0 ${theme.palette.primary.main}`,
          backgroundColor: COLORS.bilflo_green
        },
      '& .MuiDataGrid-columnSeparator': {
        zIndex: 0,
        width: theme.spacing(6.5)
      },
      '& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
        {
          outline: 'none'
        },
      '& .MuiCheckbox-root:hover': {
        backgroundColor: 'rgba(0,0,0,0)',
        color: theme.palette.primary.main
      },
      '& .MuiTablePagination-actions .MuiButtonBase-root': {
        backgroundColor: '#D8F3DC',
        color: theme.palette.primary.main,
        borderRadius: theme.spacing(3),
        width: theme.spacing(16),
        height: theme.spacing(16),
        margin: theme.spacing(0, 2)
      },
      '& .Mui-disabled': {
        opacity: 0.4
      },
      '& .MuiCheckbox-root:not(.Mui-checked)': {
        color: '#C0C8CB'
      },
      '& .MuiTablePagination-spacer': {
        display: 'none'
      },
      '& .MuiTablePagination-displayedRows': {
        flex: 1,
        textAlign: 'end',
        margin: 0,
        fontFamily: FONTS.hind_vadodra,
        color: theme.palette.secondary.main
      },
      '& .MuiTablePagination-root': {
        width: '100%'
      },
      '& .MuiDataGrid-footerContainer': {
        border: 'none'
      },
      '& .warningBorder': {
        border: `${theme.spacing(1)} solid ${COLORS.sales_yellow} !important`,
        position: 'relative'
      },
      '& .errorBorder': {
        border: `${theme.spacing(1)} solid ${COLORS.primary_red}`,
        position: 'relative'
      },
      '& .errorBorder::before': {
        top: 0,
        right: 0,
        height: '100%',
        width: theme.spacing(1),
        borderRight: `${theme.spacing(1)} solid ${COLORS.primary_red}`
      },
      '& .warningBorder:focus, & .errorBorder:focus': {
        outline: 'none'
      },
      '& .MuiDataGrid-cell--editable': {
        borderRight: `${theme.spacing(0.5)} solid ${
          theme.palette.secondary.dark
        }`
      },
      '& .warningBorder.MuiDataGrid-cell--editable, & .errorBorder.MuiDataGrid-cell--editable':
        {
          borderRight: 'none'
        },
      '& .MuiDataGrid-cell--editing:focus-within, & .MuiDataGrid-cell--editing:focus-within':
        {
          border: `${theme.spacing(1)} solid ${theme.palette.primary.main}`
        },
      '& .MuiDataGrid-pinnedRows--bottom .MuiDataGrid-cell': {
        border: 'none',
        fontWeight: 600
      },
      '& .MuiDataGrid-pinnedRows--bottom .MuiDataGrid-cell:before': {
        width: 0
      },
      '& .MuiDataGrid-pinnedRows .MuiDataGrid-cell:nth-of-type(2)': {
        ml: `-${theme.spacing(25)}`,
        mr: theme.spacing(25),
        pl: theme.spacing(9)
      },
      '& .MuiTablePagination-selectLabel, & .MuiInputBase-root': {
        fontFamily: FONTS.hind_vadodra,
        color: theme.palette.secondary.main,
        margin: 0
      },
      '& .MuiToolbar-root, & .MuiDataGrid-footerContainer': {
        minHeight: '32px'
      },
      '.MuiToolbar-root': {
        mt: '8px'
      },
      '& .MuiDataGrid-virtualScrollerRenderZone': {
        '.MuiInputBase-input': {
          textAlign: 'right',
          padding: '0px 12px'
        },
        '.MuiOutlinedInput-input': {
          padding: '0px'
        }
      },
      '& .MuiInputBase-input:focus': {
        backgroundColor: 'transparent'
      },
      '& .Approved': {
        color: theme.palette.primary.main,
        background: 'rgba(40, 181, 111, 0.12)'
      },
      '& .Missing': {
        color: '#ED5537',
        background: 'rgba(237, 85, 55, 0.12)'
      },
      '& .Draft': {
        color: '#ED5537',
        background: 'rgba(237, 85, 55, 0.12)'
      },
      '& .Processed': {
        color: '#5FC8EA',
        background: 'rgba(95, 200, 234, 0.12)'
      },
      '& .Submitted': {
        color: '#555F61',
        background: 'rgba(0, 0, 0, 0.08)'
      },
      '& .MuiDataGrid-pinnedRows': {
        boxShadow: 'none'
      },
      '& .something': {
        background: 'red'
      },
      '& .select-column-cell-disabled-style': {
        backgroundColor: theme.palette.secondary.light,
        pointerEvents: 'none'
      },
      '.MuiTablePagination-select': {
        fontWeight: '600',
        color: 'black',
        fontSize: '14px',
        padding: 0,
        fontStyle: 'normal',
        paddingLeft: '8px'
      },
      ...sx
    }
  };
};

export default useStyle;

export const TableContainer = css`
  .MuiDataGrid-main {
    height: calc(100vh - 317px);
  }
`;
