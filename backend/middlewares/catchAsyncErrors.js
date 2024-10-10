export const catchAsyncErrors = (theFunction) => {   // a function to catch errors
    return (req, res, next) => {
      Promise.resolve(theFunction(req, res, next)).catch(next);
    };
  };