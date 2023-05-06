import React, { useCallback, useRef, useState } from 'react';
import { ModalContainer } from './components/ModalContainer';
import { StyleSheet, VirtualizedList, useWindowDimensions } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { ImageItemURI, ImageViewerProps } from './types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AnimatedImage } from './components/AnimatedImage';
import useImageIndexChange from './hooks/useImageIndexChange';
import { DefaultFooter } from './components/DefaultFooter';
import { DefaultHeader } from './components/DefaultHeader';

export const ImageViewer = ({
  isVisible,
  onRequestClose,
  images,
  initialIndex = 0,
}: ImageViewerProps) => {
  const listRef = useRef<VirtualizedList<ImageItemURI | undefined>>(null);

  const opacity = useSharedValue(1);
  const { width: SCREEN_WIDTH } = useWindowDimensions();

  const [isFocused, setIsFocused] = useState(true);

  const [currentImageIndex, onScroll, _setImageIndex] =
    useImageIndexChange(initialIndex);

  const onNext = useCallback(() => {
    if (currentImageIndex + 1 <= images.length - 1) {
      listRef.current?.scrollToIndex({
        index: currentImageIndex + 1,
      });
    }
  }, [listRef, currentImageIndex, images.length]);

  const onPrevious = useCallback(() => {
    if (currentImageIndex - 1 >= 0) {
      listRef.current?.scrollToIndex({
        index: currentImageIndex - 1,
      });
    }
  }, [listRef, currentImageIndex]);

  const toggleFocus = useCallback(() => {
    setIsFocused(!isFocused);
  }, [isFocused]);

  const onFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const onUnFocus = useCallback(() => {
    setIsFocused(false);
  }, []);

  const onClose = useCallback(() => {
    onRequestClose();
    onFocus();
  }, [onFocus, onRequestClose]);

  const animatedWrapper = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  }, [opacity]);

  return (
    <ModalContainer isVisible={isVisible} onRequestClose={onRequestClose}>
      <Animated.View style={[styles.container, animatedWrapper]}>
        <GestureHandlerRootView style={styles.gestureContainer}>
          <VirtualizedList
            ref={listRef}
            data={images}
            horizontal
            pagingEnabled
            windowSize={2}
            initialNumToRender={1}
            maxToRenderPerBatch={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={initialIndex}
            getItem={(_, index) => images[index]}
            getItemCount={() => images.length}
            getItemLayout={(_, index) => ({
              length: SCREEN_WIDTH,
              offset: SCREEN_WIDTH * index,
              index,
            })}
            keyExtractor={(_, index) => `${index}`}
            renderItem={({ item }) => (
              <AnimatedImage
                source={item!}
                toggleFocus={toggleFocus}
                onUnFocus={onUnFocus}
                onFocus={onFocus}
              />
            )}
            onScroll={onScroll}
          />
        </GestureHandlerRootView>
        {isFocused ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.header]}
          >
            <DefaultHeader
              currentIndex={currentImageIndex}
              imagesLenght={images.length}
              onClose={onClose}
            />
          </Animated.View>
        ) : null}
        {isFocused ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            style={[styles.footer]}
          >
            <DefaultFooter
              onNext={onNext}
              onPrevious={onPrevious}
              disableNextButton={currentImageIndex >= images.length - 1}
              disablePreviousButton={currentImageIndex - 1 < 0}
            />
          </Animated.View>
        ) : null}
      </Animated.View>
    </ModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gestureContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width: '100%',
    zIndex: 2,
    top: 0,
    position: 'absolute',
  },
  footer: {
    width: '100%',
    zIndex: 2,
    bottom: 0,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});
