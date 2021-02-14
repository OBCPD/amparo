import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import Commerce from '../components/Commerce';

const CommerceScreen = props => {
    const tagsArray = props.navigation.getParam('tags');
    const countryTagsArray = props.navigation.getParam('countryTags')
    const stateTagsArray = props.navigation.getParam('stateTags')
    const cityTagsArray = props.navigation.getParam('cityTags')
    const [infoUpdated, setInfoUpdated] = useState(false);
    const [commerceData, setCommerceData] = useState([]);
    

    const renderI = dataI =>{
        console.log(dataI.index);
        return(
            <Commerce name = {dataI.item.name} desc = {dataI.item.description} neighborhood = {dataI.item.neighborhood} num = {dataI.item.num} street = {dataI.item.street} seg = {dataI.item.seg}  />
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/commerce.json').then((response) => response.json()).then((responseJson) =>{

            const commerceObject = responseJson;
            let aux = [];
            
             for( let i in commerceObject){
                for(let k in commerceObject[i].seg){
                    if(commerceObject[i].flag && tagsArray.find(tag => tag === commerceObject[i].seg[k]) != undefined && countryTagsArray.find(tag => tag === commerceObject[i].countries[k]) != undefined && stateTagsArray.find(tag => tag === commerceObject[i].states[k]) != undefined && cityTagsArray.find(tag => tag === commerceObject[i].cities[k]) != undefined){
                        aux.push(commerceObject[i]);
                        break;
                  }
                   console.log(tagsArray)
                }
                
            }

            //console.log(CommerceObject);
            setCommerceData(aux);  
            setInfoUpdated(true);
        });
    },[]);

    if(!infoUpdated){
        return(
            <View></View>
        );
    }
    else if(commerceData.length != 0){
        return (
            <View style = {styles.screen}>
                <FlatList data = {commerceData} renderItem = {renderI}></FlatList>
            </View>
        );
    }
    return (
        <View style = {styles.errorContainer}>
            <Text style = {styles.error} >There are still no options for the selected segments!</Text>
        </View>
    );
};
CommerceScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Commerces',
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
export default CommerceScreen;