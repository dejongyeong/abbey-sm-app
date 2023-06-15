import { ToastContainer, Slide } from 'react-toastify';

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss // pause when the window loses focus
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
      className="text-sm"
    />
  );
}
