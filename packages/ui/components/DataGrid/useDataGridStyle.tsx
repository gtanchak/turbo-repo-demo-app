import { IStyle } from '@bilflo.ui/constants';
import { FONTS } from '@bilflo.ui/ui-component-library';
import { useTheme } from '@mui/material';

const useDataGridStyle = (
  rowHeight: number | undefined = undefined
): IStyle => {
  const theme = useTheme();

  return {
    resizeIconStyle: {
      height: theme.spacing(10),
      width: theme.spacing(0.5),
      backgroundColor: theme.palette.secondary.dark
    },
    dataGridProCommonStyle: {
      borderRadius: theme.spacing(4),
      overflow: 'hidden',
      fontFamily: FONTS.hind_vadodra,
      fontSize: theme.spacing(7),
      color: theme.palette.secondary.contrastText,
      '& .MuiDataGrid-virtualScroller::-webkit-scrollbar': {
        display: 'none'
      },
      '& .MuiDataGrid-main': {
        position: 'relative'
      },
      // ...(!isScrollBarBlurRemove && {
      //   '& .MuiDataGrid-main::after, & .MuiDataGrid-main::before': {
      //     content: "''",
      //     position: 'absolute'
      //   },
      //   '& .MuiDataGrid-main::after': !isVerticalScrollEnd && {
      //     height: theme.spacing(18),
      //     width: '100%',
      //     left: 0,
      //     background:
      //       'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
      //     zIndex: 999,
      //     ...(rowHeight
      //       ? {
      //           bottom: `${rowHeight}px`
      //         }
      //       : {
      //           ...(!pinnedRows
      //             ? {
      //                 bottom: '0px'
      //               }
      //             : {
      //                 bottom: '45px'
      //               })
      //         })
      //   },
      //   '& .MuiDataGrid-main::before': !isHorizontalScrollEnd && {
      //     right: 0,
      //     width: theme.spacing(20),
      //     height: '100%',
      //     background:
      //       'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
      //     ...(rowHeight
      //       ? {
      //           bottom: `${rowHeight}px`
      //         }
      //       : {
      //           ...(!pinnedRows
      //             ? {
      //                 bottom: '0'
      //               }
      //             : {
      //                 bottom: '48px'
      //               })
      //         }),
      //     zIndex: 999
      //   }
      // }),
      '& .MuiDataGrid-iconButtonContainer': {
        flex: 1,
        justifyContent: 'flex-end'
      },
      '& .MuiDataGrid-columnHeader--alignRight .MuiDataGrid-iconButtonContainer':
        {
          justifyContent: 'flex-start'
        },
      '& .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover':
        {
          backgroundColor: '#fff'
        },
      '& .MuiDataGrid-row:hover': {
        backgroundColor: 'transparent'
      },
      '& .align-center .MuiDataGrid-columnHeaderTitleContainer': {
        justifyContent: 'center'
      },
      '.MuiTablePagination-selectIcon': {
        right: '4px',
        width: '11px',
        top: '2px'
      }
    }
  };
};

export default useDataGridStyle;
