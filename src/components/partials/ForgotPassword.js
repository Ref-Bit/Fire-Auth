import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from "../../contexts/Auth";
import { toast } from 'react-toastify';
import { Msg } from '..';

export default function ForgotPassword() {
  const [show, setShow] = useState(false);
  const modalRef = useRef(null);
  const emailRef = useRef(null);
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);

  const hideModal = () => {
    modalRef.current.classList.remove('fadeIn');
    modalRef.current.classList.add('fadeOut');
    setTimeout(() => {
      setShow(false);
    }, 500);
  }

  const escPress = useCallback(
    e => {
      if (e.key === 'Escape' && show) hideModal();
    },
    [show]
  );

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      hideModal();
      toast.success(<Msg msg="Check your inbox for further instructions" isError={false} />, {
        toastId: "success",
      });
    } catch (err) {
      toast.error(<Msg msg={err.message.toLowerCase()} isError={true} />, {
        toastId: "error",
      });
    }
    setLoading(false);
  }

  useEffect(() => {
    document.addEventListener('keydown', escPress);
    return () => document.removeEventListener('keydown', escPress);
  }, [escPress]);

  return (
    <div className="flex mb-5">
      <span className="text-sm cursor-pointer text-teal-600 hover:text-gray-900 hover:underline transition duration-300" onClick={() => setShow(true)}>
        Forgot Password?
      </span>
      {show ? (
        <div className="fixed z-10 inset-0 overflow-y-auto animated fadeIn faster" ref={modalRef}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
            <div className="modal-content inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                    {/* Heroicon name: outline/exclamation */}
                    <svg className="h-6 w-6 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                      Reset Password
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Please fill your email address to reset your password.
                      </p>
                      <div className="flex mt-5">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><span className="material-icons-outlined text-xl text-gray-900">email</span></div>
                        <input type="email" ref={emailRef} className="text-sm lg:text-md dark:bg-gray-100 bg-gray-200 shadow-inner w-full -ml-10 pl-10 p-2 rounded border-2 dark:border-gray-100 border-gray-200 outline-none focus:border-teal-600 transition duration-300" placeholder="johndoe@example.com" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button disabled={loading} onClick={handleClick} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-500 text-base font-medium text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 sm:ml-3 sm:w-auto sm:text-sm transition duration-300">
                  Send
                </button>
                <button
                  onClick={hideModal}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition duration-300">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
