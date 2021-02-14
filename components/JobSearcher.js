import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Linking} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import  {AdMobInterstitial } from 'expo-ads-admob';

import CustomButton from '../components/CustomButton';

const JobSearcher = props =>{
    
    const [num, setNum] = useState('');
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');

    const inputNumHandler = data =>{
        setNum(data);
    }
    const loadAd = async () =>{
        await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
        await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
        await AdMobInterstitial.showAdAsync();
    }
    const hasHabilitation = (props.habilitation === 'Yes') ? 'Eligible to drive' : 'Not eligible to drive';

    let professions = '';
    for( let i in props.profession){
        professions += (i == 0)? props.profession[i] : props.profession[i].toLowerCase();
        professions += (i != props.profession.length - 1)?', ' : '';
    }
    return (
        <View style = {styles.container} onPress = {props.onTouch}>
           
                <View style = {styles.textContainer}>
                    
                        <Text style = {styles.label}>Occupation area: {props.area}</Text>
                        <Text style = {styles.label}>Professions: {professions}</Text>
                        <Text style = {styles.label}>Academic Formation: {props.formation}</Text>
                        <Text style = {styles.label}>professional History: {props.history}</Text>
                        <Text style = {styles.label}>Language: {props.idiom}</Text>
                        <Text style = {styles.label}>Name: {props.name}</Text>
                        <Text style = {styles.label}>Age: {props.age}</Text>
                        <Text style = {styles.label}>{hasHabilitation}</Text>
                        <Text style = {styles.label}>Extra information: {props.desc}</Text>
                       
                        <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                        <CustomButton title = {'Open Whatsapp'} onTouch = {() =>{
                           
                            Linking.openURL('whatsapp://send?&phone='+ props.num);
                            
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
        color: 'dodgerblue',
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

export default JobSearcher;