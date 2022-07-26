const mockedAuthProvider = {
    // isAuthenticated: false,
    auth(callback: ErrorCallback) {
      // mockedAuthProvider.isAuthenticated = true;
      setTimeout(callback, 100); // fake async
    },
    signout(callback: ErrorCallback) {
      // mockedAuthProvider.isAuthenticated = false;
      setTimeout(callback, 100);
    },
  };
  
  export { mockedAuthProvider };