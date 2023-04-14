import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native'
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Button } from 'react-native';

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
        <Button title="홈으로 이동하기" onPress={() => {
          navigation.navigate('Main', {summaryStr: data})
          }}>
          
        </Button>
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
    flex: 1,
    justifyContent: 'center',
  }
});

export default MarkDownViewer;