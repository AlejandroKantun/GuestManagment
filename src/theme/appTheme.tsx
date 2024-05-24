import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export const globalStyles={
    globalMargin:{
        marginHorizontal:20
    },
    title:{
        fontSize:35,
        fontWeight:'bold',
        color:'black'
    },
    globalIcon:{
        color:'#5856D6',
    },
    globalTextNormal:{
        fontSize:20,
        fontWeight:'bold',
        color:'black'
    },
    LeaguePosterText:{
        fontSize:15,
        fontWeight:'bold',
        color:'black'
    },
    LeaguePosterImage:{
        flex:1,
        borderRadius:18,
    },
    LeaguePosterContainer:{
        flex:1,
        borderRadius:18,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 7,
        elevation: 9,
    },
    colors:{
        1:'#f8f6f6',
        2:'#e1e8ea',
        3:'#b3c8d5',
        4:'#8db8c9',
        5:'#67a5ad',
        white:"#e3e3e3",
        green:'#32a852',
        ambar:'#ba7832',
        red:'rgba(214, 62, 51,0.9)'
    },
    textSizes:{
        small:height*0.02,
        medium:height*0.025,
        big:height*0.040,
        posterTitle:height*0.0285,
    }
}

export function toHex(num: number): string {
    const map = "0123456789abcdef";
    let hex = num === 0 ? "0" : "";
    while (num !== 0) {
        hex = map[num & 15] + hex;
        num = num >>> 4;
    }
    return hex==='0'?'00':hex.toUpperCase();
}