import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/Auth";
import toast from 'react-hot-toast';
import Form from "./Form";
import { useHistory } from "react-router";

export default function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const { signup } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const notifyError = () => toast.error(error);
  const notifySuccess = () => toast.success('User logged in successfully!. Redirect to Dashboard');

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
      setInterval(() => {
        history.push("/");
      }, 2000)
    } catch (err) {
      setError('Failed to create account');
      notifyError();
    }
    setLoading(false);
  }


  return (
    <motion.div exit={{ opacity: 0 }}>
      <Form isSignup={true} title="Sign Up" handleSubmit={handleSubmit} emailRef={emailRef} passRef={passRef} passConfRef={passConfRef} loading={loading} />
    </motion.div>
  )
}
