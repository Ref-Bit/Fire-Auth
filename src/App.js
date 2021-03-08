import Hero from './components/Hero';


function App() {
  return (
    <div className="container mx-auto py-24 px-8">
      <div className="flex justify-between items-center">
        <div className="intro-details w-1/2">
          <h1 className="text-6xl dark:text-teal-300 text-teal-500 mb-4">Fire Auth App</h1>
          <p className="dark:text-gray-50 text-gray-900">Please fill all the fields below.</p>
        </div>
        <div className="intro-hero w-1/2">
          <Hero />
        </div>
      </div>
    </div>
  );
}

export default App;
