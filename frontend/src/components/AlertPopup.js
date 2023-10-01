import { Alert } from '@mui/material';
import useAlert from '../hooks/useAlert';
import appstyles from '../App.module.css'

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert
        className={appstyles.Alert}
        severity={type}
      >
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;