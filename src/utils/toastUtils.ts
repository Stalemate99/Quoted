import { type ToastOptions } from "react-toastify";

const DEFAULT_TOAST_CONFIG: ToastOptions<{}> = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  progress: undefined,
  theme: "colored",
};

export { DEFAULT_TOAST_CONFIG };
