import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import  {AdMobInterstitial } from 'expo-ads-admob';

import CustomButton from '../components/CustomButton';

const RuralProducer = props =>{
    
    const [num, setNum] = useState('');
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');

    const inputNumHandler = data =>{
        setNum(data);
    }
    const local = (
        <Text style = {styles.label}>Address: {props.location}</Text>
    );
    const loadAd = async () =>{
        await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        await AdMobInterstitial.showAdAsync();
    }
    return (
        <View style = {styles.container} onPress = {props.onTouch}>
           
                <View style = {styles.textContainer}>
                   
                        <Text style = {styles.label}>Products: {props.product}</Text>
                        <Text style = {styles.label}>Neighborhood: {props.neighborhood}</Text>

                        {(props.location != '')? local : null}
                        <Text style = {styles.label}>Information: {props.desc}</Text>
                        <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                        <CustomButton title = {'Open Whatsapp'} onTouch = {() =>{
                           
                                Linking.openURL('whatsapp://send?&phone=' + props.num);
                                
                            
                        }}/>
                   
                </View>            
        </View>
    );
};

const styles = StyleSheet.create({
    
    title:{
        textAlign: 'center',
        fontFamily: 'open-sans',
        fontSize: 20,
        color: '#00cb4b',
    },
    textContainer: {
        width: '100.5%',
        padding: 5,
        backgroundColor: 'rgba(255,255,255,0.8)',
       
    },
    container:{
        backgroundColor: '#00cb4b',
        
        borderColor: '#00cb4b',
        borderWidth : 0.7,
        borderRadius: 10,
        overflow: 'hidden',
        margin: 5,
        width:'90%',
        height: 'auto',
        marginLeft: '5%'   
    },
    labelInput: {
        paddingHorizontal: 7,
        alignSelf: 'center',
        height: 40, 
        width: '95%',
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1,
        //borderRadius: 10,
        //backgroundColor: 'white'

    },
    label:{
        color: 'rgb(50,50,50)',
        fontSize: 17,
        fontFamily : 'open-sans',
        //marginBottom: 3,
        marginTop : 10
    },
    subMsg :{
        fontSize: 15,
        textAlign: 'center',
        fontFamily : 'open-sans',
        marginTop : 20
    }
});

export default RuralProducer;