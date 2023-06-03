import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Modal, Button, Alert } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import RenderHtml from 'react-native-render-html';
import { useEffect, useState } from 'react';

function Main({route, navigation}) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null); // 저장된 요약노트의 index 선택
  const [summaryList, setSummaryList] = useState([]); // MarkDownViewer.js로부터 받아온 openai 응답값을 저장하는 array

  var summaryStr = route.params?.summaryStr // route로부터 (MarkDownViewer.js의 openai 응답 데이터) 데이터를 받아와 summaryStr 변수에 저장

  useEffect(() => {
    if (summaryStr) { // 처음 앱을 실행하는 경우 실행되지 않음
      // SummaryList에 summaryStr 값을 push
      var newSummaryList = [...summaryList];
      newSummaryList.push(summaryStr);
      setSummaryList(newSummaryList);
    };
  }, [summaryStr]);

  useEffect(() => {
    console.log('summaryList: ', summaryList);
  }, [renderButtons]);

  // NoteList 버튼 생성 함수
  const renderButtons = () => {
    return summaryList.map((el, i) => ( // SummaryList의 요소의 개수만큼 생성
      <TouchableOpacity style={styles.toDo} key={i} onPress={() => setSelectedItemIndex(i)}>
        <Text style={styles.toDoText}>{i+1}번째 수업 내용입니다</Text>
      </TouchableOpacity>
    ))
  }

  // NoteList의 버튼을 눌렀을 때 내용이 보여지는 Modal을 생성
  const renderModal = () => {
    if (selectedItemIndex != null) {
      var selectedContent = summaryList[selectedItemIndex] // 선택한 버튼에 맞는 요약 내용을 가져옴

      return (
        <Modal visible={selectedItemIndex !== null} animationType='slide'>
          <ScrollView style={{height: 200, paddingHorizontal: 30, paddingVertical: 40}}>
            <RenderHtml
            contentWidth={300}
            source={{html: selectedContent}}/>
          </ScrollView>
          <View style={{height: 40, marginBottom: 30, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
            <Button title="닫기" onPress={() => setSelectedItemIndex(null)}></Button>
            <Button color="red" title="삭제" onPress={() => {
              Alert.alert('정말 삭제하시겠습니까?', '이 노트가 영구히 삭제됩니다!', [
                {text: '삭제', style: 'destructive', onPress: () => {
                  var newSummaryList = [...summaryList];
                  newSummaryList.splice(selectedItemIndex, 1);
                  setSummaryList(newSummaryList);
                }},
                {text: '취소'}
              ])
              setSelectedItemIndex(null)
            }}></Button>
          </View>
        </Modal>
      )
    } else {
      return null
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.roundedBtn}
          onPress={() => {
          navigation.push('TextTyping')
          }}>
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
