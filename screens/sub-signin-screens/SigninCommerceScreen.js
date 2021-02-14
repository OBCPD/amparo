import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ImageBackground, View} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';


import CustomButton from '../../components/CustomButton';
import CommerceInput from '../../models/CommerceInput';


const SigninCommerceScreen = props => {
    const [checkFlag, setCheckFlag] = useState(false);
    const [stateCheckFlag, setStateCheckFlag] = useState(false);

    const [infoUpdated, setInfoUpdated] = useState(false);
    const [segsData, setSegsData] = useState([]);
    const [segsFlags, setSegsFlags] = useState([]);
    let auxSegsFlags= [];


    const [countriesData, setCountriesData] = useState([]);
    const [countriesFlags, setCountriesFlags] = useState([]);
    let auxCountriesFlags = [];
    const [countries, setCountries] = useState([]);

    const [statesData, setStatesData] = useState([]);
    const [statesFlags, setStatesFlags] = useState([]);
    let auxStatesFlags = [];
    const [states, setStates] = useState([]);

    const [citiesData, setCitiesData] = useState([]);
    const [citiesFlags, setCitiesFlags] = useState([]);
    let auxCitiesFlags = [];
    const [cities, setCities] = useState([]);


    const [segs, setSegs] = useState([]);
    const [name, setName] = useState('');
    const [num, setNum] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [street, setStreet] = useState('');
    const [desc, setDesc] = useState('');
    const [submitMsgStyle, setSubmitMsgStyle] = useState({ });
    const [submitMsg, setSubmitMsg] = useState('');
    
    
    const inputSegHandler = data =>{
        setSeg(data);
    }
    const inputNeighborhoodHandler = data =>{
        setNeighborhood(data);
    }
    const inputStreetHandler = data =>{
        setStreet(data);
    }
    const inputDescHandler = data =>{
        setDesc(data);
    }
    const inputNameHandler = (data) =>{
        setName(data);
    }
    const inputNumHandler = (data) =>{
        setNum(data);
    }
    const submitHandler = () =>{
        if (neighborhood === '' || name === '' || num === '' || street === '' || countries == [] || states == [] || cities == [] || segs === [] || desc === '') {
           
            setSubmitMsgStyle({color: 'red'});
            setSubmitMsg("There are empty mandatory fields!");
        }
        else if(submitMsg != "Sent with success!"){
            
            const filledForm = new CommerceInput(countries, states, cities, segs, name, neighborhood, street, num, desc);
        
            fetch('https://my-test-help-app.firebaseio.com/registers/commerce.json',{
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
                
                let aux = segs;
                
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
                            setSegs(aux);
                        }

                    }
                }
                else{
                    
                    setSegs([...segs, dataI.item]);
                    console.log(segs);
                }
            }} />
        );
    }

     const renderStates = dataI =>{
        return (
            <View>
                <CheckBox  
                title = {dataI.item.state} checked = {statesFlags[dataI.index]} onPress = {() => {
                    setStateCheckFlag(false);
                    let aux = states;
                    
                    for(let i in statesData){
                        
                        if(i == dataI.index){
                            auxStatesFlags[i] = !statesFlags[i];
                        }
                        else{
                            auxStatesFlags[i] = statesFlags[i];
                        }
                    }
                    
                
                    setStatesFlags(auxStatesFlags);
                    
                    if(!auxStatesFlags[dataI.index]){
                        for(let i in aux ){
                            if(aux[i] === dataI.item ){
                                aux.splice(i);  
                                setStates(aux);
                            }

                        }
                    }
                    else {
                        setStateCheckFlag(true);
                        setCitiesData(dataI.item.cities);
                        setStates([...states, dataI.item.state]);
                    }
                        }}/>
                {(stateCheckFlag)?(<View style = {styles.segsContainer}>
                    <FlatList data = {citiesData} renderItem = {renderCities}></FlatList>
                </View>) : (<View></View>)}
           </View>
        );
    }
    const renderCities = dataI => {
        return (
            <View>
                <CheckBox  
                title = {dataI.item.city} checked = {citiesFlags[dataI.index]} onPress = {() => {
                    
                    let aux = cities;
                    
                    for(let i in citiesData){
                        
                        if(i == dataI.index){
                            auxCitiesFlags[i] = !citiesFlags[i];
                        }
                        else{
                            auxCitiesFlags[i] = citiesFlags[i];
                        }
                    }
                    
                
                    setCitiesFlags(auxCitiesFlags);
                    
                    if(!auxCitiesFlags[dataI.index]){
                        for(let i in aux ){
                            if(aux[i] === dataI.item ){
                                aux.splice(i);
                                setCities(aux);
                            }

                        }
                    }
                    else{
                        setCities([...cities, dataI.item.city]);
                    }
                        }}/>
                
           </View>
        );
    }
    const renderCountries = dataI => {
        
        return (
            <View>
                <CheckBox  
                title = {dataI.item.country} checked = {countriesFlags[dataI.index]} onPress = {() => {
                    setCheckFlag(false);
                    let aux = countries;
                    
                    for(let i in countriesData){
                        
                        if(i == dataI.index){
                            auxCountriesFlags[i] = !countriesFlags[i];
                        }
                        else{
                            auxCountriesFlags[i] = countriesFlags[i];
                        }
                    }
                    
                
                    setCountriesFlags(auxCountriesFlags);
                    console.log(auxCountriesFlags);
                    if(!auxCountriesFlags[dataI.index]){
                        for(let i in aux ){
                            if(aux[i] === dataI.item ){
                                aux.splice(i);
                                setCountries(aux);
                               
                            }

                        }
                    }
                    else {
                        setStatesData(dataI.item.states);
                        setCheckFlag(true);
                        setCountries([...countries, dataI.item.country]);
                        }
                        
                    }} />
                {(checkFlag)?(<View style = {styles.segsContainer}>
                    <FlatList data = {statesData} renderItem = {renderStates}></FlatList>
                </View>) : (<View></View>)}
           </View>
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/segments.json').then((response) => response.json()).then((responseJson) =>{
            setSegsData([]);
            const segsArray = responseJson;
            for(let i in segsArray){
                auxSegsFlags[i] = false;
                
            }
           // console.log(segsObject);
            setSegsData(segsArray);  
            
        });

        fetch('https://my-test-help-app.firebaseio.com/registers/countries.json').then((response) => response.json()).then((responseJson) =>{
            setCountriesData([]);
            const countriesArray = responseJson;
            for(let i in countriesArray){
                auxCountriesFlags[i] = false;
                
            }
           // console.log(segsObject);
            setCountriesData(countriesArray);  
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
                    
                    {/* <TextInput placeholder =  'Roupas, calçados, esportes, etc' style = {styles.labelInput} onChangeText = {inputSegHandler} value = {seg}/> */}

                    <Text style = {styles.label}>Name:</Text>
                    <TextInput placeholder =  'Your name here'  style = {styles.labelInput} onChangeText = {inputNameHandler} value = {name}/>
                    
                    <Text style = {styles.label}>Neighborhood:</Text>
                    <TextInput placeholder =  'Neighborhood name here'  style = {styles.labelInput} onChangeText = {inputNeighborhoodHandler} value = {neighborhood}/>

                    <Text style = {styles.label}>Street:</Text>
                    <TextInput placeholder =  'Street name here'  style = {styles.labelInput} onChangeText = {inputStreetHandler} value = {street}/>

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
                    
                    
                    <Text style = {styles.label}>Describe you commerce:</Text>
                    <TextInput maxLength = {500} multiline={true} placeholder =  'Description of up to a maximum of 500 characters'  style = {styles.descInput} onChangeText = {inputDescHandler} value = {desc}/>
                    <Text style = {styles.label}>Segments:</Text>
                    <View style = {styles.segsContainer}>
                        <FlatList data = {segsData} renderItem = {renderSegs}></FlatList>
                    </View>

                    <Text style = {styles.label}>Countries:</Text>
                    <View style = {styles.segsContainer}>
                        <FlatList data = {countriesData} renderItem = {renderCountries}></FlatList>
                    </View>
                    
                    <Text style = {{...submitMsgStyle, ...styles.subMsg}}>{submitMsg}</Text>
                    <CustomButton title = {'Submit'} onTouch = {submitHandler}/>
                    
    
                </View>
            </KeyboardAwareScrollView>

        </View>
    );
};

SigninCommerceScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Register Commerce',
    };
};

const styles = StyleSheet.create({
    screen: {
       
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        backgroundColor: 'rgb(240,240,240)',
        
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
    segsContainer:{
        marginTop: 5,
        width: '95%',
        paddingLeft: '5%'
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

export default SigninCommerceScreen;