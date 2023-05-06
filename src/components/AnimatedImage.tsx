import React, { useCallback, useMemo } from 'react';
import { DefaultImage } from './DefaultImage';
import { ImageItemURI } from 'src/types';
import { useWindowDimensions } from 'react-native';
import useImageDimensions from '../hooks/useImageDimensions';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface AnimatedImageProps {
  source: ImageItemURI;
  toggleFocus: () => void;
  onUnFocus: () => void;
  onFocus: () => void;
}

export function AnimatedImage({
  toggleFocus,
  onUnFocus,
  onFocus,
  ...props
}: AnimatedImageProps) {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  const [imageDimensions, setImageDimensions] = useImageDimensions();

  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const isZoomedIn = useSharedValue(false);

  const handleTranslateX = useCallback(
    (offsetX: number, scaleValue: number) => {
      const width = imageDimensions.width;
      const maxXOffset =
        width * scaleValue < SCREEN_WIDTH
          ? 0
          : (width * scaleValue - SCREEN_WIDTH) / 2 / scaleValue;

      const isTranslateXOutside = offsetX > maxXOffset || offsetX < -maxXOffset;
      if (isTranslateXOutside) {
        const newOffsetX = offsetX >= 0 ? maxXOffset : -maxXOffset;
        translateX.value = newOffsetX;
      } else {
        translateX.value = offsetX;
      }
    },
    [SCREEN_WIDTH, imageDimensions.width, translateX]
  );

  const handleTranslateY = useCallback(
    (offsetY: number, scaleValue: number) => {
      const height = imageDimensions.height;
      const maxYOffset =
        height * scaleValue < SCREEN_HEIGHT
          ? 0
          : (height * scaleValue - SCREEN_HEIGHT) / 2 / scaleValue;

      const isTranslateYOutside = offsetY > maxYOffset || offsetY < -maxYOffset;
      if (isTranslateYOutside) {
        const newOffsetY = offsetY >= 0 ? maxYOffset : -maxYOffset;
        offsetY = newOffsetY;
        translateY.value = newOffsetY;
      } else {
        translateY.value = offsetY;
      }
    },
    [imageDimensions.height, SCREEN_HEIGHT, translateY]
  );

  const zoomIn = useCallback(
    (tapX: number, tapY: number) => {
      const newScale = 1.9;
      const centerX = SCREEN_WIDTH / 2;
      const centerY = SCREEN_HEIGHT / 2;
      const offsetX = (centerX - tapX) / newScale;
      const offsetY = (centerY - tapY) / newScale;

      scale.value = newScale;
      isZoomedIn.value = true;

      handleTranslateX(offsetX, newScale);
      handleTranslateY(offsetY, newScale);
      onUnFocus();
    },
    [
      SCREEN_WIDTH,
      SCREEN_HEIGHT,
      handleTranslateX,
      handleTranslateY,
      scale,
      isZoomedIn,
      onUnFocus,
    ]
  );

  const zoomOut = useCallback(() => {
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    isZoomedIn.value = false;

    onFocus();
  }, [scale, translateX, translateY, isZoomedIn, onFocus]);

  const handleOneTap = useCallback(() => {
    if (isZoomedIn.value) {
      zoomOut();
    } else {
      toggleFocus();
    }
  }, [isZoomedIn.value, toggleFocus, zoomOut]);

  const handleDoubleTap = useCallback(
    (tapX: number, tapY: number) => {
      if (isZoomedIn.value) {
        zoomOut();
      } else {
        zoomIn(tapX, tapY);
      }
    },
    [zoomIn, zoomOut, isZoomedIn]
  );

  const gestures = useMemo(() => {
    const oneTapGesture = Gesture.Tap()
      .numberOfTaps(1)
      .onEnd(() => {
        runOnJS(handleOneTap)();
      });

    const doubleTapGesture = Gesture.Tap()
      .numberOfTaps(2)
      .maxDuration(500)
      .onEnd((e) => {
        runOnJS(handleDoubleTap)(e.x, e.y);
      });

    return Gesture.Race(Gesture.Exclusive(doubleTapGesture, oneTapGesture));
  }, [handleDoubleTap, handleOneTap]);

  const animationContentContainerStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(scale.value, { duration: 300 }) },
      { translateX: withTiming(translateX.value, { duration: 300 }) },
      { translateY: withTiming(translateY.value, { duration: 300 }) },
    ],
  }));

  return (
    <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}>
      <View style={[styles.container]} collapsable={false}>
        <GestureDetector gesture={gestures}>
          <View style={styles.gestureContainer}>
            <Animated.View style={animationContentContainerStyle}>
              <DefaultImage
                source={props.source}
                onLoad={(width, height) => {
                  setImageDimensions({ width: width, height: height });
                }}
                style={{
                  width: SCREEN_WIDTH,
                  height:
                    (imageDimensions.height * SCREEN_WIDTH) /
                    imageDimensions.width,
                }}
              />
            </Animated.View>
          </View>
        </GestureDetector>
      </View>
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
