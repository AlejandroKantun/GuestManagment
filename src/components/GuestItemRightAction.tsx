import React, { useState } from 'react'
import { Animated, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { UserGuest } from '../interface/UserGuest';
import { globalStyles } from '../theme/appTheme';
import { AddEditGuestModal } from './AddEditGuestModal';


interface Props{
    progress: Animated.AnimatedInterpolation<string | number>,  
    dragX: Animated.AnimatedInterpolation<string | number>, 
    user:UserGuest,
    loadGuests:()=>void
}
const width= Dimensions.get("screen").width
const height= Dimensions.get("screen").height

export const GuestItemRightAction = ({progress,dragX,user,loadGuests}:Props) => {
    const [visible, setVisible] = useState(false)

    const trans = dragX.interpolate({
        inputRange: [0, 50, 100 ],
        outputRange: [100, 150, 200],
    });
    const opacityTrans=progress.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0.5, 1]
    })  
    return (
            <Animated.View
                style={[{...localStyles.editButtonContainer},{transform:[{translateX:trans}], opacity:opacityTrans}]}
            >
                <TouchableOpacity onPress={()=>{
                    //deleteGuest()
                    setVisible(true)}
                } style={localStyles.iconContainer}>
                    <Icon style={{alignSelf:'center'}} name={'create-outline'} size={height*0.035} color={'white'}></Icon>
                </TouchableOpacity>
                <AddEditGuestModal
                        visible={visible}
                        setVisible={setVisible}
                        edit={true}
                        userGuest={user}
                        loadGuests={loadGuests}
                    />   
            </Animated.View>           
    )
  
}

const localStyles = StyleSheet.create({
    editButtonContainer:{  
        backgroundColor: globalStyles.colors[3], 
        justifyContent: 'center', 
        margin:height*0.005,
        paddingVertical:height*0.025,
        borderRadius:2
    },
    iconContainer:{
        justifyContent:'center',
        width:100
    }
});