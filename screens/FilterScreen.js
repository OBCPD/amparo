import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';

import  FilterCommerce from '../components/FilterCommerce';
import  FilterService from '../components/FilterService';
import CustomButton from '../components/CustomButton';
const FilterScreen = props =>{
    const filterType = props.navigation.getParam('type');


    if(filterType === 'commerce' || filterType === 'autonomous' ){
        return(
            <View style = {styles.screen}>
                <FilterCommerce navigation={props.navigation} type={filterType} />   
            </View>
        );
    }
    else if(filterType === 'service'){
        return(
            <View style = {styles.screen}>
                <FilterService navigation = {props.navigation} parent = 'service' /> 
            </View>
        );
    }
    else if(filterType === 'jobs'){
        return(
            <View style = {styles.screen}>
                <FilterService navigation = {props.navigation} parent = 'voluntaries' /> 
            </View>
        );
    }

};
FilterScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Filters',
    };
};
const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        alignContent: 'center',
        backgroundColor: 'rgb(240,240,240)',
        justifyContent: 'center'
    },


});
export default FilterScreen;