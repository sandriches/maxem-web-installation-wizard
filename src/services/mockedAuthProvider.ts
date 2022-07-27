const mockedAuthProvider = {
    auth(callback: ErrorCallback) {
      // Save to db/work some backend magic
      setTimeout(callback, 100);
    },
    signout(callback: ErrorCallback) {
      setTimeout(callback, 100);
    },
  };
export { mockedAuthProvider };