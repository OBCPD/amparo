import React from 'react';
import { StyleSheet, View, Text, Linking } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
//import { HeaderButtons, Item} from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = props => {
    return(
        <View style = {styles.screen}>
            <ScrollView >
                <View style={styles.container}>
                    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'FoodDonation',
                            });
                        }}
                    >
                        <Ionicons name = 'ios-cart' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Food Donation</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'Filters',
                                params : {
                                    type : 'autonomous'
                                }
                            });
                        }}
                    >
                        <Ionicons name = 'ios-megaphone' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Autonomous</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.container}>   
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'Filters',
                                params : {
                                    type : 'commerce'
                                }
                            });
                        }}
                    >
                        <Ionicons name = 'ios-basket' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Commerce</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'Filters',
                                params : {
                                    type : 'service'
                                }
                            });
                        }}
                    >
                        <Ionicons name = 'ios-construct' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Service Provider</Text>
                    </TouchableOpacity>
                </View>
                <View style = {styles.container}>    
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'RuralProducer'
                            });
                        }}
                    >
                        <Ionicons name = 'ios-nutrition' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Rural Producer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'Filters',
                                params : {
                                    type : 'jobs'
                                }
                            });
                        }}
                    >
                        <Ionicons name = 'ios-briefcase' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Looking for a Job</Text>
                    </TouchableOpacity>
                </View> 
                <View style = {styles.container}>   
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'Voluntaries'
                            });
                        }}
                    >
                        <Ionicons name = 'ios-contacts' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Volunteer Work</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            props.navigation.navigate({
                                routeName : 'Signin',
                            });
                        }}
                    >
                        <Ionicons name = 'ios-clipboard' size = {50} color = 'white' />
                        <Text style = {styles.buttonText} >Register</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
            
        </View>
    );
};

HomeScreen.navigationOptions = navData => {
    return{
        headerTitle: 'Home',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'rgb(240,240,240)',
        
    },
    container:{
        
        alignSelf: 'center',
        flexDirection: 'row',
    },
    button: {
        
        margin: 20,
        width: 150,
        height: 120,
        padding : 15,
        borderColor : 'gray',
        alignSelf: 'center',
        backgroundColor: '#00cb4b',
        borderRadius: 10
    },
    buttonText: {
        position: 'absolute', 
        bottom: 0,
        //textAlign: 'center',
        color : 'white',
        fontFamily: 'open-sans-bold',
        margin: 10
    },
    
});

export default HomeScreen;