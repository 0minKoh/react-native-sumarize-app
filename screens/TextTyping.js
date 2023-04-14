import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet, View, Text } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';

function TextTyping({navigation}) {

  const [promptObj, setPromptObj] = useState('')
  const [text, setText] = useState('')

  const api_key = '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';
  const model = 'text-davinci-003'
  const prompt = `
  \" ${promptObj} \"
  Please summarize and sort out the details above. However, the result must be submitted as html code in body tag not including head tag by dividing the title, subtitle, and content. for example <h1>heading</h1><p>contents</p>. 
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
      console.log(e)
      alert(e, 'error: 404 | 502')
    })
  }
  
  return (
    <View style={styles.container}>
      <TextInput
      style={{height: 40}}
      placeholder='write the contents of lecture'
      onChangeText={(newText) => {setText(newText)}}
      />
      <TouchableOpacity style={styles.submitBtn} onPress={() => {
        setPromptObj(text);
        // DoSummary
        DoSummary();
      }}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
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
  submitBtn: {
    backgroundColor: '#0d6efd',
    padding: 10,
    borderRadius: 5,
  },
  submitText: {
    padding: 10,
    borderRadius: 5,
    color: '#fff',
  }
})

export default TextTyping