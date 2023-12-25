import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Pressable,  View, FlatList, Modal, TextInput, Platform, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const statusBarHeight = Constants.statusBarHeight;


import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';

import { Entypo } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

interface ListItem {
    text: string;
    key: string;
    value: number,
    daily: boolean,
    isGood: boolean,
    timer: number //hours
}

const Home: React.FC = () => {
    const [isDaily, setIsDaily] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [dailyList, setDailyList] = useState<ListItem[]>([
        // {text: 'Почистить зубы', key: '1', value: 10, daily: true, isGood: true, timer: 24},
        // {text: 'Погулять с собакой', key: '2', value: 15, daily: true, isGood: true, timer: 24},
        // {text: 'Утренняя пробежка', key: '3', value: 10, daily: true, isGood: true, timer: 24},
        // {text: 'Поесть ровно 3 раза', key: '4', value: 5, daily: true, isGood: true, timer: 24},
        {text: 'Час чтения', key: '5', value: 10, daily: true, isGood: true, timer: 24},
        {text: 'Утренняя пробежка', key: '6', value: 10, daily: true, isGood: true, timer: 24},
        {text: 'Поесть ровно 3 раза', key: '7', value: 5, daily: true, isGood: true, timer: 24},
        // {text: 'Час чтения', key: '5', value: 8, daily: true, isGood: true, timer: 24},
        
    ]);

    const [singleList, setSingleList] = useState<ListItem[]>([
        {text: 'Купить машину', key: '1', value: 1000, daily: false, isGood: true, timer: 0},
        {text: 'Выкурить сигарету', key: '2', value: 10, daily: false, isGood: false, timer: 0},
        {text: 'Прыгнуть в лужу', key: '3', value: 20, daily: false, isGood: true, timer: 0},
        // {text: 'Зайти на турники', key: '4', value: 15, daily: false, isGood: true, timer: 0},
        // {text: 'Пообщаться с семьей', key: '5', value: 30, daily: false, isGood: true, timer: 0},
        // {text: 'Оскорбить человека', key: '6', value: 20, daily: false, isGood: false, timer: 0},
        // {text: 'Помочь незнакомцу', key: '7', value: 20, daily: false, isGood: true, timer: 0},
        // {text: 'Погладить кота', key: '8', value: 5, daily: false, isGood: true, timer: 0},
        // {text: 'Напугать голубя', key: '9', value: 1, daily: false, isGood: false, timer: 0},
    ]);

    //Для новой задачи
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [newText, setNewText] = useState<string>('');
    const [newValueStr, setNewValueStr] = useState<string>('');
    const [newValue, setNewValue] = useState<number>(0);
    const [newDaily, setNewDaily] = useState<boolean>(false);
    const [newIsGood, setNewIsGood] = useState<boolean>(false);
    const [newTimer, setNewTimer] = useState<number>(0);

    const setNewValueToTimer = (string: string) => {
        const numericValue = Number(string);
        setNewTimer(numericValue);
    };

    const SetDefaultValueToNewTask = () => {
        setNewText('');
        setNewValue(0);
        setNewDaily(false);
        setNewIsGood(false);
        setNewTimer(0);
        setNewValueStr('');
        setIsFormValid(false);
    }

    const validateForm = () => {
        if(newText && (newValueStr)){
            setNewValue(Number(newValueStr));
            if(newValue != 0 && !isNaN(newValue)){
                setIsFormValid(true);
            }
        }
    };

    const AddNewTask = () => {
        
        validateForm();
        if(isFormValid){
            if(newDaily){
                setDailyList((dailyList) => [
                    {
                      text: newText,
                      key: Math.random().toString(36).substring(7),
                      value: newValue,
                      daily: newDaily,
                      isGood: newIsGood,
                      timer: newTimer,
                    },
                    ...dailyList,
                  ]);
            }
            else{
                setSingleList((singleList) => [
                    {
                      text: newText,
                      key: Math.random().toString(36).substring(7),
                      value: newValue,
                      daily: newDaily,
                      isGood: newIsGood,
                      timer: newTimer,
                    },
                    ...singleList,
                  ]);
            }
            SetDefaultValueToNewTask();
            setModalVisible(!modalVisible);
        } else {
            Alert.alert("Заполните поля корректно");
        }
        
    }

    const CanselAddNewTast = () => {
        SetDefaultValueToNewTask();
        setModalVisible(!modalVisible);
    }

    const deleteElement = (key: string) => {
        setDailyList((dailyList) => dailyList.filter((item) => item.key !== key));
        setSingleList((singleList) => singleList.filter((item) => item.key !== key));
    };

    useEffect(()=>{
        validateForm();
    });
  

    return (
        <SafeAreaView style={[styles.container, { paddingTop: Platform.OS === 'android' ? statusBarHeight : 0}]}>
            <Header title='Главная' />

            <View style = {styles.taskButtonConteiner}>
                <Pressable
                    onPress={() => {isDaily ? setIsDaily(false): null}}
                    style={isDaily ? styles.taskButton : styles.taskButtonActive}
                >
                    <Text style={styles.taskButtonText}>Разовые</Text>
                </Pressable>
                <Pressable
                    onPress={() => {!isDaily ? setIsDaily(true): null}}
                    style={isDaily ? styles.taskButtonActive : styles.taskButton}
                >
                    <Text style={styles.taskButtonText}>Повторяющиеся</Text>
                </Pressable>
            </View>

            <View style = {
               {height: 500, marginBottom: 15}
            }>
                <FlatList 
                data={isDaily ? dailyList : singleList} 
                renderItem = {({item}) => (<ListItem el = {item} deleteElement = {deleteElement}/>)} 
                style = {styles.scroller}
                
                />
            </View>
            
            <Entypo 
                name="circle-with-plus" 
                size={36} 
                color="gray" 
                onPress={()=>(setModalVisible(true))}
                style = {styles.plus}
                />

            <Footer isHome = {true} />

            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={()=> setModalVisible(!modalVisible)}
                
              >
                <Text style={{fontSize: 30, textAlign:'center', marginTop: 20}}>Добавить задачу</Text>
                <View style = {styles.modalBlock}>
                    <View 
                        style = {
                        newDaily ? [styles.modalColoredBox, {backgroundColor: 'purple'}] : 
                            (newIsGood ? [styles.modalColoredBox, {backgroundColor: 'green'}] 
                                : [styles.modalColoredBox, {backgroundColor: 'red'}])
                        }
                    ></View>

                    <View style = {{marginHorizontal: 10, width: '95%'}}>
                        <TextInput 
                            placeholder='Задача'
                            value={newText}
                            onChangeText={setNewText}
                            style = {styles.modalInput}
                        />
                        <TextInput 
                            placeholder='Количество очков'
                            inputMode="numeric"
                            value={newValueStr}
                            onChangeText={setNewValueStr}
                            style = {styles.modalInput}
                        />

                        <View style = {{flexDirection:'row', marginTop: 15, marginLeft: 10}}>
                            <Text style={{fontSize: 24}}>Повторяется:</Text>
                            <Fontisto 
                                name={newDaily ? "checkbox-active" : "checkbox-passive"} 
                                size={24} 
                                color="black" 
                                onPress={()=>(setNewDaily(!newDaily))}
                                style = {{marginLeft: 10, marginTop: 5}}
                            />
                        </View>

                        <View style = {newDaily ? {display:'none'} : {flexDirection:'row', marginTop: 15, marginLeft: 10} }>
                            <Text style={{fontSize: 24}}>Хорошая:</Text>
                            <Fontisto 
                                name={newIsGood ? "checkbox-active" : "checkbox-passive"} 
                                size={24} 
                                color="black" 
                                onPress={()=>(setNewIsGood(!newIsGood))}
                                style = {{marginLeft: 10, marginTop: 5}}
                            />
                        </View>

                        <View style = {!newDaily ? {display:'none'} : {flexDirection:'row', marginTop: 15,} }>
                            <TextInput 
                                placeholder='Время на выполнение (ч.)'
                                inputMode="numeric"
                                onChangeText={setNewValueToTimer}
                                style = {[styles.modalInput, {fontSize: 20}]}
                            />
                        </View>
                    </View>
                </View>

                <View style = {{flexDirection: 'row', marginTop: 30, justifyContent:'space-around', marginHorizontal: 30}}>
                    <Pressable
                        style = {styles.modalButton}
                        onPress={CanselAddNewTast}
                    >
                        <Text style={{fontSize: 20}}>Отмена</Text>
                    </Pressable>

                    <Pressable
                        style = {styles.modalButton}
                        onPress={AddNewTask}
                    >
                        <Text style={{fontSize: 20}}>Добавить</Text>
                    </Pressable>
                </View>

            </Modal>

            <StatusBar style='auto'/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        
    },
    taskButtonConteiner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 30,
        marginBottom: 15,
    },
    taskButton: {
      
    },
    taskButtonActive: {
        backgroundColor: 'white',
        shadowColor: '#171717',
        elevation: 10,
        paddingTop: 3,
        paddingBottom: 3,
        paddingRight: 6,
        paddingLeft: 6,
        borderRadius: 5,
    },
    taskButtonText: {
        fontSize: 20
    },
    ContentConteiner:{
        width: "100%",
        marginTop: 5,
    },
    scroller: {
        height: 200,
        width: '95%',
        marginLeft: 5
    },
    plus:{
        position: 'absolute',
        right: 30,
        bottom: 80
    },
    modalBlock:{
        flexDirection: 'row',
        backgroundColor: '#e6e6e6',
        width: '94%',
        height: 200,
        marginTop: 20,
        marginLeft: '2%',
        shadowColor: 'black',
        elevation: 10,
        borderRadius: 5,
    },
    modalButton: {
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 2,
        shadowColor: 'black',
        elevation: 10,
    },
    modalInput: {
        marginTop: 10,
        paddingLeft: 10,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderWidth: 2,
        borderColor: '#369bff',
        width: '95%',
        fontSize: 24,
        
    },
    modalColoredBox:{
        height: '100%',
        width: '3%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    
    

});

export default Home;
