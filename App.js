import React, { useState } from 'react';
import { StyleSheet} from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';


import ScreensNavigator from './navigation/ScreensNavigator';

const applyFonts = () =>{
  return Font.loadAsync({
    'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
  });
}


export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  

  if (!fontLoaded){
    return(
      <AppLoading startAsync = {applyFonts} onFinish = {() =>{
          setFontLoaded(true);
      }}/>
    );
  }

  return (
    <ScreensNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
