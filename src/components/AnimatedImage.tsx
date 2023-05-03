import React from 'react';
import { DefaultImage } from './DefaultImage';
import { ImageItemURI } from 'src/types';
import { useWindowDimensions } from 'react-native';
import useImageDimensions from '../hooks/useImageDimensions';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';

interface AnimatedImageProps {
  source: ImageItemURI;
}

export function AnimatedImage(props: AnimatedImageProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useImageDimensions();

  return (
    <View style={[styles.container]} collapsable={false}>
      <DefaultImage
        source={props.source}
        onLoad={(width, height) => {
          setImageDimensions({ width: width, height: height });
        }}
        style={{
          width: SCREEN_WIDTH,
          height:
            (imageDimensions.height * SCREEN_WIDTH) / imageDimensions.width,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
});
