import React, { Component } from 'react'
import { ScrollView, View, TouchableHighlight, Text, Modal, Image } from 'react-native'

import styles from './styles'

export class CameraRollModal extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.props.visible}
                onRequestClose={this.props.close}
                style={styles.modal}>

                <ScrollView>
                    <View style={styles.container}>
                        {this.props.edges.map((edge, i) =>
                            <Image
                                key={i}
                                style={styles.image}
                                source={{ uri: edge.node.image.uri }}
                            />
                        )}
                    </View>
                </ScrollView>

                <TouchableHighlight
                    onPress={this.props.close}
                >
                    <Text>Close</Text>
                </TouchableHighlight>

            </Modal>
        )
    }
}

export default CameraRollModal
