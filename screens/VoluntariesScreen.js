import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Voluntary from '../components/Voluntary';

const VoluntariesScreen = props => {

    const [infoUpdated, setInfoUpdated] = useState(false);
    const [voluntariesData, setVoluntariesData] = useState([]);
    

    const renderI = dataI =>{
        console.log(dataI.index);
        return(
            <Voluntary name = {dataI.item.name} desc = {dataI.item.description} num = {dataI.item.num} />
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/volunteer.json').then((response) => response.json()).then((responseJson) =>{

            const volObject = responseJson;
            let aux = [];
            for( let i in volObject){
                if(volObject[i].flag){
                    aux.push(volObject[i]);
                }
                
            }
            //console.log(CommerceObject);
            setVoluntariesData(aux);  
            setInfoUpdated(true);
        });
    },[]);

    if(!infoUpdated){
        return(
            <View></View>
        );
    }
    else if(voluntariesData.length != 0){
        return (
            <View style = {styles.screen}>
                <FlatList data = {voluntariesData} renderItem = {renderI}></FlatList>
            </View>
        );
    }
    return (
        <View style = {styles.errorContainer}>
            <Text style = {styles.error} >No options for volunteers yet!</Text>
        </View>
    );
};
VoluntariesScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Volunteers',
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
export default VoluntariesScreen;