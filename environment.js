import Constants from 'expo-constants';
import { Platform } from 'react-native';

const getApiUrl = () => {
  const MODE = String(Constants.manifest.extra.MODE);
  const IOS_LOCAL_URL = String(Constants.manifest.extra.IOS_LOCAL_URL);
  const ANDROID_LOCAL_URL = String(Constants.manifest.extra.ANDROID_LOCAL_URL);
  const ROCKET_API_URL = String(Constants.manifest.extra.ROCKET_API_URL);

  const iosDevelop = {
    MODE: MODE,
    API_URL: IOS_LOCAL_URL,
  };

  const androidDevelop = {
    MODE: MODE,
    API_URL: ANDROID_LOCAL_URL,
  };

  const rocket = {
    MODE: MODE,
    API_URL: ROCKET_API_URL,
  };

  if (MODE === 'development') {
    if (Platform.OS === 'ios') {
      return iosDevelop;
    }
    return androidDevelop;
  }

  if (MODE === 'rocket') {
    if (!ROCKET_API_URL) {
      throw new Error('API_URL is missing.');
    }

    return rocket;
  }
};

export const ENV = getApiUrl();
