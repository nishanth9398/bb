import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  Alert,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentSwipeProfile } from '../../store/actions/swipe';

import ActivityModal from '../../components/UI/ActivityModal';
import HeaderButtom from '../../components/UI/HeaderButton';
import InfoCard from '../../components/InfoCard';
import Colors from '../../constants/Colors';

// TODO: cuando el usuario aun no ha ido a my profile el current id no existe

const ProfilePreviewScreen = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const dispatch = useDispatch();

  const currentProfileId = useSelector((state) => state.userGetProfile.data.id);

  const currentSwipeProfile = useSelector(
    (state) => state.getCurrentSwipeProfile
  );
  const {
    loading: loadingSwipeProfile,
    error: errorSwipeProfile,
    data: swipeProfile,
  } = currentSwipeProfile;

  useEffect(() => {
    dispatch(getCurrentSwipeProfile());
  }, [dispatch]);

  useEffect(() => {
    if (errorSwipeProfile) {
      Alert.alert(`Someting went wrong`, 'Your profile could not be loaded', [
        {
          text: 'OK',
          onPress: () => dispatch(getCurrentSwipeProfile()),
        },
      ]);
    }
  }, [errorSwipeProfile]);

  const showProfile = (profile, isGroup) => {
    props.navigation.navigate('Profile', {
      profile: profile,
      isGroup: isGroup,
      preview: true,
    });
  };

  let cardType;
  let imageStyle;
  // if the profiles array > 1
  if (swipeProfile && !swipeProfile.members) {
    cardType = {
      position: 'absolute',
      width: '95%',
      height: '80%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    };
    imageStyle = {
      borderRadius: 20,
      height: '100%',
    };
  } else {
    cardType = {
      position: 'absolute',
      width: '95%',
      height: '80%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.orange,
    };
    imageStyle = {
      borderBottomRightRadius: 20,
      borderBottomLeftRadius: 20,
      height: '100%',
    };
  }

  if (loadingSwipeProfile) {
    <ActivityModal
      loading
      title="Please wait"
      size="large"
      activityColor="white"
      titleColor="white"
      activityWrapperStyle={{
        backgroundColor: Colors.bg,
      }}
    />;
  }

  return (
    <View style={styles.screen}>
      <View style={{ ...cardType }}>
        {swipeProfile && swipeProfile.members && (
          <View style={styles.groupName}>
            <Text style={styles.text}>Toogether group</Text>
          </View>
        )}
        <Swiper
          activeDot={
            <View
              style={{
                backgroundColor: Colors.orange,
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 4,
              }}
            />
          }
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 4,
              }}
            />
          }
          loop={false}
          removeClippedSubviews={false}
          showsButtons
          buttonWrapperStyle={{ color: Colors.placeholder }}
          style={styles.wrapper}>
          {swipeProfile &&
            swipeProfile.members &&
            swipeProfile.members.map((profile) => {
              return (
                <ImageBackground
                  key={profile.id}
                  imageStyle={{ ...imageStyle, ...styles.card }}
                  resizeMode="cover"
                  source={{ uri: `${BASE_URL}${profile.photos[0].image}` }}
                  style={styles.image}>
                  <InfoCard
                    firstName={profile.firstname}
                    lastName={profile.lastname}
                    city={profile.city}
                    live_in={profile.live_in}
                    age={profile.age}
                    university={profile.university}
                  />
                  {profile.id === currentProfileId && (
                    <TouchableOpacity
                      onPress={() => showProfile(profile, true)}
                      style={styles.arrowContainer}>
                      <Text>A</Text>
                    </TouchableOpacity>
                  )}
                </ImageBackground>
              );
            })}
          {swipeProfile && !swipeProfile.members && (
            <ImageBackground
              imageStyle={{ ...imageStyle, ...styles.card }}
              key={swipeProfile.id}
              resizeMode="cover"
              source={{ uri: `${BASE_URL}${swipeProfile.photos[0].image}` }} // just get the first photo of every profile uri: `http://127.0.0.1:8000${profile.photo}`
              style={styles.image}>
              <InfoCard
                firstName={swipeProfile.firstname}
                lastName={swipeProfile.lastname}
                city={swipeProfile.city}
                live_in={swipeProfile.live_in}
                age={swipeProfile.age}
                university={swipeProfile.university}
              />
              <TouchableOpacity
                onPress={() => showProfile(swipeProfile, false)}
                style={styles.arrowContainer}>
                <Text>A</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
        </Swiper>
      </View>
    </View>
  );
};

ProfilePreviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Profile Preview',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-arrow-back'}
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('MyProfile');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
    tabBarVisible: false,
  };
};

export default ProfilePreviewScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {},
  groupName: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: Colors.orange,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.white,
  },
  arrowContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: Colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 10,
  },
});