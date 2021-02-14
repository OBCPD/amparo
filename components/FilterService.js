import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

import CustomButton from '../components/CustomButton';


    
    

const FilterService = props =>{

    const [infoUpdated, setInfoUpdated] = useState(false);
    const [segsData, setSegsData] = useState([]);
    const [segsFlags, setSegsFlags] = useState([]);
    const [segFlag, setSegFlag] = useState(false);
    const [segs, setSegs] = useState([]);
    let auxSegsFlags = [];
    
    useEffect(()=>{
      
        fetch('https://my-test-help-app.firebaseio.com/registers/professions.json').then((response) => response.json()).then((responseJson) =>{
            setSegsData([]);
            const segsArray = responseJson;
            for(let i in segsArray.lenght){
                auxSegsFlags.push(false); 
            }
            setSegsData(segsArray);  
            // setSegsFlags(auxSegsFlags);
            setInfoUpdated(true);
        });
    },[]);

    if(!infoUpdated){
        return(
            <View></View>
        );
    }

    const renderSegs = dataI =>{
       
        return(
            <CheckBox title = {dataI.item} checked = {segsFlags[dataI.index]} onPress = {() => {
                
                
                
                let aux = segs;
                
                for(let i in segsData){
                    
                    if(i == dataI.index){
                        auxSegsFlags[i] = !segsFlags[i];
                        console.log(auxSegsFlags[i]);
                    }
                    else{
                        auxSegsFlags[i] = segsFlags[i];
                    }
                }
                
               
                setSegsFlags(auxSegsFlags);
                console.log(auxSegsFlags);
                if(!auxSegsFlags[dataI.index]){
                    for(let i in aux ){
                        if(aux[i] === dataI.item ){
                            aux.splice(i);
                            setSegs(aux);
                        }

                    }
                }
                else{
                    
                    setSegs([...segs, dataI.item]);
                    console.log(segs);
                }
                
                
                
            }} />
        );
    }

    return (
    
        
            
            <View style = {styles.container}>
                <Text style = {styles.info}>Select the professions to be shown, if nothing is selected, no filters will be applied</Text>
                <ScrollView style = {styles.formContainer}>
                    <Text style = {styles.label}>Professions:</Text>
                    <View style = {styles.segsContainer}>
                        
                        <FlatList data = {segsData} renderItem = {renderSegs} ></FlatList>
                    </View>
                    <CustomButton title = 'Next' onTouch = {()=>{
                        let tags = segs;
                        if(segs.length === 0){
                            tags = segsData;
                        }
                        props.navigation.navigate({
                            routeName : (props.parent === 'service') ? 'Service' : 'JobsBalcony',
                            params :{
                                tags: tags
                            }
                        });
                        console.log(segs);
                }} />
                </ScrollView>
            </View>
            
    );
  
};

const styles = StyleSheet.create({
    container: {
        
        justifyContent: 'center',
        alignContent: 'center',
        width: '100%',
        height: '100%',
        
        //backgroundColor: 'white',
        
    },
    formContainer:{
        width: '80%',
        height: '100%',
        alignSelf: 'center'
    },
    scroll:{
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    },
    labelInput: {
        paddingHorizontal: 7,
        alignSelf: 'center',
        height: 40, 
        width: '95%',
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1,
        //borderRadius: 10,
        //backgroundColor: 'white'

    },
    label:{
        color: 'rgb(50,50,50)',
        fontSize: 17,
        fontFamily : 'open-sans',
        //marginBottom: 3,
        marginTop : 10
    },
    info:{
        width: '80%',
        alignSelf: 'center',
        color: '#00cb4b',
        fontSize: 18,
        textAlign: 'center',
        fontFamily : 'open-sans-bold',
        marginBottom: 20,
        marginTop : 20
    },
    subMsg :{
        fontSize: 15,
        textAlign: 'center',
        fontFamily : 'open-sans',
        marginTop : 20
    },
    iconContainer :{
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon:{
        marginTop: 9,
        marginRight: 2
    },
    segsContainer:{
        marginTop: 5,
        width: '95%',
        paddingLeft: '5%'
    },
    descInput:{
        paddingHorizontal: 7,
        alignSelf: 'center',
        height: 60, 
        width: '95%',
        borderBottomColor: '#ccc', 
        borderBottomWidth: 1,
        //borderRadius: 10,
        //backgroundColor: 'white'
    }
});

export default FilterService;