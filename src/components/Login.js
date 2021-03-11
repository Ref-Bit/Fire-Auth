import { useRef, useState } from "react"
import { useAuth } from "../contexts/Auth";
import toast from 'react-hot-toast';
import Form from "./Form";

export default function Login() {
  const emailRef = useRef();
  const passRef = useRef();
  // const { signin } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const notifyError = () => toast.error(error);
  const notifySuccess = () => toast.success('User logged in successfully!');

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitted!")
  }

  return (
    <Form isSignup={false} title="Sign In" handleSubmit={handleSubmit} emailRef={emailRef} passRef={passRef} loading={loading} />
  )
}
