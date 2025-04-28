// src/utils/openCamera.ts
import {launchCamera, CameraOptions, Asset} from 'react-native-image-picker';

/** Objeto de retorno simplificado */
export interface CameraResult {
  base64?: string;
  uri?: string;
}

/**
 * Abre la cámara y resuelve con la imagen en base64 + uri
 * Devuelve null si el usuario cancela
 */
export function openCamera(): Promise<CameraResult | null> {
  return new Promise((resolve, reject) => {
    const options: CameraOptions = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: true,
      saveToPhotos: false,
    };

    launchCamera(options, response => {
      // Usuario canceló
      if (response.didCancel) {
        resolve(null);
        return;
      }

      // Error nativo
      if (response.errorCode) {
        reject(
          new Error(
            response.errorMessage ?? `Camera error (${response.errorCode})`,
          ),
        );
        return;
      }

      // Imagen capturada
      const asset: Asset | undefined = response.assets?.[0];
      if (!asset) {
        reject(new Error('La cámara no devolvió ninguna imagen'));
        return;
      }

      resolve({base64: asset.base64, uri: asset.uri});
    });
  });
}
