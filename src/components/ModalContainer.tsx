import React from 'react';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Modal, View } from 'react-native';

interface ModalContainerProps {
  isVisible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}

export function ModalContainer(props: ModalContainerProps) {
  return (
    <Modal
      transparent
      animationType="fade"
      presentationStyle="overFullScreen"
      visible={props.isVisible}
      onRequestClose={props.onRequestClose}
    >
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.wrapper}>{props.children}</View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flex: 1,
  },
});
