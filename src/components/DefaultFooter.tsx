/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FooterProps } from 'src/types';

function FooterButton({
  onPress,
  label,
  disabled,
}: {
  onPress: () => void;
  label: string;
  disabled: boolean;
}) {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <Text
        style={[styles.buttonLabel, { color: disabled ? '#808080' : '#fff' }]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function DefaultFooter(props: FooterProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.left}>
        <FooterButton
          onPress={props.onPrevious}
          disabled={props.disablePreviousButton}
          label="Previous"
        />
      </View>
      <View style={styles.right}>
        <FooterButton
          onPress={props.onNext}
          disabled={props.disableNextButton}
          label="Next"
        />
      </View>
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
  left: {
    flex: 1,
    paddingLeft: 16,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  right: {
    flex: 1,
    paddingRight: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttonLabel: {
    fontSize: 20,
  },
});
