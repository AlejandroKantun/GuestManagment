import React, { useState } from 'react'
import { collection,query, onSnapshot} from "firebase/firestore"; 
import { UserGuest } from '../interface/UserGuest';
import { firestoreDb } from '../firebase/Setup';

export const useGuest = () => {
  const [guest, setGuest] = useState<UserGuest[]>()
  const [isLoading, setIsLoading] = useState(false)
  let guestsAux:UserGuest[]=[]

  const loadGuests=()=>{
    setIsLoading(true)
    const q = query(collection(firestoreDb, "guests"));
    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        guestsAux.push((doc.data() as UserGuest))
        console.log(JSON.stringify(doc.data()))
      });
    setGuest([...new Set(guestsAux)])
    setIsLoading(false)
    });
  }

  return {
    guest,
    loadGuests,
    isLoading
  }
}
