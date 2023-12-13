import { IStyle } from '@bilflo.ui/constants';
import { useTheme } from '@mui/material';

export const useStyle = (buttonPadding: any): IStyle => {
  const theme = useTheme();
  return {
    container: {
      '& .MuiPaper-root': {
        borderRadius: theme.spacing(8),
        m: 0,
        p: 0,
        maxWidth: 'fit-content',
        maxHeight: 'fit-content',
        width: 'fit-content',
        [theme.breakpoints.down('sm')]: {
          width: '94%'
        }
      }
    },
    headerTextContainer: {
      borderTopLeftRadius: theme.spacing(8),
      borderTopRightRadius: theme.spacing(8),
      p: theme.spacing(12),
      backgroundColor: theme.palette.secondary.light,
      minHeight: theme.spacing(36),
      minWidth: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    headerTextSX: {
      fontSize: theme.spacing(10)
    },
    dialogContent: { overflow: 'hidden', m: 0, p: 0 },
    modalContent: {},
    modelFooter: {
      float: 'right',
      mr: theme.spacing(12),
      mb: theme.spacing(6)
    },
    footerCancelButton: {
      fontSize: '14px',
      lineHeight: '18px',
      width: '100px',
      p: theme.spacing(4.5, 12.5),
      minWidth: theme.spacing(50),
      minHeight: theme.spacing(18)
    },
    footerSecondButton: {
      fontSize: '14px',
      lineHeight: '18px',
      width: '100px',
      p: theme.spacing(4.5, 16.5),
      minWidth: theme.spacing(50),
      minHeight: theme.spacing(18),
      ml: theme.spacing(12),
      ...buttonPadding.buttonPadding
    }
  };
};
