import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../components/CustomButton';


    
    

const FilterCommerce = props => {
    const filterType = props.navigation.getParam('type');

    const [infoUpdated, setInfoUpdated] = useState(false);
    const [segsData, setSegsData] = useState([]);
    const [segsFlags, setSegsFlags] = useState([]);
    const [segFlag, setSegFlag] = useState(false);
    const [segs, setSegs] = useState([]);
    const [autSegs, setAutSegs] = useState([]);
    let auxSegsFlags = [];

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

    const [checkFlag, setCheckFlag] = useState(false);
    const [stateCheckFlag, setStateCheckFlag] = useState(false);

    
    useEffect(()=>{
        if (filterType == "commerce") {
            fetch('https://my-test-help-app.firebaseio.com/registers/segments.json').then((response) => response.json()).then((responseJson) => {
                setSegsData([]);
                const segsArray = responseJson;
                for (let i in segsArray.lenght) {
                    auxSegsFlags.push(false);
                }
                setSegsData(segsArray);
                // setSegsFlags(auxSegsFlags);
            
            });
        }
        else {
            fetch('https://my-test-help-app.firebaseio.com/registers/autSegments.json').then((response) => response.json()).then((responseJson) => {
                setSegsData([]);
                const segsArray = responseJson;
                for (let i in segsArray.lenght) {
                    auxSegsFlags.push(false);
                }
                setSegsData(segsArray);
                // setSegsFlags(auxSegsFlags);
            });
        }
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

    const renderSegs = dataI =>{
       
        return(
            <CheckBox title = {dataI.item} checked = {segsFlags[dataI.index]} onPress = {() => {
                
                
                
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

    return (
            <View style = {styles.container}>
                <Text style = {styles.info}>Select the region and segments to be shown, if nothing is selected, no filters will be applied</Text>
                <ScrollView style = {styles.formContainer}>
                    <Text style = {styles.label}>Segments:</Text>
                    <View style = {styles.segsContainer}>
                        
                    
                        <FlatList data = {segsData} renderItem = {renderSegs} ></FlatList>
                </View>
                
                <Text style = {styles.label}>Countries:</Text>
                    <View style = {styles.segsContainer}>
                        <FlatList data = {countriesData} renderItem = {renderCountries}></FlatList>
                    </View>
                    <CustomButton title = 'Next' onTouch = {()=>{
                    let tags = segs;
                    let countryTags = countries;
                    let stateTags = states;
                    let cityTags = cities;
                        let allCountries = [];
                        let allStates = [];
                        let allCities = [];
                        for (let i = 0; i < countriesData.length; i++){
                            allCountries.push(countriesData[i].country);
                            for (let k = 0; k < countriesData[i].states.length; k++){
                                allStates.push(countriesData[i].states[k].state);
                                for (let j = 0; j < countriesData[i].states[k].cities.length; j++){
                                    allCities.push(countriesData[i].states[k].cities[j].city);
                                }
                            }
                        }
                        
                        
                        if(segs.length === 0){
                            tags = segsData
                         }
                        if(countries.length === 0){
                            countryTags = allCountries
                        }
                        if(states.length === 0){
                            stateTags = allStates
                        }
                        if(cities.length === 0){
                            cityTags = allCities
                        }
                        if (filterType == "commerce") {
                            props.navigation.navigate({
                                routeName: 'Commerce',
                                params: {
                                    tags: tags,
                                    countryTags: countryTags,
                                    stateTags: stateTags,
                                    cityTags: cityTags
                                }
                            });
                        }
                        else {
                            props.navigation.navigate({
                                routeName: 'Autonomous',
                                params: {
                                    tags: tags,
                                    countryTags: countryTags,
                                    stateTags: stateTags,
                                    cityTags: cityTags
                                }
                            });
                        }  
                }} />
                </ScrollView>
            </View>
            
    );
  
};

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        
        //backgroundColor: 'white',
        
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
        width: '80%',
        alignSelf: 'center',
        color: '#00cb4b',
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

export default FilterCommerce;