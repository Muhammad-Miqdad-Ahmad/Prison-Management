// CustomAlert.js
import React, { useState, createContext, useContext } from 'react';
import { Portal, Dialog, Paragraph, Button, Provider as PaperProvider } from 'react-native-paper';

const AlertContext = createContext();

export const useCustomAlert = () => useContext(AlertContext);

export const CustomAlertProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (text) => {
    setMessage(text);
    setVisible(true);
  };

  const hideAlert = () => setVisible(false);

  return (
    <AlertContext.Provider value={showAlert}>
      <PaperProvider>
        {children}
        <Portal>
          <Dialog visible={visible} onDismiss={hideAlert}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>{message}</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideAlert}>OK</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
    </AlertContext.Provider>
  );
};
