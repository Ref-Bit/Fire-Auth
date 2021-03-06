import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/Auth';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const mobile_variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-75%' },
};

const desktop_variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: '75%' },
};

export default function Navbar({ title }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, signout } = useAuth();
  const history = useHistory();

  const handleSignout = async () => {
    try {
      await signout();
      history('/login');
    } catch (err) {
      toast.error('Failed to log out');
    }
  };

  return (
    <>
      <nav className="dark:bg-gray-900 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-teal-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    exact
                    to="/"
                    activeClassName="bg-teal-500 rounded-md p-1"
                  >
                    <span className="dark:text-gray-50 text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </span>
                  </NavLink>
                  <NavLink
                    to="/profile"
                    activeClassName="bg-teal-500 rounded-md p-1"
                  >
                    <span className="dark:text-gray-50 text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                      Profile
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="relative">
                  <div>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      type="button"
                      className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-500 focus:ring-white"
                      id="user-menu"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://ui-avatars.com/api/?size=128&rounded=true&bold=true&background=14b8a6&color=ffffff"
                        alt=""
                      />
                    </button>
                  </div>
                  <motion.div
                    animate={isOpen ? 'open' : 'closed'}
                    variants={desktop_variants}
                    className={`${
                      isOpen ? '' : 'hidden'
                    } origin-top-right absolute right-0 mt-2 w-48 text-center rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <span
                      className="block px-4 py-2 text-sm text-gray-900"
                      role="menuitem"
                    >
                      {currentUser.email}
                    </span>
                    <button
                      onClick={handleSignout}
                      className="block w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="dark:bg-gray-800 bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-teal-500 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col flex-wrap">
            <NavLink exact to="/" activeClassName="bg-teal-500 rounded-md p-1" className="my-2 inline-flex">
              <span className="dark:text-gray-50 text-gray-900 px-3 py-1 rounded-md text-sm font-medium">
                Dashboard
              </span>
            </NavLink>
            <NavLink to="/profile" activeClassName="bg-teal-500 rounded-md p-1" className="my-2 inline-flex">
              <span className="dark:text-gray-50 text-gray-900 px-3 py-1 rounded-md text-sm font-medium">
                Profile
              </span>
            </NavLink>{' '}
          </div>
          <motion.div
            animate={isOpen ? 'open' : 'closed'}
            variants={mobile_variants}
            className={`${
              isOpen ? '' : 'hidden'
            } pt-4 pb-3 border-t border-gray-700`}
          >
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://ui-avatars.com/api/?size=128&rounded=true&bold=true&background=14b8a6&color=ffffff"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <div className="text-sm font-medium leading-none text-gray-400">
                  {currentUser.email}
                </div>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <button className="block px-3 py-2 rounded-md text-base font-medium dark:text-gray-50 text-gray-900 hover:bg-teal-500">
                Sign out
              </button>
            </div>
          </motion.div>
        </div>
      </nav>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
      </header>
    </>
  );
}
