import { Box, Button, Icon, Typography } from '@bilflo.ui/ui-component-library';
import { faXmark } from '@fortawesome/pro-regular-svg-icons';
import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { useStyle } from './useStyle';

const PrimaryTableModal = ({
  children,
  headerText,
  buttonText,
  openModal,
  handleClose,
  actionButtonHandler,
  buttonPadding,
  updateButtonProps
}: any) => {
  const {
    headerTextContainer,
    container,
    headerTextSX,
    modelFooter,
    footerCancelButton,
    footerSecondButton,
    modalContent,
    dialogContent
  } = useStyle({ buttonPadding });

  return (
    <Dialog open={openModal} onClose={handleClose} sx={container}>
      <Box sx={headerTextContainer}>
        <Typography variant="h2" sx={headerTextSX}>
          {headerText}
        </Typography>
        <Icon
          onClick={handleClose}
          icon={faXmark}
          style={{
            color: '#C0C8CB',
            cursor: 'pointer',
            fontSize: '25px'
          }}
        />
      </Box>
      <DialogContent sx={dialogContent}>
        <Box sx={modalContent}>{children}</Box>
      </DialogContent>
      <DialogActions>
        <Box sx={modelFooter}>
          <Button
            onClick={handleClose}
            color="secondary"
            variant="outlined"
            sx={footerCancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={actionButtonHandler}
            sx={footerSecondButton}
            {...updateButtonProps}
          >
            {buttonText}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default PrimaryTableModal;
