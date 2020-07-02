import React from 'react';

const BackdropContext = React.createContext({show: true, modalClosed: () => {} });

export default BackdropContext;