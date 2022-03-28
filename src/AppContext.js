import React from 'react';

const AppContext = React.createContext({
    loading: false,
    setLoading: (t) => {},
  });

export default AppContext;