import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import { FIREBASE_AUTH, FIRESTORE_DB } from './firebase-config';
import { doc, getDoc } from "firebase/firestore";


const UserData: React.FC = () => {
    const [login, setLogin] = useState<string | undefined>('Гость');
    const [email, setEmail] = useState<string | undefined>('Не указан');
    const [rating, setRating] = useState<string | undefined>('0');
    const [karma, setKarma] = useState<string | undefined>('0');

    const userId : string | undefined = FIREBASE_AUTH.currentUser?.uid;

    const getInfo = async (field: string) : Promise<string | undefined> => { 
        if(userId){
            const docRef = doc(FIRESTORE_DB, 'user-info', userId);
            const docInfo = await getDoc(docRef);
            if(field === 'login'){
            return docInfo.data()?.login
            }
            else if (field === 'email'){
            return docInfo.data()?.email
            }
            else if (field === 'rating'){
            return docInfo.data()?.rating
            }
            else if (field === 'karma'){
            return docInfo.data()?.karma
            }
        }
    }

    const UpdateState = async () => {
        try {
            setEmail(await getInfo('email'));
            setLogin(await getInfo('login'));
            setRating(await getInfo('rating'));
            setKarma(await getInfo('karma'));
            
        } catch (error: any) {
            Alert.alert('Ошибка загрузки данных!');
        }
    }

    useEffect(() => {
        UpdateState();
    }, []);

    return (
        <View></View>
    );
}

export default UserData;
