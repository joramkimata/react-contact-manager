import { toast } from "react-toastify";
import swal from "sweetalert";

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

export const promptBox = (
  cb,
  title = "Once deleted, you will not be able to recover?"
) => {
  swal({
    title: "Are you sure?",
    text: title,
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      cb();
    }
  });
};
