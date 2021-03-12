import { useRef, useState } from "react"
import { useAuth } from "../contexts/Auth";
import { motion } from "framer-motion";
import { useHistory } from "react-router";
import { toast } from 'react-toastify';
import { Msg, Form } from ".";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  const { signin, autoClose } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signin(emailRef.current.value, passRef.current.value);
      toast.success(<Msg msg="User has logged in successfully" isError={false} />, {
        toastId: "success",
      });
      setTimeout(() => {
        history.push("/");
      }, autoClose)
    } catch (err) {
      toast.error(<Msg msg={err.message.toLowerCase()} isError={true} />, {
        toastId: "error",
      });
    }
    setLoading(false);
  }


  return (
    <motion.div exit={{ opacity: 0 }}>
      <Form isSignup={false} title="Sign In" handleSubmit={handleSubmit} emailRef={emailRef} passRef={passRef} loading={loading} autoClose={autoClose} />
    </motion.div>
  )
}
