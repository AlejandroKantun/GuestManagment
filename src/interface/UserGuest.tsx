export interface UserGuest {
    friendOf?:         string;
    lastName?:         string;
    phoneNumber?:      number;
    email?:            string;
    passesNumber?:     number;
    assistanceStatus?: string;
    guestID?:          string;
    confirmedDated?:   ConfirmedDated|string;
    firstName?:        string;
    photoIDUploaded?:  string;
    userNotified?:      number;
    passesAcepted?:     number;
}

export interface ConfirmedDated {
    seconds?:     number;
    nanoseconds?: number;
}