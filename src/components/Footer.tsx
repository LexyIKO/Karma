import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';


type FooterProps = {
    isHome: boolean;
};



export default function Footer (props: FooterProps){
    const navigation = useNavigation();
    
    return (
        <View style = {styles.footer}>
            <Pressable onPress={() => {
                if(!props.isHome){
                    navigation.navigate('Home' as never)
                }
            }}>
               <FontAwesome5 name="tasks" size={28} color={props.isHome ? 'white' : 'silver'} />

            </Pressable>

            <Pressable onPress={()=>{
                if(props.isHome){
                    navigation.navigate('Profile' as never)
                }
            }}>
                <FontAwesome5 name="user" size={28} color = {props.isHome ? 'silver' : 'white'} />
            </Pressable>
        
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
      flexDirection: 'row',
      backgroundColor: '#007AFF',
      position: 'absolute',
      left: 0,
      bottom: -1,
      width: '100.2%',
      height: 60,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      justifyContent: 'space-around'
    },
    iconActive: {
        opacity: 0.5
    },
    iconDisabled: {
        opacity:  1
    }
});