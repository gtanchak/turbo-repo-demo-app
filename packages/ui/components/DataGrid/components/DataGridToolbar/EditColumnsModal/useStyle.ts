import { IStyle } from '@bilflo.ui/constants';
import { FONTS } from '@bilflo.ui/ui-component-library';
import { useTheme } from '@mui/material';

export const useStyle = (): IStyle => {
  const theme = useTheme();

  return {
    mainContent: {
      width: '640px',
      minHeight: '340px',
      display: 'flex',
      userSelect: 'none',
      p: theme.spacing(12)
    },
    columnContent: {
      display: 'flex',
      flexDirection: 'column',
      pb: '8px',
      '& .MuiMenuItem-root': {
        py: '8px',
        px: 0,
        '& .MuiCheckbox-root': {
          p: '8px',
          mr: '8px',
          '& .MuiTypography-root': {
            lineHeight: '20px'
          }
        },
        '& .MuiFormControlLabel-root': {
          m: 0
        }
      }
    },
    columnSearchContent: {
      minWidth: '280px',
      mb: '16px',
      [theme.breakpoints.down('sm')]: {
        minWidth: 'auto'
      }
    },
    columnSelectContent: {
      height: theme.spacing(150),
      overflow: 'scroll',
      '& .MuiMenuItem-root': {
        fontFamily: FONTS.hind_vadodra,
        py: 0
      },
      '::-webkit-scrollbar': {
        display: 'none'
      }
    },
    dragColumnContent: {
      fontSize: '14px',
      fontWeight: '600',
      lineHeight: '140%',
      mb: '8px'
    },
    modalDivider: { height: '100%', m: theme.spacing(0, 8) },
    checkboxLabel: {
      '& .MuiTypography-root': {
        fontSize: '14px',
        fontWeight: '400',
        maxWidth: '230px',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }
    },
    buttonPadding: {
      p: theme.spacing(4.5, 12.5)
    }
  };
};
