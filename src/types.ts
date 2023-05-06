import { ImageURISource } from 'react-native';
export type ImageItemURI = ImageURISource;

export interface ImageViewerProps {
  isVisible: boolean;
  onRequestClose: () => void;
  images: ImageItemURI[];
  initialIndex?: number;
}

export interface FooterProps {
  onNext: () => void;
  disableNextButton: boolean;
  onPrevious: () => void;
  disablePreviousButton: boolean;
}

export interface HeaderProps {
  onClose: () => void;
  currentIndex: number;
  imagesLenght: number;
}
