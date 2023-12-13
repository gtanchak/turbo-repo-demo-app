import { IStyle } from '@bilflo.ui/constants';
import { FONTS } from '@bilflo.ui/ui-component-library';

const useStyle = (sx: any): IStyle => {
  return {
    mainContainer: {
      // my: '16px',
      ...sx
    },
    tableActionButton: {
      color: '#555F61',
      minWidth: '123px',
      height: '34px',
      fontWeight: 600,
      fontSize: '12px',
      py: '8px',
      px: '12px',
      fontFamily: FONTS.montserrat
    },
    rightContainer: {
      flex: 1
    }
  };
};

export default useStyle;
