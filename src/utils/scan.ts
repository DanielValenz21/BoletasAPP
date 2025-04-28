// src/utils/scan.ts
import {launchCamera, CameraOptions, Asset} from 'react-native-image-picker';
import {PermissionsAndroid, Platform} from 'react-native';

export async function scanBoleta(): Promise<Asset | null> {
  // 1. PERMISO ANDROID
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
          title: 'Permiso de cámara', message: 'La app necesita la cámara para escanear',
          buttonPositive: ''
      },
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      throw new Error('Permiso de cámara denegado');
    }
  }

  // 2. OPCIONES
  const opts: CameraOptions = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 0.8,
  };

  // 3. ABRIR CÁMARA
  return new Promise((res, rej) => {
    launchCamera(opts, response => {
      if (response.didCancel) return res(null);
      if (response.errorCode) return rej(new Error(response.errorMessage ?? 'Error cámara'));
      const asset = response.assets?.[0];
      return res(asset ?? null);
    });
  });
}
