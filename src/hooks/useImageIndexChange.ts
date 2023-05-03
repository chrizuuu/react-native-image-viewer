import { useState } from 'react';
import {
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
} from 'react-native';

const useImageIndexChange = (imageIndex: number) => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [currentImageIndex, setImageIndex] = useState(imageIndex);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {
      nativeEvent: {
        contentOffset: { x: scrollX },
      },
    } = event;

    const nextIndex = Math.round(scrollX / SCREEN_WIDTH);
    setImageIndex(nextIndex < 0 ? 0 : nextIndex);
  };

  return [currentImageIndex, onScroll, setImageIndex] as const;
};

export default useImageIndexChange;
