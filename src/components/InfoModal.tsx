import React from 'react'
import { Modal, View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { globalStyles } from '../theme/appTheme';
import CustomText from './CustomText';
const width= Dimensions.get("screen").width
const height= Dimensions.get("screen").height

export enum iconTypes{
    iconWarning='information-circle-outline',
    iconError='warning-outline',
    iconSuccess='checkmark-circle-outline'
}

interface Props{
    visible?:boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    icon?:keyof typeof iconTypes,
    infoMessage?:string,
    setVisibleAnother?:React.Dispatch<React.SetStateAction<boolean>>,
}

export const InfoModal = ({visible,setVisible,icon,infoMessage,setVisibleAnother}:Props) => {
  return (
    <Modal 
    animationType='slide'
    visible={visible}
    transparent={true}
    onRequestClose={()=>{setVisible(false)}}>
        <SafeAreaView style={localStyles.safeArea}>
            <View
            style={localStyles.mainInfoContainer}>
                <Icon 
                size={height*0.1}
                color={icon==='iconSuccess'?  globalStyles.colors.green: globalStyles.colors.red}
                name={icon==='iconError'? iconTypes['iconError']
                :icon==='iconWarning'? iconTypes['iconWarning']
                :icon==='iconSuccess'? iconTypes['iconSuccess']
                :iconTypes['iconWarning']}/>
                <CustomText style={localStyles.messageText}>
                    {infoMessage}
                </CustomText>
                <TouchableOpacity style={localStyles.buttonCancel}
                                        onPress={()=>{
                                            setVisible(false)
                                            setVisibleAnother!(false)}}   >
                                        <Icon 
                                            style={{paddingRight:10}} 
                                            name='close' 
                                            size={height*0.02}
                                            color={'#ffffff'} />
                                            <CustomText style={{color:'white'}}
                                                >
                                                Cerrar
                                            </CustomText>
                                        </TouchableOpacity>
            </View>
        </SafeAreaView>
    
</Modal>
  )
}

const localStyles = StyleSheet.create({
    safeArea:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    mainInfoContainer:{
        width:width*0.9,
        height:height*0.5, 
        backgroundColor:'white',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },
    messageText:{
        color:'black',
        fontSize:height*0.02,
        paddingBottom:height*0.01
    },
    buttonCancel:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:'rgba(214, 62, 51,0.9)',
        width:width*0.3,
        paddingVertical:height*0.01,
        borderRadius:4
    },
});
