import React, { useState } from 'react'
import { Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, TouchableWithoutFeedbackBase, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import CustomText from './CustomText';
import Icon from 'react-native-vector-icons/Ionicons';
import { globalStyles } from '../theme/appTheme';
import { Dropdown } from 'react-native-element-dropdown';
import { createGuest, editUser } from '../firebase/GuestOperations';
import { UserGuest } from '../interface/UserGuest';
import { useNewGuest } from '../hooks/useNewGuest';
import { iconTypes, InfoModal } from './InfoModal';

const width= Dimensions.get("screen").width
const height= Dimensions.get("screen").height
interface Props{
    visible?:boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    edit: boolean,
    userGuest?:UserGuest,
    loadGuests: () => void
}

const data = [
    { label: 'Novia', value: 'Novia' },
    { label: 'Novio', value: 'Novio' },
  ];

export const AddEditGuestModal = ({visible,setVisible,edit,userGuest,loadGuests}:Props) => {

    const{guest,setPropertyOnGuest}=useNewGuest(userGuest?userGuest:undefined)

    const [isFocus, setIsFocus] = useState(false);
    const [warningVisible, setWarningVisible] = useState(false)
    const [infoMessage, setInfoMessage] = useState('')
    const [icon, setIcon] = useState<keyof typeof iconTypes>("iconWarning")
    let messageAux=""

  return (
          <Modal 
            animationType='slide'
            visible={visible}
            transparent={true}
            onRequestClose={()=>{setVisible(false)}}>
            <SafeAreaView style={localStyles.safeAreaContent}>
            <TouchableOpacity  style={localStyles.modalMain} onPressOut={()=>{setVisible(false)}} >
                <ScrollView  contentContainerStyle={localStyles.modalContainer}>
                            <TouchableWithoutFeedback >
                                    <View style={{height:height*0.7,width:width*0.95, justifyContent:'center',alignContent:'center'}} >
                                    <View style={localStyles.rowInput}>
                                        <Icon 
                                            style={{paddingHorizontal:10}} 
                                            name='person' 
                                            size={height*0.03}
                                            color={globalStyles.colors[3]} />
                                        <TextInput placeholder={'Nombre'} 
                                                    placeholderTextColor={globalStyles.colors[5]} 
                                                    style={localStyles.textInput}
                                                    value={guest.firstName}
                                                    onChangeText={(text)=> (setPropertyOnGuest('firstName',text))}
                                                    /> 
                                        <TextInput placeholder={'Apellido'} 
                                                    placeholderTextColor={globalStyles.colors[5]} 
                                                    value={guest.lastName}
                                                    onChangeText={(text)=> (setPropertyOnGuest('lastName',text))}
                                                    style={localStyles.textInput}/> 
                                    </View>
                                    <View style={localStyles.rowInput}>
                                        <Icon 
                                            style={{paddingHorizontal:10}} 
                                            name='ticket-outline' 
                                            size={height*0.03}
                                            color={globalStyles.colors[3]} />
                                        <TextInput placeholder={'Numero de Pases'} 
                                                    value={guest.passesNumber?guest.passesNumber?.toString():''}
                                                    keyboardType={'number-pad'}
                                                    placeholderTextColor={globalStyles.colors[5]} 
                                                    onChangeText={(text)=> (setPropertyOnGuest('passesNumber',Number(text)))}
                                                    style={localStyles.textInput}
                                                    /> 
                                    </View>
                                    <View style={localStyles.rowInput}>
                                        <Icon 
                                            style={{paddingHorizontal:10}} 
                                            name='call-outline' 
                                            size={height*0.03}
                                            color={globalStyles.colors[3]} />
                                        <TextInput placeholder={'Teléfono'} 
                                                    placeholderTextColor={globalStyles.colors[5]}
                                                    value={guest.phoneNumber?guest.phoneNumber?.toString():''} 
                                                    style={localStyles.textInput}
                                                    onChangeText={(text)=> (setPropertyOnGuest('phoneNumber',Number(text)))}
                                                    keyboardType={'number-pad'}
                                                    /> 
                                    </View>
                                    <View style={localStyles.rowInput}>
                                        <Icon 
                                            style={{paddingHorizontal:10}} 
                                            name='at-outline' 
                                            size={height*0.03}
                                            color={globalStyles.colors[3]} />
                                        <TextInput placeholder={'E-mail'} 
                                                    keyboardType={'email-address'}
                                                    onChangeText={(text)=> (setPropertyOnGuest('email',text))}
                                                    value={guest.email}
                                                    placeholderTextColor={globalStyles.colors[5]} 
                                                    style={localStyles.textInput}
                                                    /> 
                                    </View>
                                    <View style={localStyles.rowInput}>
                                    <Dropdown
                                       style={[localStyles.dropdown, isFocus && { borderColor: 'blue' }]}
                                       placeholderStyle={localStyles.placeholderStyle}
                                       selectedTextStyle={localStyles.selectedTextStyle}
                                       // inputSearchStyle={localStyles.inputSearchStyle}
                                       // iconStyle={localStyles.iconStyle}
                                        data={data}
                                        search
                                        maxHeight={400}
                                        labelField="label"
                                        valueField="value"
                                        placeholder={!isFocus ? ' Conocido de' : '...'}
                                        searchPlaceholder=""
                                        value={guest.friendOf}
                                        onBlur={() => setIsFocus(false)}
                                        renderItem={ (item) => 
                                            <View >
                                                <CustomText style={{marginVertical:6, fontSize:18,color:globalStyles.colors[5]}}>
                                                    {item.label} 
                                                </CustomText>
                                            </View>
                                        }
                                        onChange={(item)=>{
                                             (setPropertyOnGuest('friendOf',item.value))
                                        }}
                                        renderLeftIcon={() => (
                                            <Icon 
                                            name="people-circle-outline" 
                                            size={width*0.055} 
                                            color={globalStyles.colors[5]} />
                                        )}
                                    />

                                    </View>
                                    <View style={localStyles.buttonRow}>
                                        <TouchableOpacity style={localStyles.buttonCancel}
                                        onPress={()=>{setVisible(false)}}   >
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
                                        <TouchableOpacity 
                                            style={localStyles.buttonSave}
                                            onPress={()=>{                                                
                                                // validations
                                                messageAux=""
                                                if ((guest.firstName!?.length<1)
                                                    ||(guest.lastName!?.length<1)
                                                    ||(guest.passesNumber===undefined)
                                                    ||(guest.passesNumber<1)
                                                    ||(guest.phoneNumber===undefined)
                                                    ||(guest.phoneNumber!.toString().length<10)
                                                    ||(guest.email!.length<4)
                                                    ||(guest.friendOf!.length<2)

                                                    )
                                                    { 
                                                    if(guest.firstName!.length<1){messageAux=messageAux+'\n'+'- Nombre de invitado'}
                                                    if(guest.lastName!.length<1){messageAux=messageAux+'\n'+'- Apellido de invitado'}
                                                    if(guest.passesNumber!<1||(guest.passesNumber===undefined)){messageAux=messageAux+'\n'+'- Agrega pases'}
                                                    if((guest.phoneNumber!.toString().length<10)||(guest.phoneNumber===undefined)){messageAux=messageAux+'\n'+'- Número inválido'}
                                                    if(guest.email!.length<4){messageAux=messageAux+'\n'+'- Agrega email valido'}
                                                    if(guest.friendOf!.length<2){messageAux=messageAux+'\n'+'- Conocido de'}
                                                    setInfoMessage(messageAux)
                                                    setIcon('iconError')
                                                    setWarningVisible(true)

                                                    }
                                                else{
                                                    if(edit){
                                                        editUser(guest).then(success=>{
                                                                setIcon('iconSuccess')
                                                                setInfoMessage(`Invitado ${guest.firstName} ${guest.lastName} Modificado`)
                                                                setVisible(false)
                                                                setTimeout(() => {
                                                                    loadGuests()
                                                                }, 1000);
                                                         });
                                                    }
                                                    else{
                                                        createGuest(guest).then(success=>{
                                                            if (success){
                                                                setIcon('iconSuccess')
                                                                setInfoMessage(`Invitado ${guest.firstName} ${guest.lastName} creado`)
                                                                setWarningVisible(true)
                                                            }
                                                            else{
                                                                setIcon('iconError')
                                                                setInfoMessage(`Invitado ${guest.firstName} ${guest.lastName} no pudo ser creado`)
                                                                setWarningVisible(true)
                                                            }
                                                        });
                                                    }
                                                }
                                                
                                                }}>
                                        <Icon 
                                            style={{paddingRight:10}} 
                                            name='person' 
                                            size={height*0.02}
                                            color={'#ffffff'} />
                                            <CustomText style={{color:'white'}}>
                                                Guardar
                                            </CustomText>
                                        </TouchableOpacity>
                                    </View>
                                    
                                </View>                                
                            </TouchableWithoutFeedback>
                </ScrollView>
                
            </TouchableOpacity>
            </SafeAreaView>
            <InfoModal
                visible={warningVisible}
                setVisible={setWarningVisible}
                icon={icon}
                infoMessage={infoMessage}
                setVisibleAnother={setVisible}
            />
        </Modal>
    
  )
}
const localStyles = StyleSheet.create({
    modalMain:{
       justifyContent:'center',
       alignContent:'center',
       alignItems:'center',
       paddingTop:height*0.15,
    },
    safeAreaContent:{
        flex:1,
        width:width,
        backgroundColor:'rgba(0,0,0,0.3)', 
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center'},
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
    rowInput:{
        flexDirection:'row',
        alignItems:"center",
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.5)',
        borderRadius:8,
        marginHorizontal:width*0.02,
        marginBottom:height*0.015
    },
    textInput:{ 
        flex:1, 
        color:'black',
        fontSize:height*0.0175,
        paddingVertical:height*0.013},
    buttonRow:{
        justifyContent:'space-around',
        flexDirection:'row',
        paddingTop:height*0.02
    },
    buttonSave:{
        flexDirection:'row',
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'center',
        backgroundColor:globalStyles.colors[5],
        width:width*0.3,
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
        width:width*0.3,
        paddingVertical:height*0.01,
        borderRadius:4
    },
    dropdown: {
        marginHorizontal: 16,
        height: 50,
        width:width*0.85,
        borderBottomColor: 'gray',
      },
      placeholderStyle: {
        fontSize: 16,
        color:globalStyles.colors[5]
      },
      selectedTextStyle:{
        fontSize: 16,
        color:'black',
        paddingLeft:10
      }
});

