import { StyleSheet, Text, SafeAreaView, Alert } from 'react-native';4
import { useState, useEffect } from 'react';

import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase-config';
import { doc, getDoc } from "firebase/firestore";

import { FontAwesome5, SimpleLineIcons } from '@expo/vector-icons';

import Footer from '../components/Footer';
import Header from '../components/Header';
import UserData from '../../data';

const Profile: React.FC = () => {

  
  const [login, setLogin] = useState<string | undefined>('Гость');
  const [email, setEmail] = useState<string | undefined>('Не указан');
  const [rating, setRating] = useState<string | undefined>('0');
  const [karma, setKarma] = useState<string | undefined>('0');

  const UpdateState = async () => {
    try {
      setEmail(await getInfo('email'));
      setLogin(await getInfo('login'));
      setRating(await getInfo('rating'));
      setKarma(await getInfo('karma'));
      
    } catch (error: any) {
      Alert.alert('Ошибка!');
    }
  }

  useEffect(() => {
       UpdateState();
  }, []);

  

  const handleLogout = async () => {
    FIREBASE_AUTH.signOut();
  };


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

  return (
    <SafeAreaView style={styles.container}>
      <Header title='Профиль' />



      <SimpleLineIcons name="logout" size={30} color="white" onPress={handleLogout} style={styles.logout}/>
      <Text style={{marginTop: 100, fontSize: 30, fontWeight: "700"}}>{login}</Text>
      <FontAwesome5 name="user-alt" size={160} color="black" style={{marginTop:5}}/>
      <Text style={{marginTop: 10, fontSize: 24, fontWeight: "600"}}>РЕЙТИНГ</Text>
      <Text style={{marginTop: 5, fontSize: 20, fontWeight: "500"}}>{rating}</Text>
      <Text style={{marginTop: 30, fontSize: 24, fontWeight: "600"}}>КАРМА</Text>
      <Text style={{marginTop: 5, fontSize: 20, fontWeight: "500"}}>{karma}</Text>
     



      <Footer isHome={false}/>
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
  logout: {
    position: 'absolute',
    left: 8,
    top: 4,
    
  } 

});

export default Profile;
