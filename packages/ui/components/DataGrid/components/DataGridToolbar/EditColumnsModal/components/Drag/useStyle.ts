import { IStyle } from '@bilflo.ui/constants';
import { FONTS, useTheme } from '@bilflo.ui/ui-component-library';

export const useStyle = (): IStyle => {
  const theme = useTheme();
  return {
    scroll: {
      height: '340px',
      display: 'flex',
      flexDirection: 'column',
      '::-webkit-scrollbar': { display: 'none' }
    },
    scrollBottom: {
      height: '100%'
    },
    mainList: {
      flex: 1,
      overflow: 'auto',
      p: 0,
      '::-webkit-scrollbar': { display: 'none' }
    },
    dragHeader: {
      backgroundColor: '#F9FAFA',
      border: '1px solid #DADEE0',
      borderRadius: '6px',
      width: '280px',
      height: '36px',
      mt: '8px',
      mb: '8px'
    },
    dragHeaderText: {
      fontFamily: FONTS.hind_vadodra,
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '140%'
    },
    dragList: {
      [theme.breakpoints.down('sm')]: {
        width: '200px'
      },
      width: '280px',
      height: '36px',
      fontFamily: FONTS.hind_vadodra,
      fontSize: '14px',
      fontWeight: '400',
      backgroundColor: '#F9FAFA',
      border: '1px solid #DADEE0',
      borderRadius: '6px',
      display: 'flex',
      justifyContent: 'space-between',
      mt: '8px',
      mb: '8px',
      maxWidth: '280px'
    },
    dragItemText: {
      maxWidth: '200px',
      fontFamily: FONTS.hind_vadodra,
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '140%',
      ml: '8px',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    }
  };
};
