import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Service from '../components/Service';

const ServiceScreen = props => {
    const tagsArray = props.navigation.getParam('tags');
    const [infoUpdated, setInfoUpdated] = useState(false);
    const [serviceData, setServiceData] = useState([]);
    

    const renderI = dataI =>{
        console.log(dataI.index);
        return(
            <Service name = {dataI.item.name} desc = {dataI.item.description} neighborhood = {dataI.item.neighborhood} num = {dataI.item.num} profession = {dataI.item.profession}  />
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/service%20provider.json').then((response) => response.json()).then((responseJson) =>{

            const commerceObject = responseJson;
            let aux = [];
            for( let i in commerceObject){
                for(let k in commerceObject[i].profession){
                    if(commerceObject[i].flag && tagsArray.find(tag => tag === commerceObject[i].profession[k]) != undefined){
                        aux.push(commerceObject[i]);
                        break;
                    }
                }
            }
            //console.log(CommerceObject);
            setServiceData(aux);  
            setInfoUpdated(true);
        });
    },[]);

    if(!infoUpdated){
        return(
            <View></View>
        );
    }
    else if(serviceData.length != 0){
        return (
            <View style = {styles.screen}>
                <FlatList data = {serviceData} renderItem = {renderI}></FlatList>
            </View>
        );
    }
    return (
        <View style = {styles.errorContainer}>
            <Text style = {styles.error} >Ainda não há opções para as profissões selecionadas!</Text>
        </View>
    );
};
ServiceScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Services',
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
export default ServiceScreen;