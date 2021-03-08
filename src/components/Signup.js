import { useRef, useState } from "react"
import { useAuth } from "../contexts/Auth";
import toast, { Toaster } from 'react-hot-toast';

export default function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const notifyError = () => toast.error(error);
  const notifySuccess = () => toast.success('User created successfully!');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passRef.current.value !== passConfRef.current.value) {
      setError("Passwords don't match");
      notifyError();
      return;
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
      notifySuccess();
    } catch (error) {
      setError('Failed to create account');
      notifyError();
    }
    setLoading(false);
  }


  return (
    <div className="lg:w-2/3 dark:bg-gray-50 bg-gray-100 rounded-lg py-10 px-8 mt-6 shadow-xl">
      <Toaster />
      <div className="text-3xl font-semibold mb-8 text-gray-900">Sign Up</div>
      <form onSubmit={handleSubmit}>
        <div className="w-full mb-5">
          <label className="text-sm font-semibold">Email</label>
          <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><span className="material-icons-outlined text-xl text-gray-900">email</span></div>
            <input type="email" ref={emailRef} className="text-sm lg:text-md dark:bg-gray-100 bg-gray-200 shadow-inner w-full -ml-10 pl-10 pr-3 py-2 rounded border-2 dark:border-gray-100 border-gray-200 outline-none focus:border-teal-600 transition duration-300" placeholder="johndoe@example.com" />
          </div>
        </div>
        <div className="w-full mb-5">
          <label className="text-sm font-semibold">Password</label>
          <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><span className="material-icons-outlined text-xl text-gray-900">lock</span></div>
            <input type="password" ref={passRef} className="text-sm lg:text-md dark:bg-gray-100 bg-gray-200 shadow-inner w-full -ml-10 pl-10 pr-3 py-2 rounded border-2 dark:border-gray-100 border-gray-200 outline-none focus:border-teal-600 transition duration-300" placeholder="************" />
          </div>
        </div>
        <div className="w-full mb-5">
          <label className="text-sm font-semibold">Confirm Password</label>
          <div className="flex">
            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><span className="material-icons-outlined text-xl text-gray-900">enhanced_encryption</span></div>
            <input type="password" ref={passConfRef} className="text-sm lg:text-md dark:bg-gray-100 bg-gray-200 shadow-inner w-full -ml-10 pl-10 pr-3 py-2 rounded border-2 dark:border-gray-100 border-gray-200 outline-none focus:border-teal-600 transition duration-300" placeholder="************" />
          </div>
        </div>
        <button disabled={loading} className="w-full h-12 text-gray-900 text-lg font-semibold outline-none border-0 rounded dark:bg-gray-100 bg-gray-200 focus:text-teal-500">Sign Up</button>
        <div className="mt-5">Already a member? <span className="text-teal-600 hover:text-gray-900 hover:underline transition duration-300">Signin now</span></div>
      </form>
    </div>
  )
}
