import React, { useState } from 'react'
import { Animated, Dimensions, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {deleteGuest } from '../firebase/GuestOperations';
import { UserGuest } from '../interface/UserGuest';
import { globalStyles } from '../theme/appTheme';
import CustomText from './CustomText';
import { iconTypes } from './InfoModal';

interface Props{
    progress: Animated.AnimatedInterpolation<string | number>,  
    dragX: Animated.AnimatedInterpolation<string | number>, 
    user:UserGuest,
    loadGuests:()=>void
}
const width= Dimensions.get("screen").width
const height= Dimensions.get("screen").height

export const GuestItemLeftAction = ({progress,dragX,user,loadGuests}:Props) => {
    const [deleteVisible, setDeleteVisible] = useState(false)
    const trans = dragX.interpolate({
        inputRange: [0, 50, 100 ],
        outputRange: [-100, -50, 0],
    });
    const opacityTrans=progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 1]
    })  
    return (
            <Animated.View
                style={[{...localStyles.eraseButtonContainer},{transform:[{translateX:trans}], opacity:opacityTrans}]}
            >
                <TouchableOpacity onPress={()=>{
                    //deleteGuest()
                    setDeleteVisible(true)}
                
                } style={{justifyContent:'center', width:100}}>
                    <Icon style={{alignSelf:'center'}} name={'trash-outline'} size={height*0.035} color={'white'}></Icon>
                </TouchableOpacity>
                <Modal
                    style={localStyles.mainModal}
                    visible={deleteVisible}
                    transparent={true}>
                    <View style={localStyles.mainModalView}>
                        <View style={localStyles.alertConfirmContainer}>
                        <Icon 
                            size={height*0.07}
                            color={globalStyles.colors.red}
                            name={iconTypes['iconError']}/>
                        <CustomText style={localStyles.messageText}>
                            ¿Eliminar a {user.firstName}?
                        </CustomText>
                        <View style={localStyles.buttonRow}>
                            <TouchableOpacity 
                                style={localStyles.buttonCancel} 
                                onPress={()=>{setDeleteVisible(false)}}>
                                <CustomText style={{color:globalStyles.colors.white}}>Cancelar</CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={localStyles.buttonConfirm} 
                                onPress={()=>{
                                        
                                        deleteGuest(user).then(success=>{
                                            if (success){
                                            }
                                            else{
                                            }
                                            loadGuests()
                                            setDeleteVisible(false)
                                            }
                                        )
                                    }}>
                                <CustomText style={{color:globalStyles.colors.white}}>Eliminar</CustomText>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>    
                </Modal>
            </Animated.View>           
    )
  
}

const localStyles = StyleSheet.create({
    eraseButtonContainer:{  
        backgroundColor: globalStyles.colors.red, 
        justifyContent: 'center', 
        margin:height*0.005,
        paddingVertical:height*0.025,
        borderRadius:2
    },
    mainModal:{
        justifyContent:'center',
        alignContent:'center',
        
    },
    mainModalView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    alertConfirmContainer:{
        width:width*0.5,
        height:width*0.6,
        borderRadius:10,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.25,
        elevation:10,
    },
    messageText:{
        color:'black',
        fontSize:height*0.015,
        paddingBottom:height*0.01
    },
    buttonRow:{
        width:width*0.5,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    buttonConfirm:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:globalStyles.colors[5],
        width:width*0.2,
        paddingVertical:height*0.01,
        borderRadius:4
    },
    buttonCancel:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'rgba(214, 62, 51,0.9)',
        width:width*0.2,
        paddingVertical:height*0.01,
        borderRadius:4
    },
});