import React, { createContext, useState } from "react";

// Create two context:
// OptionContext: to query the context state
// OptionDispatchContext: to mutate the context state
const OptionContext = createContext(undefined);
const OptionDispatchContext = createContext(undefined);
// const OptionContext = React.createContext();

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function OptionProvider({ children }) {
  const [isAbsoluteDate, setIsAbsoluteDate] = useState(true);
  const [isFullName, setIsFullName] = useState(false);

  const values ={ isAbsoluteDate, setIsAbsoluteDate, isFullName,setIsFullName };

  return (
    <OptionContext.Provider value={values}>
      {/* <OptionDispatchContext.Provider value={setIsAbsoluteDate}> */}
      {children}
      {/* </OptionDispatchContext.Provider> */}
    </OptionContext.Provider>
  );
}

export { OptionProvider, OptionContext, OptionDispatchContext };