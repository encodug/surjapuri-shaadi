'use client'
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { useRouter } from 'next/navigation';


const withAuth = (WrappedComponent) => {
  const AuthenticatedRoute = (props) => {
    const { user } = useAuth(); // Get the authenticated user from your custom auth hook
    const router = useRouter();
    

    useEffect(() => {
      if ( !user ) {
        // Redirect to sign in page if not authenticated
        router.push('/register');
      } 
    }, [user]);
  

    if (!user) {
      // You can also render a loading indicator here
      return (
        <section className='mx-auto container p-6 lg:px-8'>
          withAuth Loading...
        </section>
      )
    }

    // If the user is authenticated, render the wrapped component
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedRoute;
};

export default withAuth;
