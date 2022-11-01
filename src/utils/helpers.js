import { toast } from "react-toastify";

export const showToastTop = (
  message,
  error = true,
  options = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }
) => {
  return error
    ? toast.error(message, options)
    : toast.success(message, options);
};
