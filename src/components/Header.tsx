import React from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Alert, Image, TouchableWithoutFeedback } from 'react-native';


type HeaderProps = {
    title: string;
};



export default function Header (props: HeaderProps){
    
    return (
        <View style = {styles.haeder}>
            <Text style = {styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    haeder: {
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        backgroundColor: '#007AFF',
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        height: 40,
      
    },
    title:{
        fontSize: 28,
        fontWeight: "500",
        textAlign: "center",
        color: "white"
    },
    
   
});