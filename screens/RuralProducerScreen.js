import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import RuralProducer from '../components/RuralProducer';

const RuralProducerScreen = props => {

    const [infoUpdated, setInfoUpdated] = useState(false);
    const [ruralData, setRuralData] = useState([]);
    

    const renderI = dataI =>{
        console.log(dataI.index);
        return(
            <RuralProducer product = {dataI.item.product} desc = {dataI.item.description} neighborhood = {dataI.item.neighborhood} num = {dataI.item.num} location = {dataI.item.location}  />
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/rural%20producer.json').then((response) => response.json()).then((responseJson) =>{

            const ruralObject = responseJson;
            let aux = [];
            for( let i in ruralObject){
                if(ruralObject[i].flag){
                    aux.push(ruralObject[i]);
                }
                
            }
            //console.log(CommerceObject);
            setRuralData(aux);  
            setInfoUpdated(true);
        });
    },[]);

    if(!infoUpdated){
        return(
            <View></View>
        );
    }
    else if(ruralData.length != 0){
        return (
            <View style = {styles.screen}>
                <FlatList data = {ruralData} renderItem = {renderI}></FlatList>
            </View>
        );
    }
    return (
        <View style = {styles.errorContainer}>
            <Text style = {styles.error} >There are still no options for rural producers!</Text>
        </View>
    );
};
RuralProducerScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Rural Producers',
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
export default RuralProducerScreen;