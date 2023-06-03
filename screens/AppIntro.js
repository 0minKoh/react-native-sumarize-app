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
      image: require('../assets/screen1.png'),
    },
    {
      key: 'slide2',
      // title: 'Features',
      // text: 'Discover all the features of the app and how they can help you.',
      image: require('../assets/screen2.png'),
    },
    {
      key: 'slide3',
      // title: 'Get Started',
      // text: 'Create your account and start using the app today.',
      image: require('../assets/screen3.png'),
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

  const renderNextButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.buttonText}>Next</Text>
      </View>
    );
  };

  const renderDoneButton = () => {
    return (
      <View style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </View>
    )
  }

  // skip 버튼 스타일
  const renderSkipButton = () => {
    return (
      <View style={styles.buttonReverse}>
        <Text style={styles.buttonTextReverse}>Skip</Text>
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={slides}
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      renderDoneButton={renderDoneButton}
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
  button: {
    backgroundColor: '#E31937', // 원하는 색상으로 변경
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center'
  },
  buttonReverse: {
    backgroundColor: 'white', // 원하는 색상으로 변경
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonTextReverse: {
    color: '#E31937',
    fontSize: 18,
    textAlign: 'center'
  },
})

export default AppIntro