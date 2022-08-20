import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useCallback,
} from 'react';
import {
  Image,
  View,
  Button,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles';
import Colors from '../../constants/Colors';
import AuthInput from '../../components/UI/AuthInput';
import AuthButton from '../../components/UI/AuthButton';
import * as c from '../../constants/user';
import { userRegister, userLogin } from '../../store/actions/user';

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_UPDATE) {
    const updatedValued = {
      ...state.inputValues, // old input value
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities, // old input validity
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      // if there are all true so the form is valid
      updatedFormIsValid = updatedValidities[key] && updatedFormIsValid;
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValued,
    };
  }
  return state;
};

const AuthStartScreen = (props) => {
  const register = props.navigation.getParam('register');
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      repeated_password: '',
    },
    inputValidities: {
      email: false,
      password: true,
      repeated_password: true,
    },
    formIsValid: false,
  });

  const { formIsValid, inputValues } = formState;

  // REGISTER REDUCER
  const userRegisterReducer = useSelector((state) => state.userRegister);
  const {
    loading: registerLoading,
    data: registerData,
    success: registerSuccess,
    error: registerError,
  } = userRegisterReducer;

  // LOGIN REDUCER
  const userLoginReducer = useSelector((state) => state.userLogin);
  const {
    loading: loginLoading,
    data: loginData,
    success: loginSuccess,
    error: loginError,
  } = userLoginReducer;

  // REGISTER
  useEffect(() => {
    if (registerError) {
      //TODO: whats up with network error ?
      Alert.alert('An Error Occurred!', registerError.response.data.detail, [
        { text: 'Okay' },
      ]);
    }
    if (register && registerSuccess) {
      props.navigation.navigate('Success', { register: register });
    }
    dispatch({ type: c.USER_REGISTER_RESET });
  }, [register, registerError, registerSuccess]);

  // LOGIN
  useEffect(() => {
    if (loginError) {
      Alert.alert('An Error Occurred!', loginError.response.data.detail, [
        { text: 'Okay' },
      ]);
      dispatch({ type: c.USER_LOGIN_RESET });
    }

    if (loginSuccess && loginData.has_account) {
      props.navigation.navigate('Swipe');
      // TODO: no reset and save the data again in the local storage
    }

    //TODO: fix dont go to the screen is there is no loginData
    if (loginSuccess && !loginData.has_account) {
      props.navigation.navigate('Success', { register: register });
    }
  }, [loginError, loginSuccess]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  const handleRegister = () => {
    if (formIsValid) {
      dispatch(
        userRegister(
          inputValues.email,
          inputValues.password,
          inputValues.repeated_password
        )
      );
    }
  };

  const handleLogin = () => {
    if (formIsValid) {
      dispatch(userLogin(inputValues.email, inputValues.password));
    }
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.auth_text_view}>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_big}>
            {register ? 'Lets create your account!' : 'Lets sign you in'}
          </Text>
        </View>
        <View style={styles.auth_text_container}>
          <Text style={styles.auth_text_small}>
            {register ? 'Welcome ;)' : 'Welcome back'}
          </Text>
        </View>
      </View>
      <KeyboardAvoidingView behavior={'position'}>
        <ScrollView
          style={styles.scrollview_style}
          contentContainerStyle={styles.scrollview_content_container}
          automaticallyAdjustKeyboardInsets={true}>
          <View style={styles.auth_input_container}>
            <AuthInput
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              autoComplete="email"
              autoCapitalize="none"
              errorText="Enter your email"
              placeholder="hello@example@gmail.com"
              placeholderTextColor="#D8D8D8"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
            />
            <AuthInput
              secureTextEntry={true}
              textContentType={'password'}
              id="password"
              label="Password"
              keyboardType="default"
              required
              autoCapitalize="none"
              errorText="Enter your password"
              autoCorrect={false}
              onInputChange={inputChangeHandler}
            />
            {register && (
              <AuthInput
                secureTextEntry={true}
                textContentType={'password'}
                required
                autoCapitalize="none"
                id="repeated_password"
                label="Repeat your password"
                keyboardType="default"
                errorText="Enter your password"
                autoCorrect={false}
                onInputChange={inputChangeHandler}
              />
            )}
            {registerLoading || loginLoading ? (
              <View style={styles.auth_loader_container}>
                <ActivityIndicator size="large" />
              </View>
            ) : (
              <AuthButton
                text={register ? 'Create account' : 'Login'}
                onPress={register ? handleRegister : handleLogin}
              />
            )}
            <Button
              style={styles.auth_text_button}
              color={'#4A4A4A'}
              title={
                register
                  ? 'You already have an account?'
                  : 'You dont have an account?'
              }
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AuthStartScreen;
