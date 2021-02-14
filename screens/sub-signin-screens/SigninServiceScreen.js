import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ImageBackground, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';


import CustomButton from '../../components/CustomButton';
import ServiceInput from '../../models/ServiceInput';


const SigninServiceScreen = props => {

    const [infoUpdated, setInfoUpdated] = useState(false);
    const [segsData, setSegsData] = useState([]);
    const [segsFlags, setSegsFlags] = useState([]);
    let auxSegsFlags= [];

    const [professions, setProfessions] = useState('');
    const [num, setNum] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [desc, setDesc] = useState('');
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');
    
    
    const inputProfessionHandler = data =>{
        setProfession(data);
    }
    const inputNeighborhoodHandler = data =>{
        setNeighborhood(data);
    }
    const inputDescHandler = data =>{
        setDesc(data);
    }
    const inputNumHandler = (data) =>{
        setNum(data);
    }
  
    const submitHandler = () =>{
        if(neighborhood === '' || num === '' || professions === [] || desc === ''){
           
            setSubmitMsgStyle({color: 'red'});
            setSubmitMsg("There are empty mandatory fields!");
        }
        else if(submitMsg != "Sent with success!"){
            
            const filledForm = new ServiceInput(professions, neighborhood, num, desc);
        
            fetch('https://my-test-help-app.firebaseio.com/registers/service%20provider.json',{
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
    const renderSegs = dataI =>{
        return(
            <CheckBox  
            title = {dataI.item} checked = {segsFlags[dataI.index]} onPress = {() => {
                let aux = professions;
                
                for(let i in segsData){
                    
                    if(i == dataI.index){
                        auxSegsFlags[i] = !segsFlags[i];
                        console.log(auxSegsFlags[i]);
                    }
                    else{
                        auxSegsFlags[i] = segsFlags[i];
                    }
                }
                
               
                setSegsFlags(auxSegsFlags);
                console.log(auxSegsFlags);
                if(!auxSegsFlags[dataI.index]){
                    for(let i in aux ){
                        if(aux[i] === dataI.item ){
                            aux.splice(i);
                            setProfessions(aux);
                        }

                    }
                }
                else{
                    
                    setProfessions([...professions, dataI.item]);
                }
            }} />
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/professions.json').then((response) => response.json()).then((responseJson) =>{
            setSegsData([]);
            const segsArray = responseJson;
            for(let i in segsArray){
                auxSegsFlags[i] = false;
                
            }
           // console.log(segsObject);
            setSegsData(segsArray);  
            setInfoUpdated(true);
        });
    },[]);
    if(!infoUpdated){
        return(
            <View></View>
        );
    }
    return(
        <View style = {styles.screen}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps = 'handled' style = {styles.scroll}>
                <View style = {styles.formContainer}>
                    <Text style = {styles.label}>Professions:</Text>
                    <View style = {styles.segsContainer}>
                        <FlatList data = {segsData} renderItem = {renderSegs}></FlatList>
                    </View>

                    <Text style = {styles.label}>Address:</Text>
                    <TextInput placeholder =  'Your Address here'  style = {styles.labelInput} onChangeText = {inputNeighborhoodHandler} value = {neighborhood}/>

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
                    
                    <Text style = {styles.label}>Describe your services:</Text>
                    <TextInput maxLength = {500} multiline={true} placeholder =  'Description of up to a maximum of 500 characters'  style = {styles.descInput} onChangeText = {inputDescHandler} value = {desc}/>
                    
                    
                    <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                    <CustomButton title = {'Submit'} onTouch = {submitHandler}/>
                    
    
                </View>
            </KeyboardAwareScrollView>

        </View>
    );
};

SigninServiceScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Register Provider',
    };
};

const styles = StyleSheet.create({
    screen: {
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

export default SigninServiceScreen;