import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Linking } from 'react-native';

import CustomButton from '../components/CustomButton';

const DonationPoint = props =>{
    
    const [num, setNum] = useState('');
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');

    const inputNumHandler = data =>{
        setNum(data);
    }
   
    return (
        <View style = {styles.container} onPress = {props.onTouch}>
           
                <View style = {styles.textContainer}>
                    
                    <Text style = {styles.label}>Local: {props.local}</Text>
                    <Text style={styles.label}>Responsible: {props.responsible}</Text>
                    <Text style = {styles.label}>PicPay profile: {props.picpay}</Text>
                    
                    <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                    <CustomButton title = {'Open Whatsapp'} onTouch = {() =>{
                       
                          
                        Linking.openURL('whatsapp://send?&phone=' +props.num);
                            
                        
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

export default DonationPoint;