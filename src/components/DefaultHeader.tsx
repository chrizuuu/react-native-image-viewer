import React from 'react';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { HeaderProps } from 'src/types';

export function DefaultHeader({
  onClose,
  currentIndex,
  imagesLenght,
}: HeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.closeButtonWrapper}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonIcon}>X</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>
          {currentIndex + 1}/{imagesLenght}
        </Text>
      </View>
      <View style={styles.right} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
  },
  titleWrapper: {
    flex: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 2,
  },
  closeButtonWrapper: {
    flex: 1,
    paddingLeft: 16,
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonIcon: {
    fontSize: 20,
  },
  right: {
    flex: 1,
  },
});
