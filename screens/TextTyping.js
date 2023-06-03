import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';
import { Linking } from 'react-native';

function TextTyping({navigation}) {

  const [promptObj, setPromptObj] = useState('')
  const [text, setText] = useState('')

  // OPEN AI API (chatGPT)
  const api_key = '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';
  const model = 'text-davinci-003'
  const prompt = `
  \" ${promptObj} \"
  Please summarize and sort out the details above.
  However, the result must be submitted as html code in body tag
  not including head tag by dividing the title, subtitle, and content.
  for example <h1>heading</h1><p>contents</p>. 
  `;
  const configuration = new Configuration({
    apiKey: api_key
  })
  const openai = new OpenAIApi(configuration)
  const DoSummary = () => {
    const response = openai.createCompletion({
      model: model,
      prompt: prompt,
      max_tokens: 500,
      temperature: 0.5,
    })
    response.then((res) => {
      const summary = res.data.choices[0].text;
      navigation.navigate('MarkDownViewer', {data : summary})
    }).catch((e) => {
      alert(e)
    })
  }

  // 음성 파일로 요약하기 기능
  const openMp3Url = () => {
    const url = 'https://dictation.io/speech'
    const supported = Linking.canOpenURL(url);

    if (supported) { // url을 기본 브라우저에서 오픈 (Webview를 사용할 경우 음성 인식에 제한이 있음)
      Linking.openURL(url)
      navigation.navigate('TextTyping')
    } else {
      alert('오류가 발생했습니다: 링크를 열 수 없습니다.')
    }
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>요약하기</Text>
      <TextInput
      multiline
      style={styles.textInput}
      placeholder='이곳에 수업 내용을 입력하세요.'
      onChangeText={(newText) => {setText(newText)}}
      />
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <TouchableOpacity style={styles.submitBtn} onPress={() => {
          setPromptObj(text);
          // DoSummary
          DoSummary();
        }}>
          <Text style={styles.submitText}>요약 시작</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitVoiceBtn} onPress={() => {openMp3Url()}}>
          <Text style={styles.submitVoiceText}>음성 파일로 요약하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  textInput: {
    width: 265,
    height: 'auto',
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 10,
  },
  submitVoiceBtn: {
    borderWidth: 1,
    borderColor: '#0d6efd',
    padding: 10,
    borderRadius: 5,
    marginStart: 10
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
})

export default TextTyping