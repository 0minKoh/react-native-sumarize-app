import React from 'react';
import "react-native-gesture-handler"; 
import { View, Text, Image, StyleSheet } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const AppIntro = ({ navigation }) => {

  // AppIntroSlider
  const slides = [
    {
      key: 'slide1',
      // title: 'Welcome to My App',
      // text: 'This is a guide to help you get started with the app.',
      image: require('../assets/intro_test.png'),
    },
    {
      key: 'slide2',
      // title: 'Features',
      // text: 'Discover all the features of the app and how they can help you.',
      image: require('../assets/intro_test.png'),
    },
    {
      key: 'slide3',
      // title: 'Get Started',
      // text: 'Create your account and start using the app today.',
      image: require('../assets/intro_test.png'),
    },
  ];
  const handleDone = () => { // done 버튼을 눌렀을 때 실행됨
    navigation.navigate('Main');
  };
  const onSkip = () => { // Skip 버튼을 눌렀을 때 실행됨
    navigation.navigate('Main')
  }
  const renderSlide = ({ item }) => {
    return (
      <View>
        <Image source={item.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={renderSlide}
      onDone={handleDone}
      showSkipButton={true}
      onSkip={onSkip}
      bottomButton
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 10,
  },
})

export default AppIntro