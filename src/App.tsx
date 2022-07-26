// import React, { useState, ReactNode, createContext, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';
import GetMaxFuseValue from './components/GetMaxFuseValue';
import Authenticate from './components/auth/Authenticate';
// import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import * as Yup from "yup";



import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import { mockedAuthProvider } from "./services/mockedAuthProvider"
import { ErrorMessage, Field, Form, Formik, FormikBag, FormikValues } from 'formik';
import { IAuthController } from './types/IAuthController';



export default function App() {
  // TODO:
  // after max fuse set, add couple devices, prompt user for input
  // display list of devices and max fuse values on homepage
  // move some logic to separate components
  // tests
  // 
  // 
  // 
  const navigation = useNavigate();
  const [maxFuse, setMaxFuse] = React.useState<number>(0);

  function handleCallback(childData: string) {
    setMaxFuse(parseFloat(childData));
  }
  return (
    <AuthProvider>
      <h1>Auth Example</h1>
      <p>
        {maxFuse}
      </p>

      <Routes>
        <Route element={<Layout />}>
          <Route
          path="/login"
          element={
          <RequireNoAuth>
            <LoginPage />
          </RequireNoAuth>
        }
        />
          <Route
            path="/"
            element={
              <RequireAuth>
                <GetMaxFuseValue navigate={navigation} parentCallback={handleCallback} />
              </RequireAuth>
              }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function Layout() {
  let auth = useAuth();
  return (
    <div>
      <AuthStatus />

      <ul>
      {/* {auth.user && 
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        }
        {!auth.user && 
          <li>
            <Link to="/login">Login Page</Link>
        </li>
            } */}
      </ul>

      <Outlet />
    </div>
  );
}

const serial_regex = /[a-zA-Z][a-zA-Z]\d-\d-[a-zA-Z]-\d\d\d\d\d\d/;

interface AuthContextType {
  user: any;
  signin: (user: string, password: string, callback: ErrorCallback) => void;
  signout: (callback: ErrorCallback) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, password: string, callback: ErrorCallback) => {
    return mockedAuthProvider.auth((err: any) => {
      setUser(newUser);
      callback(err);
    });
  };

  let signout = (callback: ErrorCallback) => {
    return mockedAuthProvider.signout((err: any) => {
      setUser(null);
      callback(err);
    });
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return React.useContext(AuthContext);
}

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not authenticated. Please enter serial number and password</p>;
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function RequireNoAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}


function LoginPage() {
  const [message, setMessage] = React.useState<string>("");
  const [successful, setSuccessful] = React.useState<boolean>(false);

  let navigate = useNavigate();
  let location: any = useLocation();
  let auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }


  let from = location.state?.from?.pathname || "/";

  function handleSubmit(values: FormikValues) {
    // event.preventDefault();

    let {serial, password} = values;
    // let username = formData.get("serial") as string;
    // let password = formData.get("password") as string;

    auth.signin(serial, password, (error: any) => {
      if (error) {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      } else {
      setSuccessful(true);
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
      navigate(from, { replace: true })
      }
    });
  }

  const initialValues: any = {
    serial: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    serial: Yup.string()
      .test(
        "match",
        "The serial format must match the correct regex format.",
        (val: any) =>
          val &&
          val.toString().length == 14 &&
          serial_regex.test(val.toString())
      )
      .required("Required field"),
      password: Yup.string()
      .test(
        "len",
        "The password must be between 5 and 30 characters.",
        (val: any) =>
          val &&
          val.toString().length >= 5 &&
          val.toString().length <= 30
      )
      .required("Required field"),
  });

  return(
    <><div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="serial"> Serial </label>
                <Field name="serial" type="text" className="form-control" />
                <ErrorMessage
                  name="serial"
                  component="div"
                  className="alert alert-danger" />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Password </label>
                <Field
                  name="password"
                  type="password"
                  className="form-control" />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger" />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
              </div>
            </div>
          )}
          {message && (
            <div className="form-group">
              <div
                className={successful ? "alert alert-success" : "alert alert-danger"}
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
        </Form>
      </Formik>
    </div></>
  )
  // return (
  //   <div>
  //     {/* <p>You must authenticate in to view the page at {from}</p> */}

  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Serial Number: <input name="serial" type="text" />
  //       </label>{" "}
  //       <label>
  //         Password: <input name="password" type="password" />
  //       </label>{""}
  //       <button type="submit">Register</button>
  //     </form>
  //   </div>
  // );
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

// function Dashboard() {
//   return <h1>Dashboard</h1>
// }


// function App() {

//   return (
//     <Routes>
//       <Route path="/" element={
//             <Dashboard />
//         }
//       />
//       <Route path="/auth" element={<Authenticate />} />
//     </Routes>


//   );
// }

// export default App;
