import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Autonomous from '../components/Autonomous';

const AutonomousScreen = props => {
    const tagsArray = props.navigation.getParam('tags');
    const countryTagsArray = props.navigation.getParam('countryTags')
    const stateTagsArray = props.navigation.getParam('stateTags')
    const cityTagsArray = props.navigation.getParam('cityTags')
  
    const [infoUpdated, setInfoUpdated] = useState(false);
    const [autonomousData, setAutonomousData] = useState([]);
    

    const renderI = dataI =>{
        console.log(dataI.index);
        return(
            <Autonomous name = {dataI.item.name} desc = {dataI.item.description} neighborhood = {dataI.item.neighborhood} num = {dataI.item.num} street = {dataI.item.street} seg = {dataI.item.seg}  />
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/autonomous.json').then((response) => response.json()).then((responseJson) =>{

            const autonomousObject = responseJson;
            let aux = [];
           
            for( let i in autonomousObject){
                for(let k in autonomousObject[i].seg){
                    if(autonomousObject[i].flag && tagsArray.find(tag => tag === autonomousObject[i].seg[k]) != undefined && countryTagsArray.find(tag => tag === autonomousObject[i].countries[k]) != undefined && stateTagsArray.find(tag => tag === autonomousObject[i].states[k]) != undefined && cityTagsArray.find(tag => tag === autonomousObject[i].cities[k]) != undefined){
                        aux.push(autonomousObject[i]);
                        break;
                  }
                   console.log(tagsArray)
                }
                
            }
            //console.log(CommerceObject);
            setAutonomousData(aux);  
            setInfoUpdated(true);
        });
    },[]);

    if(!infoUpdated){
        return(
            <View></View>
        );
    }
    else if(autonomousData.length != 0){
        return (
            <View style = {styles.screen}>
                <FlatList data = {autonomousData} renderItem = {renderI}></FlatList>
            </View>
        );
    }
    return (
        <View style = {styles.errorContainer}>
            <Text style = {styles.error} >There are still no options for the selected segments!</Text>
        </View>
    );
};
AutonomousScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Autonomous',
    };
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(240,240,240)',
        
    },
    error:{
        fontSize: 15,
        textAlign: 'center',
        fontFamily : 'open-sans',
        marginTop : 20,
        color: 'red'
    },
    errorContainer: {
        alignSelf: 'center'
    }

});
export default AutonomousScreen;