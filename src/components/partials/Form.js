import { Link } from "react-router-dom";
import { Hero } from '..';
import { ToastContainer } from 'react-toastify';

export default function Form({ isSignup, title, handleSubmit, emailRef, passRef, passConfRef, loading, autoClose }) {
  return (
    <div className="py-16 px-8">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
        <div className="intro-details mt-16 w-full lg:mt-0 lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl dark:text-teal-300 text-teal-500 mb-4">Fire Auth App</h1>
          <p className="dark:text-gray-50 text-gray-900">Please fill all the fields below.</p>
          <div className="lg:w-2/3 dark:bg-gray-50 bg-gray-100 rounded-lg py-10 px-8 mt-6 shadow-xl">
            <ToastContainer position="top-center" toastClassName="w-96" bodyClassName="font-sans text-white" autoClose={autoClose} />
            <div className="text-3xl font-semibold mb-8 text-gray-900">{title}</div>
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
              {isSignup && <div className="w-full mb-5">
                <label className="text-sm font-semibold">Confirm Password</label>
                <div className="flex">
                  <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><span className="material-icons-outlined text-xl text-gray-900">enhanced_encryption</span></div>
                  <input type="password" ref={passConfRef} className="text-sm lg:text-md dark:bg-gray-100 bg-gray-200 shadow-inner w-full -ml-10 pl-10 pr-3 py-2 rounded border-2 dark:border-gray-100 border-gray-200 outline-none focus:border-teal-600 transition duration-300" placeholder="************" />
                </div>
              </div>}
              <button disabled={loading} className="w-full h-12 text-gray-900 text-lg font-semibold outline-none border-0 rounded dark:bg-gray-100 bg-gray-200 focus:text-teal-500">{title}</button>
              {isSignup ? (
                <div className="mt-5">Already a member?&nbsp;
                  <Link to="/login">
                    <span className="text-teal-600 hover:text-gray-900 hover:underline transition duration-300">Signin now</span>
                  </Link>
                </div>
              ) : (
                <div className="mt-5">Not a member?&nbsp;
                  <Link to="/signup">
                    <span className="text-teal-600 hover:text-gray-900 hover:underline transition duration-300">Signup now</span>
                  </Link>
                </div>
              )}
            </form>
          </div>
        </div>
        <div className="intro-hero w-full lg:w-1/2">
          <Hero />
        </div>
      </div>
    </div>
  )
}
