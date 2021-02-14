import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { FlatList, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native-gesture-handler';
//import { HeaderButtons, Item} from 'react-navigation-header-buttons'



const SigninScreen = props => {
    return(
        <View style = {styles.screen}>
            <ScrollView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.push('SigninCommerce');
                    }}
                >
                    <Text style = {styles.buttonText} >Register Commerce</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.push('SigninService');
                    }}
                >
                    <Text style = {styles.buttonText} >Register Service Provider</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.push('SigninRuralProducer');
                    }}
                >
                    <Text style = {styles.buttonText} >Register Rural Producer</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.push('SigninJobs');
                    }}
                >
                    <Text style = {styles.buttonText} >Register Job Searcher</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.push('SigninVoluntary');
                    }}
                >
                    <Text style = {styles.buttonText} >Register Volunteer Work</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.push('SigninAutonomous');
                    }}
                >
                    <Text style = {styles.buttonText} >Register Autonomous Enterprise</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        props.navigation.push('BasicBasket');
                    }}
                >
                    <Text style = {styles.buttonText} >Register Food Donation</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        
                        props.navigation.push('Sugestion');
                        console.log(props.navigation.state);
                    }}
                >
                    <Text style = {styles.buttonText} >Suggestions or Complaints</Text>
                </TouchableOpacity>
                
            </ScrollView>
           
        </View>
    );
};

SigninScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Registers',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgb(240,240,240)',
        
    },
    button: {
        
        margin: 20,
        width: '85%',
        padding : 10,
        borderColor : 'gray',
        alignSelf: 'center',
        backgroundColor: '#00cb4b',
        borderRadius: 10
    },
    buttonText: {
        
        textAlign: 'center',
        color : 'white',
        fontFamily: 'open-sans-bold',
        margin: 10
    },
    adContainer: {
        position: 'absolute',
        bottom: 0
    }
});

export default SigninScreen;