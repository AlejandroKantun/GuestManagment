import { collection, doc, setDoc,deleteDoc,query,where,onSnapshot,updateDoc} from "firebase/firestore"; 
import { firestoreDb } from './Setup';
import { UserGuest } from '../interface/UserGuest';

const guestsRef = collection(firestoreDb, "guests");

export const createGuest= async (guest:UserGuest)=>{
    const ID=guest.firstName![0]+guest.firstName![1]+guest.lastName![0]+guest.lastName![1]+guest.phoneNumber?.toString().slice(-4);
    let success=false
    await setDoc(doc(guestsRef), {
        friendOf:         guest.friendOf,
        lastName:         guest.lastName,
        phoneNumber:      guest.phoneNumber,
        email:            guest.email,
        passesNumber:     guest.passesNumber,
        assistanceStatus: 'Creado',
        guestID:          ID,
        confirmedDated:   '',
        firstName:        guest.firstName,
        photoIDUploaded:  '',
        userNotified:     0,
        passesAcepted:    0,

    })
    .then((res) => {
        console.log("response:" + JSON.stringify(res));
        success=true;
      })
      .catch((err) => {
        console.log("unable to add user to database", err);
    });;
    return success
}

//Creado - Pendiente - Aceptado/Rechazado 

export const deleteGuest= async (guest:UserGuest)=>{
    let success=false

    const q = query(collection(firestoreDb, "guests"), where("guestID", "==", guest.guestID));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {

            await deleteDoc(doc.ref)
            .then((res) => {
                console.log("response of delete:" + JSON.stringify(res));
                success=true;
            })
            .catch((err) => {
                console.log("unable to add user to database", err);
            });

        });
    });

    
    return success
}

export const editUser= async (guest:UserGuest)=>{
    const ID=guest.firstName![0]+guest.firstName![1]+guest.lastName![0]+guest.lastName![1]+guest.phoneNumber?.toString().slice(-4);
    let success=false
    const q = query(collection(firestoreDb, "guests"), where("guestID", "==", guest.guestID));
    const snap = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {
                friendOf:         guest.friendOf,
                lastName:         guest.lastName,
                phoneNumber:      guest.phoneNumber,
                email:            guest.email,
                passesNumber:     guest.passesNumber,
                assistanceStatus: guest.assistanceStatus,
                guestID:          ID,
                confirmedDated:   guest.confirmedDated,
                firstName:        guest.firstName,
                photoIDUploaded:  guest.photoIDUploaded,
                userNotified:     guest.userNotified,
                passesAcepted:    guest.passesAcepted,
        
            })
            .then((res) => {
                console.log("response:" + JSON.stringify(res));
                success=true;
            })
            .catch((err) => {
                console.log("unable to edit user to database", err);
            });
        });
    })
    
    return success
}