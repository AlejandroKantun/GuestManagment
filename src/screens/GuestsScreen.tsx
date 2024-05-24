import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, SafeAreaView, StyleSheet, TextInput, View } from 'react-native'
import { GuestsFlatList } from '../components/GuestsFlatList'
import { useGuest } from '../hooks/useGuest'
import { globalStyles, toHex } from '../theme/appTheme';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { AddEditGuestModal } from '../components/AddEditGuestModal';

const width= Dimensions.get("screen").width
const height= Dimensions.get("screen").height

export const GuestsScreen = () => {
    const [visible, setVisible] = useState(false)
    const {guest,loadGuests,isLoading}=useGuest()
    useEffect( () => {
        loadGuests()
    }, [])

    
  return (
    <View style={{flex:1}}>
    <SafeAreaView style={localStyles.mainContainer}>
        <View style={localStyles.SearchInput}>
          <Icon name="search-outline" size={height*0.035} color={'#000000'+toHex(127)} />

          <TextInput
          style={localStyles.textInput}
          //onChangeText={}
          //value={}
          placeholder="Nombre, Teléfono, Email"
          placeholderTextColor={'#000000'+toHex(127)}
          keyboardType="default"
          keyboardAppearance="default"
        ></TextInput>
        </View>
        {isLoading?
        <ActivityIndicator style={{flex:1}} size={height*0.035}/>
        :<GuestsFlatList
        data={guest}
        loadGuests={loadGuests}
        />
        }
        
        
        <View style={localStyles.buttonRow}>
          <TouchableOpacity onPress={()=>setVisible(true)} style={localStyles.buttonContainer}>
              <Icon name="person-add-outline" size={30} color={globalStyles.colors[1]} />
          </TouchableOpacity>
        </View>
        <AddEditGuestModal
          visible={visible}
          setVisible={setVisible}
          edit={false}
          loadGuests={loadGuests}
        />
    </SafeAreaView>
    
    </View>
    
  )
}

const localStyles = StyleSheet.create({
    mainContainer:{
      flex:1,
      justifyContent:'flex-end',
      backgroundColor:'#ffffff'+toHex(255)
    },
    SearchInput:{
      borderWidth:1,
      marginHorizontal:width*0.02,
      marginTop: height*0.01,
      marginBottom: height*0.005,
      borderRadius:10,
      borderColor:'#000000'+toHex(127),
      height:height*0.05,
      flexDirection:'row',
      alignItems:'center',
      paddingLeft:width*0.03
    },
    textInput:{
      flex:1,
    },
    buttonRow:{
      flexDirection:'row',
      justifyContent:'flex-end',
      alignItems:'center',
      height:height*0.1,
      paddingRight:width*0.07
    },
    buttonContainer:{
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:globalStyles.colors[5],
      borderRadius:50,
      height:height*0.06,
      width:height*0.06

    },
});