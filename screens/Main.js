import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList, Modal, Button } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import RenderHtml from 'react-native-render-html';
import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

function Main({route, navigation}) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [summaryList, setSummaryList] = useState([]);
  const isFocused = useIsFocused

  const renderButtons = () => {
    return summaryList.map((el, i) => (
      <TouchableOpacity style={styles.toDo} key={i} onPress={() => setSelectedItemIndex(i)}>
        <Text style={styles.toDoText}>{i+1}번째 수업 내용입니다.</Text>
      </TouchableOpacity>
    ))
  }

  var summaryStr = route.params?.summaryStr

  useEffect(() => {
    if (summaryStr) {
      var newSummaryList = [...summaryList];
      newSummaryList.push(route.params.summaryStr);
      setSummaryList(newSummaryList);
      console.log('summaryStr: ', summaryStr);
    };
  }, [summaryStr]);

  useEffect(() => {
    console.log('summaryList: ', summaryList);
  }, [renderButtons]);

  const renderModal = () => {
    if (selectedItemIndex != null) {
      const selectedContent = summaryList[selectedItemIndex]

      return (
        <Modal visible={selectedItemIndex !== null} animationType='slide'>
          <ScrollView style={{height: 200, paddingHorizontal: 30, paddingVertical: 40}}>
            <RenderHtml
            contentWidth={300}
            source={{html: selectedContent}}/>
          </ScrollView>
          <View style={{height: 40, marginBottom: 30}}>
            <Button title="close" onPress={() => setSelectedItemIndex(null)}></Button>
          </View>
        </Modal>
      );
    } else {
      return null
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        style={styles.roundedBtn}
        onPress={() => {navigation.push('TextTyping')}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Fontisto name='upload' color={'#fff'} size={30}></Fontisto>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.boardContainer}>
        <Text style={styles.title}>Note</Text>
        {summaryList.length >= 1 ? 
        <ScrollView>
          {renderButtons()}
          {renderModal()}
        </ScrollView> : <Text>아직 노트가 없습니다.</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
  },
  // button
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  roundedBtn: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#3A3D40',
  },

  // Board
  boardContainer: {
    flex: 2
  },
  title: {
    fontWeight: 700,
    fontSize: 32,
    marginBottom: 10,
  },
  toDo: {
    backgroundColor: "#5C5C60",
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toDoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Main;
