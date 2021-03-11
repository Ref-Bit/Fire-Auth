import { useRef, useState } from "react"
import { useAuth } from "../contexts/Auth";
import { motion } from "framer-motion";
import toast from 'react-hot-toast';
import Form from "./Form";
import { useHistory } from "react-router";


export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const { signin } = useAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const notifyError = () => toast.error(error);
  const notifySuccess = () => toast.success('User logged in successfully!. Redirect to Dashboard');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await signin(emailRef.current.value, passRef.current.value);
      notifySuccess();
      setInterval(() => {
        history.push("/");
      }, 2000)
    } catch (err) {
      setError(`Fail: ${err.message.toLowerCase()}`);
      notifyError();
    }
    setLoading(false);
  }

  return (
    <motion.div exit={{ opacity: 0 }}>
      <Form isSignup={false} title="Sign In" handleSubmit={handleSubmit} emailRef={emailRef} passRef={passRef} loading={loading} />
    </motion.div>
  )
}
