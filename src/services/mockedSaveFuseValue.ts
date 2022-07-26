const mockedSaveFuseValue = {
    save(value: number, callback: ErrorCallback) {
      setTimeout(callback, 100); // fake async
    }
  };
  
  export { mockedSaveFuseValue };