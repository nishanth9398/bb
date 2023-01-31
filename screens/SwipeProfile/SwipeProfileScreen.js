import React, { useState, useEffect } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  Alert,
  Platform,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { checkMemberInGroup } from '../../utils/checks';
import { getSwipeProfile } from '../../store/actions/swipe';
import { exist } from '../../utils/checks';

import ActivityModal from '../../components/UI/ActivityModal';
import HeaderButtom from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import InfoCard from '../../components/InfoCard';
import SwipeCard from '../../components/SwipeCard';
import Colors from '../../constants/Colors';
import * as w from '../../constants/swipe';

// TODO: manage errors

const SwipeProfileScreen = (props) => {
  const dispatch = useDispatch();
  const mainProfileId = props.navigation.getParam('mainProfileId');
  const isInGroup = props.navigation.getParam('isInGroup');

  const currentSwipeProfile = useSelector((state) => state.getSwipeProfile);

  const {
    loading: loadingSwipeProfile,
    error: errorSwipeProfile,
    data: swipeProfile,
  } = currentSwipeProfile;

  useEffect(() => {
    dispatch(getSwipeProfile(mainProfileId));
  }, []);

  useEffect(() => {
    if (errorSwipeProfile) {
      Alert.alert(`Someting went wrong`, 'Your profile could not be loaded', [
        {
          text: 'OK',
          onPress: () => {
            dispatch({ type: w.GET_SWIPE_PROFILE_RESET });
            props.navigation.goBack();
          },
        },
      ]);
    }
  }, [dispatch, errorSwipeProfile]);

  const showProfile = (profile, isGroup) => {
    if (profile.id === mainProfileId) {
      props.navigation.navigate('Profile', {
        profile: profile,
        isGroup: isGroup,
        preview: true,
      });
    }
  };

  // swap the positions of elements
  const swapElement = (from, to, arr) => {
    const newArr = [...arr];

    const item = newArr.splice(from, 1)[0];
    newArr.splice(to, 0, item);

    return newArr;
  };

  const putOnTopCard = (topCardId, members) => {
    // get the index of the topCard and change it to the top
    const toIndex = 0;
    const fromIndex = members.findIndex((elem) => elem.id === topCardId);

    // if the profile exists in members, return the new ordered array
    if (fromIndex !== -1) {
      const newSwipes = swapElement(fromIndex, toIndex, members);
      return newSwipes;
    }

    return false;
  };

  const getOrderedMembers = () => {
    const orderedMembers = putOnTopCard(mainProfileId, swipeProfile.members);
    return orderedMembers;
  };

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

  if (!mainProfileId) {
    return (
      <View style={styles.screen}>
        <View
          style={{
            position: 'absolute',
            width: '95%',
            height: '80%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.bgCard,
            opacity: 0.5,
          }}>
          <Loader />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={{ width: '95%', height: '105%', padding: 15 }}>
        {exist(swipeProfile) &&
        checkMemberInGroup(mainProfileId, swipeProfile.members) ? (
          <SwipeCard
            key={swipeProfile.id}
            isGroup={isInGroup}
            members={exist(swipeProfile.members) ? getOrderedMembers() : null}
            profile={swipeProfile}
            showProfileHandler={showProfile}
            showProfileRestricted={true}
            allowedProfileId={mainProfileId}
          />
        ) : (
          <Loader />
        )}
      </View>
    </View>
  );
};

SwipeProfileScreen.navigationOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.pop();
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default SwipeProfileScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  card: {
    flex: 1,
  },
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

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 10,
  },
});
