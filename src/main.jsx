import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './Context/AuthProvider.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";


import MainLayout from './Layouts/MainLayout.jsx';
import Error from './pages/Error.jsx';
import Home from './Components/Home.jsx';
import Register from './Components/Register.jsx';
import Login from './Components/Login.jsx'; 
import Navbar from './Components/Navbar.jsx';
import Footer from './Components/Footer.jsx';
import { Toaster } from 'react-hot-toast';
import BrowseTips from './Components/BrowseTips.jsx';
import MyTips from './Components/MyTips.jsx';
import Gardener from './Components/Gardener.jsx';
import ShareTips from './Components/ShareTips.jsx';
import TipsDetails from './Components/TipsDetails.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import Loading from './pages/Loading.jsx';
import Update from './Components/Update.jsx';
import Counter from './Components/counter.jsx';
import TrendingTips from './pages/TrendingTips.jsx';
import ActGardener from './Components/ActGardener.jsx';
import Theme from './Components/Theme.jsx';
import GardenTools from './Components/GardenTools.jsx';
 


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement:<Error></Error>,
    children:[{
      index:true,
      Component: Home,  
    },
    {
      path: 'register',
      Component: Register,
    },
    {
      path: 'login',
      Component: Login,
    },
     
    {
      path: 'navbar',
      Component: Navbar,
    },
    {
      path: 'footer',
      Component:Footer,
    },
    {
     path: 'browsetips',
     loader: () => fetch('https://assignment10-server-beryl.vercel.app/userstip'),
     Component: BrowseTips,
    },
    {
      path: '/userstip/:id',
      loader: ({params}) => fetch(`https://assignment10-server-beryl.vercel.app/userstip/${params.id}`),
      element: <PrivateRoute><TipsDetails/> </PrivateRoute> 
    },
     {
      path: 'gardener',
      Component: Gardener,
     },
     {
      path: 'actgardener',
      element:<ActGardener></ActGardener>
     },
    {
       path: 'counter',
     element: <Counter></Counter>
    },
     {
      path: 'sharetips',
      element: <PrivateRoute> <ShareTips/> </PrivateRoute>
     },
     {
      path:  'mytips/:email'  ,
      loader: ({params}) => fetch(`https://assignment10-server-beryl.vercel.app/userstip/email/${params.email}`),
      element: <PrivateRoute><MyTips/> </PrivateRoute>,
      hydrateFallbackElement: <Loading/> ,
     },
     {
      path:'update/:id',
      loader: ({params}) => fetch(`https://assignment10-server-beryl.vercel.app/userstip/${params.id}`) ,
      element:  <Update/>  
     },
     {
      path: 'trendingtips',
      element: <TrendingTips/>
     },
     {
      path: 'theme',
      element: <Theme/>
     },
     {
      path: 'gardentools',
      element: <GardenTools/>
     }
 
  ]
    
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
     <RouterProvider router={router} />
      <Toaster></Toaster>
     </AuthProvider>
  </StrictMode>,
)
