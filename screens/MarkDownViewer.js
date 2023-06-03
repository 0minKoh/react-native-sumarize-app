import React from 'react';
import {StyleSheet, View, ScrollView, Alert} from 'react-native'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { TouchableOpacity, Text } from 'react-native';

function MarkDownViewer({route, navigation}) {

  const { width } = useWindowDimensions();

  // chatGPT result
  let data;
  data = route.params.data;
  data = `<div>${data}</div>`

  return (
    <View style={styles.container}>
      <View style={{flex: 8}}>
        <ScrollView>
          <RenderHtml
          contentWidth={width}
          source={{html: data}}/>
        </ScrollView>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.submitBtn} onPress={() => {navigation.navigate('Main', {summaryStr: data})}}>
          <Text style={styles.submitText}>저장하기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitVoiceBtn} onPress={() => {
          Alert.alert(
            '오류 신고 완료',
            '신고가 정상적으로 접수되었습니다. 내용 개선을 위해 노력하겠습니다.',
            [
              { text: '홈으로', onPress: () => {navigation.navigate('Main')} },
              { text: '다시 입력하기', onPress: () => navigation.navigate('TextTyping') }
            ]
          );
        }}>
          <Text style={styles.submitVoiceText}>오류신고</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  btnContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 25
  },
  submitVoiceBtn: {
    borderWidth: 1,
    borderColor: '#0d6efd',
    padding: 10,
    borderRadius: 5,
    marginStart: 20
  },
  submitBtn: {
    backgroundColor: '#0d6efd',
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    padding: 10,
    borderRadius: 5,
    color: '#fff',
  },
  submitVoiceText: {
    padding: 10,
    borderRadius: 5,
    color: '#0d6efd',
  }
});

export default MarkDownViewer;