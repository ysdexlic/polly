import { StyleSheet, Dimensions } from 'react-native'
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme

const resizeMode = 'contain'
const { width } = Dimensions.get('window')
const margin = 2

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        width: '100%',
    },
    innerContainer:{
        flex: 1,
        backgroundColor: '#EEF1F2',
        borderWidth: 1,
        borderColor: '#d0d5d8',
        borderRadius: 3,
        shadowColor: "#000000",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    button: {
        marginVertical: 10,
    },
    buttonContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingTop: 10
    },
    image:{
        width: (width/3) - (margin*2),
        height: (width/3) - (margin*2),
        margin: margin,
    },
})

export default styles
