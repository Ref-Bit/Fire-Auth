import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/Auth";
import { toast } from 'react-toastify';
import { Msg, Form } from ".";
import { useHistory } from "react-router";

export default function Signup() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const { signup, autoClose } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passRef.current.value !== passConfRef.current.value) {
      toast.error(<Msg msg="Passwords don't match" isError={true} />, {
        toastId: "error"
      });
      return;
    }

    try {
      setLoading(true);
      await signup(emailRef.current.value, passRef.current.value);
      toast.success(<Msg msg='User signed up successfully' isError={false} />, {
        toastId: 'success'
      });
      setTimeout(() => {
        history.push("/");
      }, autoClose);
    } catch (err) {
      toast.error(<Msg msg={err.message.toLowerCase()} isError={true} />, {
        toastId: "error"
      });
    }
    setLoading(false);
  }


  return (
    <motion.div exit={{ opacity: 0 }}>
      <Form isSignup={true} title="Sign Up" handleSubmit={handleSubmit} emailRef={emailRef} passRef={passRef} passConfRef={passConfRef} loading={loading} autoClose={autoClose} />
    </motion.div>
  )
}
