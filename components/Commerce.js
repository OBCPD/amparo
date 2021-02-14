import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import { TouchableNativeFeedback, ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../components/CustomButton';

const Commerce = props =>{
    
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');

  
    let segs = '';
    for( let i in props.seg){
        segs += (i == 0)? props.seg[i] : props.seg[i].toLowerCase();
        segs += (i != props.seg.length - 1)?', ' : '';
    }
    return (
        <View style = {styles.container} onPress = {props.onTouch}>
           
                <View style = {styles.textContainer}>
                    
                        <Text style = {styles.label}>Responsible: {props.name}</Text>
                        <Text style = {styles.label}>Neighborhood: {props.neighborhood}</Text>
                        <Text style = {styles.label}>Street: {props.street}</Text>
                        <Text style = {styles.label}>Segments: {segs}</Text>
                        <Text style = {styles.label}>Description: {props.desc}</Text>
                       
                        <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                        <CustomButton title = {'Abrir Whatsapp'} onTouch = {() =>{
                            
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

export default Commerce;