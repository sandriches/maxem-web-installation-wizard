const mockedSaveFuseValue = {
    save(value: number, device: string, callback: ErrorCallback) {
      // Save to controller
      setTimeout(callback, 100);
    }
  };
  
  export { mockedSaveFuseValue };