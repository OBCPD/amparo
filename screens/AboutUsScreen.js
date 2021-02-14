import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

const AboutUsScreen = props => {

    return (
        <View style = {styles.screen}>
           
            
            <ScrollView>  
                <View style = {styles.imageContainer}>
                    <Image style = {styles.img} source= {require('../assets/Logo_Hackathon_1.png')} />
                    
                </View>
                    
                <Text style={styles.subtitle}>About Us</Text>
                <View style={styles.aboutContainer}>
                <Text style = {styles.txt}>We are high school students willing to help our country’s poor communities which suffered a lot during pandemic times and decided to create a way to facilitate the assistance of these people.

Inspired by our country’s needy communities, our group decided to develop an app with the purpose to help underprivileged people to be able to keep themselves and their families over the misery line.
Emerging countries suffered a big impact from the coronavirus crisis, for example, Latin America reached 10,6% unemployment rate by the end of 2020, which means that about 30 million people do not have a formal job.
For these countries’ poor people, the pandemic is very hard to deal with and many of the inhabitants of these places looked for informal jobs to get an income, while others depend on donations to keep their families alive.
Considering these facts, we decided to create an app that connected donors to these communities and this population, who bore an overpowering need to get a job or sell their productions, to people who wish for it.
This way we could help to prevent thousands of people deaths by hunger in underdeveloped countries and provide job opportunities easier. Our app also allows autonomous sellers to learn how to sell their products and services in an easy and accessible platform.</Text>
                
                   
                   
               </View> 
                    
            </ScrollView>
            
            <LinearGradient colors={['rgb(200,200,200)','rgb(225,225,225)', 'rgb(255,255,255)']} style = {styles.gradientStyle} >
                <Text style = {styles.footer}>"Amparo" Aluisio, Julia, Thiago e Marcos.</Text>
            </LinearGradient>
            
        </View>
    );
}
AboutUsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'About Us',
       
    }
};
const styles = StyleSheet.create({
    screen: {
        alignItems: "center", 
        justifyContent: 'center', 
        height: '100%',
        backgroundColor: 'rgb(240,240,240)',
        width: '100%',
        
    },
    textContainer: {
        width:'80%',
        alignItems: "center",   
    },
    subtitle : {
        fontFamily: 'open-sans-bold',
        fontSize: 25,
        color: '#00cb4b',
        marginTop: 10,
        textAlign: "center",
    },
   
    txt:{
        marginTop: 5,
        textAlign: "center",
        fontFamily: 'open-sans',
        fontSize: 17,
        paddingBottom: 100
    },
    footer:{
        color:'#00cb4b',
        fontFamily: 'open-sans-bold',
        fontSize: 12,
        backgroundColor: 'transparent',
        flex: 1,
        textAlign: 'center'
        
    },
    gradientStyle:{
        padding: 10, 
        alignItems: 'center', 
        width: '100%',
        position: 'absolute', 
        bottom: 0,
    },
    img : {
        width: 200,
        height: 200,
        borderColor: 'grey',
        borderWidth: .5,
        borderRadius: 30,
        backgroundColor :'white',
        alignSelf: 'center'

    },
   
    imageContainer:{
        marginTop: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
    iconContainer :{
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        marginTop: 6,
        marginRight: 2
    },
    aboutContainer: {
        width: '95%',
        alignSelf: 'center'
    }
    

});
export default AboutUsScreen;