import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, SafeAreaView, Pressable, Alert, Image, View, FlatList } from 'react-native';

import Footer from '../components/Footer';
import Header from '../components/Header';
import ListItem from '../components/ListItem';

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

    const [dailyList, setDailyList] = useState<ListItem[]>([
        {text: 'Почистить зубы', key: '1', value: 10, daily: true, isGood: true, timer: 24},
        {text: 'Погулять с собакой', key: '2', value: 15, daily: true, isGood: true, timer: 24},
        {text: 'Утренняя пробежка', key: '3', value: 10, daily: true, isGood: true, timer: 24},
        {text: 'Поесть ровно 3 раза', key: '4', value: 5, daily: true, isGood: true, timer: 24},
        {text: 'Час чтения', key: '5', value: 10, daily: true, isGood: true, timer: 24},
        
    ]);

    const [singleList, SetSingleList] = useState<ListItem[]>([
        {text: 'Купить машину', key: '1', value: 1000, daily: false, isGood: true, timer: 0},
        {text: 'Выкурить сигарету', key: '2', value: 10, daily: false, isGood: false, timer: 0},
        {text: 'Прыгнуть в лужу', key: '3', value: 20, daily: false, isGood: true, timer: 0},
        {text: 'Зайти на турники', key: '4', value: 15, daily: false, isGood: true, timer: 0},
        // {text: 'Пообщаться с семьей', key: '5', value: 30, daily: false, isGood: true, timer: 0},
        // {text: 'Оскорбить человека', key: '6', value: 20, daily: false, isGood: false, timer: 0},
        // {text: 'Помочь незнакомцу', key: '7', value: 20, daily: false, isGood: true, timer: 0},
        // {text: 'Погладить кота', key: '8', value: 5, daily: false, isGood: true, timer: 0},
        // {text: 'Напугать голубя', key: '9', value: 1, daily: false, isGood: false, timer: 0},
    ]);

    return (
        <SafeAreaView style={styles.container}>
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



            <FlatList 
            data={isDaily ? dailyList : singleList} 
            renderItem = {({item}) => (<ListItem el = {item}/>)} 
            style = {styles.scroller}
            />



            <Footer isHome = {true} />
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
        marginTop: 60,
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
    }
    

});

export default Home;
