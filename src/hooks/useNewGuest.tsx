import React, { useState } from 'react'
import { UserGuest } from '../interface/UserGuest';

const userToStart:UserGuest={
  friendOf:         '',
  lastName:         '',
  phoneNumber:      0,
  email:            '',
  passesNumber:     0,
  assistanceStatus: '',
  guestID:          '',
  confirmedDated:   '',
  firstName:        '',
  photoIDUploaded:  '',
  userNotified:     0,
  passesAcepted:    0
}
export const useNewGuest = (guestIn?:UserGuest) => {
  
  const [guest, setGuest] = useState<UserGuest>(guestIn?guestIn:userToStart)
  const setPropertyOnGuest=(field:keyof UserGuest,value:any)=>{
    setGuest({
        ...guest,
        [field]:value
    })
    }

  return {
    guest,
    setPropertyOnGuest 
 }
}
