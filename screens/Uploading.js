import { useEffect } from 'react';
import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text} from 'react-native';


function Uploading() {

  useEffect(() => {
    
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>텍스트로 변환 중...</Text>
      <Text style={{marginBottom: 40}}>음성 파일을 텍스트로 변환하고 있어요.</Text>
      <ActivityIndicator size="large" color="red"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 10,
  }
});

export default Uploading;