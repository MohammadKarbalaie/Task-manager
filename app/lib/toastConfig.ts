import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showToastErr = (message: string, type: ToastType = 'error', color: string = '#fefefe') => {
  const toastOptions: ToastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    style: { backgroundColor: color},     
  };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'warning':
      toast.warn(message, toastOptions);
      break;
    case 'error':
    default:
      toast.error(message, toastOptions);
      break;
  }
};

export const Toast = ToastContainer;
