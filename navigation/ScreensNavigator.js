import React from 'react'
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer'


import AboutUsScreen from '../screens/AboutUsScreen';
import HomeScreen from '../screens/HomeScreen';
import FoodDonationScreen from '../screens/FoodDonationScreen';
import AutonomousScreen from '../screens/AutonomousScreen';
import SigninScreen from '../screens/SigninScreen';
import SigninCommerceScreen from '../screens/sub-signin-screens/SigninCommerceScreen';
import SigninAutonomousScreen from '../screens/sub-signin-screens/SigninAutonomousScreen';
import SigninServiceScreen from '../screens/sub-signin-screens/SigninServiceScreen';
import SigninRuralProducerScreen from '../screens/sub-signin-screens/SigninRuralProducerScreen';
import SigninJobsScreen from '../screens/sub-signin-screens/SigninJobsScreen';
import SigninVoluntaryScreen from '../screens/sub-signin-screens/SigninVoluntaryScreen';
import BasicBasketScreen from '../screens/sub-signin-screens/BasicBasketScreen';
import SugestionScreen from '../screens/sub-signin-screens/SugestionScreen';
import FilterScreen from '../screens/FilterScreen';
import CommerceScreen from '../screens/CommerceScreen';
import ServiceScreen from '../screens/ServiceScreen';
import RuralProducerScreen from '../screens/RuralProducerScreen';
import VoluntariesScreen from '../screens/VoluntariesScreen';
import JobsBalconyScreen from '../screens/JobsBalconyScreen';


const appDefaultNavigationOptions = {
    headerStyle: {
        backgroundColor: '#00cb4b',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    }
}
const AboutUs = createStackNavigator(
    {
        AboutUs : AboutUsScreen
    },
    {    
        defaultNavigationOptions: appDefaultNavigationOptions
    }
);



const HomeNavigator = createStackNavigator(
    {
        Home : HomeScreen,
        Signin: SigninScreen,
        SigninService: SigninServiceScreen,
        SigninCommerce: SigninCommerceScreen,
        SigninAutonomous: SigninAutonomousScreen,
        SigninRuralProducer: SigninRuralProducerScreen,
        SigninJobs: SigninJobsScreen,
        SigninVoluntary: SigninVoluntaryScreen,
        BasicBasket : BasicBasketScreen,
        Sugestion: SugestionScreen,
        FoodDonation: FoodDonationScreen ,
        Autonomous: AutonomousScreen,
        Filters : FilterScreen,
        Commerce : CommerceScreen,
        Service : ServiceScreen,
        RuralProducer : RuralProducerScreen,
        Voluntaries : VoluntariesScreen,
        JobsBalcony : JobsBalconyScreen
        

    },
    {
        defaultNavigationOptions: appDefaultNavigationOptions 
    }
);
const TabNavigator = createBottomTabNavigator(
    {
        
        HomeTab: {screen : HomeNavigator, navigationOptions : {
            tabBarIcon : (tabInfo) =>{
               return <Ionicons name = 'ios-home' size = {25} color = {tabInfo.tintColor} />;
            },
            tabBarLabel : 'Home'
        }},
        AboutUsTab : {screen : AboutUs, navigationOptions : {
            tabBarIcon : (tabInfo) =>{
               return <Ionicons name = 'ios-book' size = {25} color = {tabInfo.tintColor} />;
            },
            tabBarLabel : 'About Us'
        }},
    },
    {
        tabBarOptions : {
            activeTintColor : '#00cb4b'
        }
    }
);


export default createAppContainer(TabNavigator); 