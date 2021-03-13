import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { Navbar } from '.';

export default function Dashboard() {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <ToastContainer
        position="top-center"
        toastClassName="w-96"
        bodyClassName="font-sans text-white"
      />
      <Navbar title="Dashboard" />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-teal-300 rounded-lg h-96"></div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
