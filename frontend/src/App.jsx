
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useEffect } from 'react';
import useAuthStore from './store/useAuthStore';

const App = () => {

  const { checkAuth, isLoading } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) return <div>Loading...</div>;




  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App