"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';


interface CardProps {}

const Login: React.FC<CardProps> = () => {
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<String>('');
  const { user, setUser, isLoggedIn, setIsLoggedIn, login, register } = useAuth();


  const router = useRouter();

  const incorrectPassword = confirmpassword !== newPassword;

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add form validation and submission logic here
    if (!isSignUp) {
      try {
        await login({email, password});
        setIsLoggedIn(true);
        router.push('/home'); // Navigate to the login page
        } catch (error) {
          console.error(error);
          setError(`${error}`);
        }
        setIsLoading(false);
    } else {
      if(incorrectPassword){
        setError('Password does not match. Please try again');
      } else {
        // console.log({email, newPassword})
        try{
          await register({email, newPassword});
        } catch (error){
          console.error(error);
        }
        // setIsSignUp(!isSignUp);
      }
    }
  };

  const handleGoogleSignIn = () => {
    // Add Google sign-in logic here
  };

  const handleMicrosoftSignIn = () => {
    // Add Microsoft sign-in logic here
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-600 text-white">
      <div className="bg-white text-gray-800 rounded-lg shadow-md p-8 max-w-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <h1 className="text-3xl font-bold mb-4">Apollo.io</h1>
        <h2 className="text-xl mb-6">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
        <div className="flex justify-center mb-4 flex-wrap">
          <button className="bg-white text-gray-800 border border-gray-300 rounded-md px-4 py-2 mr-2 mb-2 hover:bg-gray-100 transition-colors duration-300 flex items-center">
            <i className="fab fa-google mr-2"></i> { isSignUp ? 'Sign Up' : 'Log In'} with Google
          </button>
          <button className="bg-white text-gray-800 border border-gray-300 rounded-md px-4 py-2 mr-2 mb-2 hover:bg-gray-100 transition-colors duration-300 flex items-center">
            <i className="fab fa-microsoft mr-2"></i> { isSignUp ? 'Sign Up' : 'Log In'} with Microsoft
          </button>
          <button className="bg-white text-gray-800 border border-gray-300 rounded-md px-4 py-2 mb-2 hover:bg-gray-100 transition-colors duration-300 flex items-center">
            <i className="fas fa-building mr-2"></i> { isSignUp ? 'Sign Up' : 'Log In'} with your Organization
          </button>
        </div>
        <div className="text-center mb-4">OR</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full mb-4 px-4 py-2 rounded-md border ${incorrectPassword ? 'border-red-300' :'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
          /> */}
          {
            isSignUp ? (<>
              <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full mb-4 px-4 py-2 rounded-md border ${incorrectPassword ? 'border-red-300' :'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <input
              type="password"
              placeholder="Confirm Password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full mb-4 px-4 py-2 rounded-md border ${incorrectPassword ? 'border-red-300' :'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              </>
            ): (<>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full mb-4 px-4 py-2 rounded-md border ${incorrectPassword ? 'border-red-300' :'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </>)
          }
          {error !== '' && <span className='text-xs text-red-500'>{error}</span>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
          >
            {/* { isSignUp && !isLoading ? 'Sign Up' : 'Log In'} */}
            { isLoading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Log In'}
          </button>
        </form>
        {
          !isSignUp && (
            <div className="flex justify-between items-center mt-4 flex-wrap">
              <label className="flex items-center mb-2">
                <input type="checkbox" className="form-checkbox text-blue-600 mr-2" />
                Keep me signed in
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-2">
                Forgot your password?
              </a>
            </div>
          )
        }
        <div className="text-center mt-4">
          {isSignUp ? (
            <span>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Log In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
              >
                Sign Up
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;