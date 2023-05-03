import { useState } from 'react';
import { Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('screen');

const useImageDimensions = () => {
  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: windowDimensions.width,
    height: windowDimensions.height,
  });

  return [imageDimensions, setImageDimensions] as const;
};

export default useImageDimensions;
