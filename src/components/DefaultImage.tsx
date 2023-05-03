import React from 'react';
import { Image, ImageStyle } from 'react-native';
import { ImageItemURI } from 'src/types';

interface DefaultImageProps {
  source: ImageItemURI;
  onError?: () => void;
  onLoadStart?: () => void;
  onLoad: (width: number, height: number) => void;
  style: ImageStyle;
}

export function DefaultImage(props: DefaultImageProps) {
  return (
    <Image
      source={props.source}
      resizeMode="contain"
      onError={props.onError}
      onLoad={(e) =>
        props.onLoad(e.nativeEvent.source.width, e.nativeEvent.source.height)
      }
      style={props.style}
      onLoadStart={props.onLoadStart}
    />
  );
}
