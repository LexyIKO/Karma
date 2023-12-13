import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, SafeAreaView, Pressable, Alert, ScrollView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword, signInAnonymously} from "firebase/auth";
import { FIREBASE_AUTH } from '../../firebase-config';
import { FontAwesome5 } from '@expo/vector-icons';

interface LoginProps {
  navigation: NavigationProp<any>;
}


const Login: React.FC<LoginProps> = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; login?: string; password?: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [passworIsHidden, setPasswordIsHidden] = useState<boolean>(true);
  

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateForm = () => {
    let errors: { email?: string; login?: string; password?: string } = {};
    const emailPattern = /\S+@\S+\.\S+/;
    // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*'";:/>?.,<]).{8,}$/; 

    // Валидация почты
    if (!email) {
      errors.email = undefined;
    } else if (!emailPattern.test(email)) {
      errors.email = 'Почта введена неrкоректно';
    }

    // Валидация пароля
    if (!password) {
      errors.password = undefined;
    } else if (password.length < 8) {
      errors.password = 'Длинна пароля не меньше 8 символов';
    } 
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };


  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const response = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
      }
      catch (error: any){
        if(error.message === 'Firebase: Error (auth/network-request-failed).'){
            Alert.alert("Ошибка сети");
            // console.log("Ошибка сети");
        }else {
            Alert.alert("Данные введены неверно!");
            // console.log("Данные введены неверно!")
        }
      }
    };
  };

  const AnonSignIn = () => {
    
    try {
      signInAnonymously(FIREBASE_AUTH)
    }
    catch (error: any){
      Alert.alert("Неверные данные");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.box} keyboardShouldPersistTaps='handled'>
            <Text style={{ fontSize: 40, marginBottom: 40 }}>Авторизация</Text>

            <TextInput
            placeholder="Введите почту"
            style={styles.MyInput}
            value={email}
            onChangeText={setEmail}
            />
            <Text style={[styles.MyError, { display: errors.email ? 'flex' : 'none' }]}>
            {errors.email}
            </Text>

            <View style = {{flexDirection:'row'}}>
            <TextInput
                placeholder="Введите пароль"
                style={styles.MyInput}
                secureTextEntry = {passworIsHidden ? true : false}
                value={password}
                onChangeText={setPassword}
            />
            <Pressable onPress={() => {
                if(passworIsHidden){
                    setPasswordIsHidden(false)
                }else{
                    setPasswordIsHidden(true)
                }            
            }}>
                <FontAwesome5 name={passworIsHidden ? "eye" : "eye-slash"} size={24} color="black" style= {{position: 'absolute', right: 7, top: '30%'}} />
            </Pressable>
            </View>
            <Text style={[styles.MyError, { display: errors.password ? 'flex' : 'none' }]}>
                {errors.password}
            </Text>

            <Pressable
                onPress={handleSubmit}
                style={[styles.MyButton, { opacity: isFormValid ? 1 : 0.5 }]}
                disabled={!isFormValid}>
                <Text style={{ fontSize: 22, textAlign: 'center'}}>Войти</Text>
            </Pressable>

            <Pressable
            onPress={() => navigation.navigate('Register' as never)}
            style={{ marginTop: 20,}}>
            <Text style={{ fontSize: 20, }}>Создать аккаунт</Text>
            </Pressable>
            <Pressable onPress={AnonSignIn} style={{ marginTop: 5,}}>
            <Text style={{ fontSize: 20 }}>Войти позже</Text>
            
            </Pressable>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  MyInput: {
    marginTop: 10,
    paddingLeft: 10,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#369bff',
    width: 320,
    fontSize: 24,
  },
  MyButton: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#369bff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: '#369bff',
    width: 120,
  },
  MyError: {
    color: 'red',
  },
  box: {
    flexGrow: 1,
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;
