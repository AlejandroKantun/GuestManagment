import React, { useState } from 'react'
import { View, StyleSheet, Dimensions, Linking, TouchableOpacity, Animated, Modal, ScrollView, SafeAreaView } from 'react-native';
import { devIP, messageWhatsApp } from '../globalSettings';
import { UserGuest } from '../interface/UserGuest';
import CustomText from './CustomText';
import { globalStyles, toHex } from '../theme/appTheme';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/Ionicons';
import { GuestItemLeftAction } from './GuestItemLeftAction';
import { GuestItemRightAction } from './GuestItemRightAction';

const width= Dimensions.get("screen").width
const height= Dimensions.get("screen").height
interface Props {
    user:UserGuest,
    loadGuests:()=>void
}



export const GuestItem = ({user,loadGuests}:Props) => {
    

    const [shareModalVisible, setShareModalVisible] = useState(false)
  return (
    <Swipeable 
        renderLeftActions={(progress, dragX)=>
                            <GuestItemLeftAction
                                progress={progress}
                                dragX={dragX}
                                user={user}
                                loadGuests={loadGuests}
                            />
                            }
        renderRightActions={(progress, dragX)=>
            <GuestItemRightAction
                progress={progress}
                dragX={dragX}
                user={user}
                loadGuests={loadGuests}
            />
            }
    >
    <View style={localStyles.mainContainer} >
        <View style={localStyles.mainGuestInformation}>
            <Icon name={'person-outline'} color={globalStyles.colors[5]} size={height*0.0425}></Icon>
            <View style={localStyles.guestInformation}>
                <CustomText style={localStyles.mainInformation}>{user.firstName} {user.lastName}</CustomText>
                <CustomText style={localStyles.detailInformation}>{user.email}  </CustomText>
                <CustomText style={localStyles.detailInformation}>{user.phoneNumber} </CustomText>
            </View>
            <TouchableOpacity style={localStyles.shareButton}
                onPress={()=>{setShareModalVisible(true)}}
                >
                <Icon name={'share-social-outline'} color={globalStyles.colors.white} size={height*0.035}></Icon>
            </TouchableOpacity>
        </View>
        <View style={localStyles.separator}></View>
        <View style={localStyles.passesInfoRow}>
            <View style={localStyles.ticketAndStatusContainer}>
                <CustomText style={{marginHorizontal:width*0.01,fontSize:15}} >¿Aceptada?</CustomText>
                <Icon 
                      name={ user.assistanceStatus==='Pendiente'?'hourglass-outline':
                             user.assistanceStatus==='Aceptado'?'checkmark-circle-outline':
                             user.assistanceStatus==='Rechazado'?'close-circle-outline':
                             'cloud-offline-outline'
                            } 
                      color={
                                user.assistanceStatus==='Pendiente'?globalStyles.colors.ambar:
                                user.assistanceStatus==='Aceptado'?globalStyles.colors.green:
                                user.assistanceStatus==='Rechazado'?globalStyles.colors.red:
                                globalStyles.colors.ambar
                            } 
                      size={height*0.03}/>
            </View>
            <View style={localStyles.ticketAndStatusContainer}>
                <CustomText style={{marginHorizontal:width*0.015 ,fontSize:20}}>{user.passesNumber?user.passesNumber:'¿?'}</CustomText>
                <Icon name={'ticket-outline'} color={globalStyles.colors[4]} size={height*0.03}/>
            </View>
            <View style={localStyles.ticketAndStatusContainer}>
                <CustomText style={{marginHorizontal:width*0.015 ,fontSize:20}}>{user.passesAcepted?user.passesAcepted:'¿?'}</CustomText>
                <Icon name={'ticket-outline'} color={globalStyles.colors[4]} size={height*0.03}/>
            </View>
        </View>
        
     
    </View>
    <Modal 
            animationType='slide'
            visible={shareModalVisible}
            transparent={true}
            onRequestClose={()=>{setShareModalVisible(false)}}
            >
                <SafeAreaView style={localStyles.safeArea}>
                    <View
                    style={localStyles.mainInfoContainer}>
                        <TouchableOpacity
                        onPress={async ()=>{await Linking.openURL(`https://wa.me/?text=${messageWhatsApp('MarisaYDavid.com')}&phone=+52${user.phoneNumber}`)}}
                            style={{width:width*0.15, height:width*0.15,backgroundColor:globalStyles.colors[5],justifyContent:'center',alignItems:'center', borderRadius:5}}
                            >
                            <Icon name={'logo-whatsapp'} size={width*0.11} color={globalStyles.colors.white} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>setShareModalVisible(false)}
                            style={{width:width*0.15, height:width*0.15,backgroundColor:globalStyles.colors[5],justifyContent:'center',alignItems:'center', borderRadius:5}}
                            >
                            <Icon name={'mail-outline'} size={width*0.11} color={globalStyles.colors.white} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
    
        </Modal>
    </Swipeable>
    
  )
}

 const localStyles = StyleSheet.create({
     mainContainer:{
         justifyContent:'center',
         alignItems:'center',
         alignSelf:'center',
         borderRadius:18,
         borderWidth:2,
         width:width*0.96,
         marginVertical:height*0.005,
         paddingVertical:height*0.025,
         borderColor:globalStyles.colors[5]+toHex(127)
    }, 
    mainInformation:{
        fontSize:height*0.02
    },
    detailInformation:{
        fontSize:height*0.015
    },
    modalContainer:{
        backgroundColor:'white',
        height:height*0.5,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        shadowOffset:{
            width:0,
            height:10
        },
        shadowOpacity:0.25,
        elevation:10,
    },
    mainGuestInformation:{
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        width:width*0.9,
        paddingTop:height*0.005
    },
    shareButton:{
        borderWidth:1,
        borderColor:globalStyles.colors[5],
        backgroundColor:globalStyles.colors[5],
        width:width*0.15,
        height:width*0.15,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    guestInformation:{
        justifyContent:'center',
        alignItems:'center'
    },
    separator:{
        borderWidth:1,
        width:width*0.85,
        marginVertical:height*0.005,
        borderColor:'rgba(0,0,0,0.3)'
    },
    passesInfoRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        width:width*0.7
    },
    ticketAndStatusContainer:{
        flexDirection:'row',
        alignItems:'center'
    },


    safeArea:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    mainInfoContainer:{
        width:width*0.6,
        height:height*0.3, 
        backgroundColor:'white',
        borderRadius:10,
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row'
    },
 })