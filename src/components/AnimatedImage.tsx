import React, { useMemo } from 'react';
import { DefaultImage } from './DefaultImage';
import { ImageItemURI } from 'src/types';
import { useWindowDimensions } from 'react-native';
import useImageDimensions from '../hooks/useImageDimensions';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

interface AnimatedImageProps {
  source: ImageItemURI;
  toggleFocus: () => void;
}

export function AnimatedImage({ toggleFocus, ...props }: AnimatedImageProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useImageDimensions();

  const gestures = useMemo(() => {
    const oneTapGesture = Gesture.Tap()
      .numberOfTaps(1)
      .onEnd(() => {
        runOnJS(toggleFocus)();
      });

    return Gesture.Race(Gesture.Exclusive(oneTapGesture));
  }, [toggleFocus]);

  return (
    <View style={[styles.container]} collapsable={false}>
      <GestureDetector gesture={gestures}>
        <View style={styles.gestureContainer}>
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
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    overflow: 'hidden',
  },
  gestureContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
