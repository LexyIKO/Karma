import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './src/screens/Login'
import Register from './src/screens/Register'
import Profile from './src/screens/Profile'
import Home from './src/screens/Home'

import { FIREBASE_AUTH } from './firebase-config';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react'



const Stack = createNativeStackNavigator();
const InsideStack = createNativeStackNavigator();
const OutsideStack = createNativeStackNavigator();

function OutsideLayout (){
  return (
    <OutsideStack.Navigator>
      <OutsideStack.Screen  name = "Login" component={Login} options={{headerShown: false}} />
      <OutsideStack.Screen  name = "Register" component={Register} options={{headerShown: false}} />
    </OutsideStack.Navigator>
  );
}

function InsideLayuout (){
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name = "Home" component={Home} options={{headerShown: false}}/>
      <InsideStack.Screen name = "Profile" component={Profile} options={{headerShown: false}}/>
    </InsideStack.Navigator>
  );
}


export default function App() {

  const[user, setUser] = useState<User | null>(null);

  useEffect(()=>{
    onAuthStateChanged(FIREBASE_AUTH, (user)=>{
      setUser(user);
    });
  }, []);

  

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Login'>
        {user ? (
          <Stack.Screen name = "Inside" component={InsideLayuout} options={{headerShown: false}}/>
        ) : (
        <Stack.Screen name = "Outside" component={OutsideLayout} options={{headerShown: false}}/>  
        )}
      </Stack.Navigator>

      
    </NavigationContainer>
  );
}

