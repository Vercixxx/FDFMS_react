import React, { createContext, useContext, useCallback } from 'react';
import { SnackbarProvider as NotistackSnackbarProvider, useSnackbar, VariantType } from 'notistack';

interface ISnackbarContext {
  showSnackbar: (message: string, variant: VariantType) => void;
}

const SnackbarContext = createContext<ISnackbarContext | undefined>(undefined);

export const SnackbarProvider: React.FC = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = useCallback((message: string, variant: VariantType) => {
    enqueueSnackbar(message, { variant });
  }, [enqueueSnackbar]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <NotistackSnackbarProvider maxSnack={3}>
        {children}
      </NotistackSnackbarProvider>
    </SnackbarContext.Provider>
  );
};

export const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbarContext must be used within a SnackbarProvider');
  }
  return context;
};