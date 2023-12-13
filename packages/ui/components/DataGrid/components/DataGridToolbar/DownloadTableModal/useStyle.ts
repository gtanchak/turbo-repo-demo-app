import { IStyle } from '@bilflo.ui/constants';
import { COLORS, FONTS } from '@bilflo.ui/ui-component-library';
import { useTheme } from '@mui/material';

export const useStyle = (): IStyle => {
  const theme = useTheme();

  return {
    mainContent: {
      maxWidth: '384px',
      width: '384px',
      minHeight: '72px',
      display: 'flex',
      userSelect: 'none',
      m: theme.spacing(12)
    },
    fileFormatText: {
      fontSize: '14px',
      fontFamily: FONTS.hind_vadodra,
      lineHeight: '21px',
      fontWeight: '600'
    },
    propertyFormateText: {
      fontSize: '14px',
      fontFamily: FONTS.hind_vadodra,
      lineHeight: '21px',
      fontWeight: 600,
      p: theme.spacing(8, 0)
    },
    propertyFormateValue: {
      '& .MuiTypography-root': {
        fontSize: '14px',
        lineHeight: '20px',
        color: COLORS.gray8,
        fontFamily: FONTS.hind_vadodra
      }
    },
    formateOptions: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: 400,
      fontFamily: FONTS.hind_vadodra
    },
    buttonPadding: {
      p: theme.spacing(4.5, 6.5)
    },
    selectDropBox: {
      '& .MuiPaper-root': {
        boxShadow: '0px 8px 24px rgba(35, 47, 51, 0.16)',
        borderRadius: '12px'
      }
    },
    selectBox: {
      '& .MuiSelect-select': {
        position: 'relative'
      }
    }
  };
};
