import { Bounce, toast } from 'react-toastify';

// Function to show a success toast message
export const showSuccessToast = (message: string): void => {
  // Display a success toast with the provided message
  toast.success(message, {
    // Configuration options for the toast
    position: 'top-right', // Position of the toast on the screen
    autoClose: 5000, // Time in milliseconds before the toast automatically closes
    hideProgressBar: false, // Whether to hide the progress bar
    closeOnClick: true, // Whether clicking on the toast closes it
    pauseOnHover: true, // Whether hovering over the toast pauses the auto close timer
    draggable: true, // Whether the toast can be dragged
    progress: undefined, // Progress bar animation configuration
    theme: 'light', // Color theme for the toast
    transition: Bounce, // Animation transition for the toast
  });
};
