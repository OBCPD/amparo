import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, FlatList , View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';


import CustomButton from '../../components/CustomButton';
import JobsInput from '../../models/JobsInput';


const SigninJobsScreen = props => {

    const [infoUpdated, setInfoUpdated] = useState(false);
    const [segsData, setSegsData] = useState([]);
    const [segsFlags, setSegsFlags] = useState([]);
    let auxSegsFlags= [];

    const [area, setArea] = useState('');
    const [professions, setProfessions] = useState('');
    const [formation, setFormation] = useState('');
    const [history, setHistory] = useState('');
    const [idiom, setIdiom] = useState('');
    const [age, setAge] = useState('');
    const [habilitation, setHabilitation] = useState('');
    const [name, setName] = useState('');
    const [num, setNum] = useState('');
    const [desc, setDesc] = useState('');
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');
    
    const[yesFlag,setYesFlag] = useState(false);
    const[noFlag,setNoFlag] = useState(false);
    
    const inputAreaHandler = data =>{
        setArea(data);
    }
    const inputFormationHandler = data =>{
        setFormation(data);
    }
    const inputHistoryHandler = data =>{
        setHistory(data);
    }
    const inputIdiomHandler = data =>{
        setIdiom(data);
    }
    const inputAgeHandler = data =>{
        setAge(data);
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
        if(area === '' || num === '' || formation === '' || history === '' || idiom === '' || age === '' || habilitation === ''|| professions === [] || desc === '' || name === ''){
           
            setSubmitMsgStyle({color: 'red'});
            setSubmitMsg("There are empty mandatory fields!");
        }
        else if(submitMsg != "Sent with success!"){
            
            const filledForm = new JobsInput(area, professions, formation, history, idiom, age, habilitation, name, num, desc);
        
            fetch('https://my-test-help-app.firebaseio.com/registers/jobs.json',{
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
                    <Text style = {styles.label}>Occupation area:</Text>
                    <TextInput placeholder =  'Civil construction, general services assistant, etc.' style = {styles.labelInput} onChangeText = {inputAreaHandler} value = {area}/>
                    
                    <Text style = {styles.label}>Professions:</Text>
                    <View style = {styles.segsContainer}>
                        <FlatList data = {segsData} renderItem = {renderSegs}></FlatList>
                    </View>

                    <Text style = {styles.label}>Academic formation:</Text>
                    <TextInput placeholder =  'Your formation here'  style = {styles.labelInput} onChangeText = {inputFormationHandler} value = {formation}/>

                    <Text style = {styles.label}>Professional history:</Text>
                    <TextInput placeholder =  'Your history here'  style = {styles.labelInput} onChangeText = {inputHistoryHandler} value = {history}/>

                    <Text style = {styles.label}>Language:</Text>
                    <TextInput placeholder =  'Your language here'  style = {styles.labelInput} onChangeText = {inputIdiomHandler} value = {idiom}/>

                    <Text style = {styles.label}>Name:</Text>
                    <TextInput placeholder =  'Your name here'  style = {styles.labelInput} onChangeText = {inputNameHandler} value = {name}/>

                    <Text style = {styles.label}>Age:</Text>
                    <TextInput keyboardType = 'numeric' placeholder =  'Your age here'  style = {styles.labelInput} onChangeText = {inputAgeHandler} value = {age}/>

                    <Text style = {styles.label}>Has driving license:</Text>   
                    <View style = {styles.checkContainer}>
                        <CheckBox title = 'Yes' checked = {yesFlag} onPress = {() => {
                            setYesFlag(true);
                            setNoFlag(false);
                            setHabilitation('Yes');
                        }} />

                        <CheckBox title = 'No' checked = {noFlag} onPress = {() => {
                            setYesFlag(false);
                            setNoFlag(true);
                            setHabilitation('No');
                        }} />
                    </View>
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
                    
                    <Text style = {styles.label}>More information:</Text>
                    <TextInput maxLength = {500} multiline={true} placeholder =  'Description of up to a maximum of 500 characters'  style = {styles.descInput} onChangeText = {inputDescHandler} value = {desc}/>
                    
                    
                    <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                    <CustomButton title = {'Submit'} onTouch = {submitHandler}/>
                    
    
                </View>
            </KeyboardAwareScrollView>

        </View>
    );
};

SigninJobsScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Register Job Searcher',
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
    checkContainer: {
        width: '95%',
        paddingLeft: '10%'
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

export default SigninJobsScreen;