import { Alert } from 'react-native';

// funcion that check error that are no coming from the frontend and return a message to the user
export const checkServerError = (
  errorFromServer,
  customTitle,
  customMessage
) => {
  let message = { title: '', message: '' };

  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.code === 'ERR_NETWORK'
  ) {
    message = {
      title: 'Internet Error',
      message: 'Please check your internet connection and try again',
    };
  }

  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.response.status === 500
  ) {
    message = {
      title: 'Server error',
      message: errorFromServer.response.status,
    };
  }

  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.response.status === 403
  ) {
    message = { title: 'Permission Error', message: 'Check your data' };
  }
  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.response.status === 401
  ) {
    message = {
      title: 'Permission Denied',
      message:
        'This can happen for a lot of reasons, please try to login again',
    };
  }

  if (!errorFromServer) {
    return null;
  }

  if (!message.title && !message.message) {
    return null;
  }

  return errorFromServer
    ? Alert.alert(message.title, message.message, [{ text: 'OK' }])
    : null;
};

export const check400Error = (errorFromServer, nameBackendField) => {
  let message = { title: '', message: '' };

  if (
    errorFromServer.response &&
    errorFromServer?.response?.data &&
    errorFromServer?.response?.data?.detail
  ) {
    message = {
      title: 'An error has occurred',
      message: errorFromServer.response.data.detail,
    };
  }

  if (
    errorFromServer.response &&
    errorFromServer.response?.hasOwnProperty('data') &&
    errorFromServer.response?.data?.hasOwnProperty('non_field_errors')
  ) {
    message = {
      title: 'An error has occurred',
      message: errorFromServer.response.data.non_field_errors[0],
    };
  }

  if (
    errorFromServer &&
    nameBackendField &&
    errorFromServer.response !== undefined &&
    errorFromServer.response.data !== undefined &&
    errorFromServer.response.data[nameBackendField] !== undefined
  ) {
    message = {
      title: `Error with ${nameBackendField}`,
      message: errorFromServer.response.data[nameBackendField][0],
    };
  }

  if (!message.title && !message.message) {
    return null;
  }

  return errorFromServer
    ? Alert.alert(message.title, message.message, [{ text: 'OK' }])
    : null;
};

// return the response of the serializer
export const getFieldErrorFromServer = (
  errorFromServer,
  nameBackendField,
  text
) => {
  if (
    errorFromServer &&
    errorFromServer.response !== undefined &&
    errorFromServer.response.data !== undefined &&
    errorFromServer.response.data[nameBackendField] !== undefined
  ) {
    return errorFromServer.response.data[nameBackendField][0];
  }

  return '';
};
