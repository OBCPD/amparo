import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, ImageBackground, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';


import CustomButton from '../../components/CustomButton';
import VoluntaryInput from '../../models/VoluntaryInput';


const SigninVoluntaryScreen = props => {

    const [profession, setProfession] = useState('');
    const [num, setNum] = useState('');
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');
    
    
    const inputProfessionHandler = data =>{
        setProfession(data);
    }
    const inputNameHandler = data =>{
        setName(data);
    }
    const inputDescHandler = data =>{
        setDesc(data);
    }
    const inputNumHandler = (data) =>{
        setNum(data);
    }
  
    const submitHandler = () =>{
        if(name === '' || num === '' || desc === ''){
           
            setSubmitMsgStyle({color: 'red'});
            setSubmitMsg("There are empty mandatory fields!");
        }
        else if(submitMsg != "Sent with success!"){
            
            const filledForm = new VoluntaryInput(name, num, profession,desc);
        
            fetch('https://my-test-help-app.firebaseio.com/registers/volunteer.json',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify(filledForm)
            });
                        
            setSubmitMsgStyle({color: 'dodgerblue'});  
            setSubmitMsg("Sent with success!"); 
        }

    }

    
    return(
        <View style = {styles.screen}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps = 'handled' style = {styles.scroll}>
                <View style = {styles.formContainer}>
                    <Text style = {styles.label}>Name:</Text>
                    <TextInput placeholder =  'Your name here' style = {styles.labelInput} onChangeText = {inputNameHandler} value = {name}/>
                    
                    <View style = {styles.iconContainer}>
                            <Icon
                                    iconStyle = {styles.icon}
                                    name='whatsapp'
                                    type='font-awesome'
                                    color='gray'
                                    size= {13}
                            />
                        <Text style = {styles.label}>Number:</Text>
                    </View>
                    <TextInput keyboardType = 'numeric' placeholder =  'Your number for contact here (Whatsapp)' style = {styles.labelInput} onChangeText = {inputNumHandler} value = {num}/>
                    
                    <Text style = {styles.label}>Area you can help:</Text>
                    <TextInput maxLength = {500} multiline={true} placeholder =  'Describe here, maximum 500 characters'  style = {styles.descInput} onChangeText = {inputDescHandler} value = {desc}/>
                    
                    
                    <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                    <CustomButton title = {'Submit'} onTouch = {submitHandler}/>
                    
    
                </View>
            </KeyboardAwareScrollView>

        </View>
    );
};

SigninVoluntaryScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Register Volunteer Work',
    };
};

const styles = StyleSheet.create({
    screen: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgb(240,240,240)',
        width: '100%'
        
    },
    formContainer:{
        width: '80%',
        height: '100%',
        alignSelf: 'center'
    },
    scroll:{
        width: '100%',
        height: '100%',
        alignSelf: 'center'
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
    info:{
        color: 'dodgerblue',
        fontSize: 18,
        textAlign: 'center',
        fontFamily : 'open-sans-bold',
        marginBottom: 20,
        marginTop : 20
    },
    subMsg :{
        fontSize: 15,
        textAlign: 'center',
        fontFamily : 'open-sans',
        marginTop : 20
    },
    iconContainer :{
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        marginTop: 9,
        marginRight: 2
    },
    
    descInput:{
        paddingHorizontal: 7,
        alignSelf: 'center',
        height: 60, 
        width: '95%',
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1,
        //borderRadius: 10,
        //backgroundColor: 'white'
    }
});

export default SigninVoluntaryScreen;