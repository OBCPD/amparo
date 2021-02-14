import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


import  DonationPoint from '../components/DonationPoint';


const FoodDonationScreen = props => {
    const [infoUpdated, setInfoUpdated] = useState(false);
    const [pointsData, setPointsData] = useState([]);

    const renderI = dataI =>{
        return(
            <DonationPoint responsible = {dataI.item.nome} local = {dataI.item.local} num = {dataI.item.num} picpay = {dataI.item.picpay}  />
        );
    }
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/food%20donation.json').then((response) => response.json()).then((responseJson) =>{
            console.log(responseJson);
            let aux = []
            for (let i in responseJson) {
                if (responseJson[i].flag === true) {
                    aux.push(responseJson[i]);
                }
            }
            setPointsData(aux);  
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
            {/* <View style = {styles.titleContainer}>
                <Text style = {styles.title}>Pontos de coleta:</Text>
            </View> */}
            <FlatList data = {pointsData} renderItem = {renderI}></FlatList>
        </View>
    );
};
FoodDonationScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Donation Points',
    };
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgb(240,240,240)',
        
    },
    title:{
        color: 'dodgerblue',
        fontFamily : 'open-sans-bold',
        fontSize: 20,
    
        
    },
    titleContainer:{
        width: '100%',
        
        marginTop: 10,
        paddingLeft: 10,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        
    }
});
export default FoodDonationScreen;
