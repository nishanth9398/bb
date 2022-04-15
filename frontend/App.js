import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {
  ActionSheetProvider,
  connectActionSheet,
} from '@expo/react-native-action-sheet';

import groupReducer from './store/reducers/group';
import auth from './store/reducers/auth';
import AppNavigation from './navigation/AppNavigation';

// REDUCERS
const rootReducer = combineReducers({
  groups: groupReducer,
  auth: auth
});

// REDUX STORE
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

// FETCH FONTS
const fetchFonts = () => {
  return Font.loadAsync({
    'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
};

const App = (props) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
      <Provider store={store}>
        <ActionSheetProvider>
          <AppNavigation theme="dark" />
        </ActionSheetProvider>
      </Provider>
  );
};

const ConnectedApp = connectActionSheet(App);

export default ConnectedApp;