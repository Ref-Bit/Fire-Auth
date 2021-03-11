import { Dashboard, Login, Signup } from './components';
import AuthProvider from './contexts/Auth';
import { Switch, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  return (
    <div className="container mx-auto">
      <AuthProvider>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AnimatePresence>
      </AuthProvider>
    </div>
  );
}

export default App;
