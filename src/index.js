import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import AuthLayout from './components/AuthLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddPost from './pages/AddPost';
import AllPosts from './pages/AllPosts';
import EditPost from './pages/EditPost';
import Post from './pages/Post';


const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/login",
        element:(
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path:"/signup",
        element:(
          <AuthLayout authentication={false}> 
            <Signup /> 
          </AuthLayout>
        )
      },
      {
        path:"/addpost",
        element:(
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path:"/allposts",
        element:(
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path:"/editpost",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path:"/post",
        element:(
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        )
      }
    ]
  }

])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);


