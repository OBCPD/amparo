import React from 'react';
import { StyleSheet, TouchableHighlight, Text } from 'react-native';


const CustomButton = props =>{
    return (
        <TouchableHighlight style={styles.button} activeOpacity={0.7} underlayColor="lightblue" onPress ={props.onTouch}>    
            <Text style = {styles.btnTxt} >{props.title}</Text>
        </TouchableHighlight> 
    );
};

const styles = StyleSheet.create({
    button: {
        width: '40%',
        margin: 20,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#00cb4b',
        borderRadius: 10,
        overflow: 'hidden',
    },
    btnTxt: {
        color: 'white',
        textAlign: 'center',
        fontFamily : 'open-sans-bold',
    }

});
export default CustomButton;