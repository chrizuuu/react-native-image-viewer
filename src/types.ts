import { ImageURISource } from 'react-native';
export type ImageItemURI = ImageURISource;

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
