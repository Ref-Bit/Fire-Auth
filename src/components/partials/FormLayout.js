import { motion } from 'framer-motion';
import { Hero } from '..';

export default function FormLayout({ children }) {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <div className="py-16 px-8">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center">
          <div className="intro-details mt-16 w-full lg:mt-0 lg:w-1/2">
            <h1 className="text-4xl lg:text-6xl dark:text-teal-300 text-teal-500 mb-4">
              Fire Auth App
            </h1>
            <p className="dark:text-gray-50 text-gray-900">
              Please fill all the fields below.
            </p>
            {children}
          </div>
          <div className="intro-hero w-full lg:w-1/2">
            <Hero />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
