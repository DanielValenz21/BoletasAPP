import {launchCamera, CameraOptions, ImagePickerResponse} from 'react-native-image-picker';

/** Abre la cámara y devuelve la URI de la foto o null si cancelas / error */
export async function openCamera(): Promise<string | null> {
  /* 1. opciones image-picker */
  const options: CameraOptions = {
    mediaType: 'photo',
    quality: 0.8,
    cameraType: 'back',
    presentationStyle: 'fullScreen', // evita crash iOS 17
    saveToPhotos: false,
  };

  /* 2. abrir cámara */
  const res: ImagePickerResponse = await launchCamera(options);

  if (res.didCancel)          return null;
  if (res.errorCode) {
    console.warn('ImagePicker error:', res.errorCode, res.errorMessage);
    return null;
  }

  return res.assets?.[0]?.uri ?? null;
}
