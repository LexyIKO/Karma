import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  Pressable,
  ScrollView,
  Alert
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword,  } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { FIREBASE_AUTH, FIRESTORE_DB } from '../../firebase-config';
import { FontAwesome5 } from '@expo/vector-icons'; 

interface RegisterProps {
  navigation: NavigationProp<any>;
}

const Register: React.FC<RegisterProps> = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [copyPassword, setCopyPassword] = useState<string>('');
  const [errors, setErrors] = useState<{ email?: string; login?: string; password?: string }>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [passworIsHidden, setPasswordIsHidden] = useState<boolean>(true);
  const [copyPassworIsHidden, setCopyPasswordIsHidden] = useState<boolean>(true);

  useEffect(() => {
    validateForm();
  }, [login, email, password, copyPassword]);

  const validateForm = () => {
    let errors: { email?: string; login?: string; password?: string } = {};
    const emailPattern = /\S+@\S+\.\S+/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*'";:/>?.,<]).{8,}$/;

    // Валидация логина
    if (!login) {
      errors.login = undefined;
    } else if (login.length < 4) {
      errors.login = 'Логин должен быть не меньше 4 символов';
    }

    // Валидация почты
    if (!email) {
      errors.email = undefined;
    } else if (!emailPattern.test(email)) {
      errors.email = 'Почта введена неккоректно';
    }

    // Валидация пароля
    if (!password) {
      errors.password = undefined;
    } else if (password.length < 8) {
      errors.password = 'Длинна паролья не меньше 8 символов';
    } else if (!passwordPattern.test(password)) {
      errors.password = 'Пароль должен содержать большую букву, маленькую букву, спец.символ, цифру';
    } else if (!copyPassword) {
      errors.password = 'Пароль не введен повторно';
    } else if (copyPassword !== password) {
      errors.password = 'Веденные пароли не совпадают';
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async () => {
    if (isFormValid) {
      try {
        const response = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);

        const userId : string | undefined = FIREBASE_AUTH.currentUser?.uid;
        const db = FIRESTORE_DB;

        if(userId){
          await setDoc(doc(db, "user-info", userId), {
            login: login,
            email: email,
            rating: 0,
            karma: 0,
          });
        }


        Alert.alert("Регистрация прошла успешно");
      }
      catch (error: any){

        if(error.message === "Firebase: Error (auth/email-already-in-use)."){
            Alert.alert("Введенная почта уже используется!");
        }else if(error.message === "Firebase: Error (auth/network-request-failed)."){
            Alert.alert("Ошибка сети!");
        }else {
            Alert.alert("Ошибка!");
        }
      }
    };
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.box} keyboardShouldPersistTaps='handled'>
        <Text style={{ fontSize: 54, marginBottom: 25 }}>My Karma</Text>
        <Text style={{ fontSize: 28, marginBottom: 15 }}>Регистрация</Text>
        <TextInput
          placeholder="Введите email"
          style={styles.MyInput}
          value={email}
          onChangeText={setEmail}
        />
        <Text style={[styles.MyError, { display: errors.email ? 'flex' : 'none' }]}>
          {errors.email}
        </Text>

        <TextInput
          placeholder="Введите никнейм"
          style={styles.MyInput}
          value={login}
          onChangeText={setLogin}
        />
        <Text style={[styles.MyError, { display: errors.login ? 'flex' : 'none' }]}>
          {errors.login}
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

        <View style = {{flexDirection:'row'}}>
            <TextInput
            placeholder="Повторите пароль"
            style={styles.MyInput}
            secureTextEntry = {copyPassworIsHidden ? true : false}
            value={copyPassword}
            onChangeText={setCopyPassword}
            />
            <Pressable onPress={() => {
                if(copyPassworIsHidden){
                    setCopyPasswordIsHidden(false)
                }else{
                    setCopyPasswordIsHidden(true)
                }            
            }}>
                <FontAwesome5 name={copyPassworIsHidden ? "eye" : "eye-slash"} size={24} color="black" style= {{position: 'absolute', right: 7, top: '30%'}} />
            </Pressable>    
        </View>
        <Text style={[styles.MyError, { display: errors.password ? 'flex' : 'none' }]}>
          {errors.password}
        </Text>

        <Pressable
          onPress={handleSubmit}
          style={[styles.MyButton, { opacity: isFormValid ? 1 : 0.5 }]}
          disabled={!isFormValid}>
          <Text style={{ fontSize: 20 }}>Зарегистрироваться</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Login' as never)} style={{ marginTop: 5 }}>
          <Text style={{ fontSize: 20 }}>Уже есть аккаунт? Войти!</Text>
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
  box: {
    flexGrow: 1,
    width: '100%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  MyError: {
    color: 'red',
  },
});

export default Register;
