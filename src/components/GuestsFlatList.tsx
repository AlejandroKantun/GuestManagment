import React from 'react'
import { View,FlatList, Text, StyleSheet } from 'react-native'
import { UserGuest } from '../interface/UserGuest';
import { GuestItem } from './GuestItem';

interface Props{
    data:UserGuest[] | undefined,
    loadGuests:()=>void
}

export const GuestsFlatList = ({data,loadGuests}:Props) => {
  return (
    <View style={localStyles.mainContainer}>
        <FlatList
        data={data} 
        renderItem={({item}) => 
        <GuestItem 
          user={item}
          loadGuests={loadGuests}
        /> 
    }
        keyExtractor={item => item.guestID!}
      />
    </View>
  )
}
const localStyles = StyleSheet.create({
    mainContainer:{
        flex:1
    }
});