import { StyleSheet, Dimensions } from 'react-native'

import { color, fontFamily, padding, fontSize } from '../../styles/theme'

const { width } = Dimensions.get('window')
const margin = 2

const styles = StyleSheet.create({
    modal: {
        flex: 1,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingTop: 40,
        backgroundColor: color.white
    },
    image:{
        width: (width/3) - (margin*2),
        height: (width/3) - (margin*2),
        margin: margin,
    },
})


export default styles
