import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Pressable } from 'react-native';


interface ListItemProps {
    el:{
        text: string;
        key: string;
        value: number,
        daily: boolean,
        isGood: boolean  
        timer: number //min
    }
}


const ListItem: React.FC<ListItemProps> = ({ el }) =>{

    const PushHandle = () => {
        console.log(el.key);
    }
    
    return (
        <Pressable style = {styles.box} onPress={()=>(PushHandle())}>
            
            <View style = {styles.item}>
                <View style = {el.isGood ? styles.good : styles.bad}></View>
                <View style = {styles.info}>
                    <Text style={{fontSize: 24, fontWeight: "600"}}>{el.text}</Text>
                    <View style={styles.infoBottom}>
                        <Text style={{fontSize: 20, position: 'absolute'}}>{el.isGood ? '+' : '-'}{el.value} pt</Text>
                        <Text style={[styles.timer, {display: el.daily ? 'flex' : 'none'}]}>У вас: 15 мин.</Text>
                    </View>
                </View>
            </View>


        </Pressable>
    )
}

const styles = StyleSheet.create({
    box:{
        height: 80,
        width: 350,
        marginVertical: 10,
    },
    item:{
        marginLeft: 5,
        flexDirection: 'row',
        height: 75,
        width: 320,
        borderRadius: 5,

        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 10,
    },
    info:{
        width: '80%',
        position: 'absolute',
        left: 20,
        top: 5,
    },
    infoBottom:{
        flexDirection: 'row'
    },
    good:{
        backgroundColor: 'green',
        height: '100%',
        width: '3%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    bad:{
        backgroundColor: 'red',
        height: '100%',
        width: '3%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    timer:{
        fontSize: 16,
        position: 'absolute',
        top: 4, 
        right: -30,
    }
    
});

export default ListItem;