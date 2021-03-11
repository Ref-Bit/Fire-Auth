import { Hero, Login, Signup } from './components';
import AuthProvider from './contexts/Auth';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="container mx-auto py-16 px-8">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
        <div className="intro-details mt-16 w-full lg:mt-0 lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl dark:text-teal-300 text-teal-500 mb-4">Fire Auth App</h1>
          <p className="dark:text-gray-50 text-gray-900">Please fill all the fields below.</p>
          <AuthProvider>
            <AnimatePresence exitBeforeEnter>
              <Switch location={location} key={location.pathname}>
                <Route exact path={["/", "/signup"]} component={Signup} />
                <Route path="/login" component={Login} />
              </Switch>
            </AnimatePresence>
          </AuthProvider>
        </div>
        <div className="intro-hero w-full lg:w-1/2">
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default App;
