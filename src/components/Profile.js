import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/Auth';
import { toast } from 'react-toastify';
import { Msg, Form, Navbar } from '.';
import { useHistory } from 'react-router';

export default function Profile() {
  const emailRef = useRef();
  const passRef = useRef();
  const passConfRef = useRef();
  const { updateEmail, updatePassword, currentUser, autoClose } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (passRef.current.value !== passConfRef.current.value) {
      toast.error(<Msg msg="Passwords don't match" isError={true} />, {
        toastId: 'error',
      });
      return;
    }

    const promises = [];

    setLoading(true);

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passRef.current.value) {
      promises.push(updatePassword(passRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        toast.success(
          <Msg msg="User info updated successfully" isError={false} />,
          {
            toastId: 'success',
          }
        );
        setTimeout(() => {
          history.push('/');
        }, autoClose);
      })
      .catch(err => {
        toast.error(<Msg msg={err.message.toLowerCase()} isError={true} />, {
          toastId: 'error',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <motion.div exit={{ opacity: 0 }}>
      <Navbar title="Profile" />
      <div className="xl:px-28 xl:mx-0 xl:block max-w-4xl flex justify-center py-6 px-4 mx-auto">
        <Form
          isProfile={true}
          isSignup={true}
          title="Update Profile"
          handleSubmit={handleSubmit}
          emailRef={emailRef}
          passRef={passRef}
          passConfRef={passConfRef}
          loading={loading}
          defaultEmail={currentUser.email}
          autoClose={autoClose}
        />
      </div>
    </motion.div>
  );
}
