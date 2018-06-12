// import RNFetchBlob from 'react-native-fetch-blob'
import { storage } from '../../config/firebase'

// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

export const uploadProfileImage = (data, callback) => {
    const { userId, imageUri, imageName } = data

    uploadImage('profile-images', imageUri, imageName)
        .then(res => {
            console.log(res)
        })
}



const uploadImage = (ref, uri, imageName, mime = 'image/jpg') => {
  // return new Promise((resolve, reject) => {
  //   const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
  //     let uploadBlob = null
  //     const imageRef = storage.ref().child(imageName)
  //     fs.readFile(uploadUri, 'base64')
  //     .then((data) => {
  //       return Blob.build(data, { type: `${mime};BASE64` })
  //     })
  //     .then((blob) => {
  //       uploadBlob = blob
  //       return imageRef.put(blob, { contentType: mime })
  //     })
  //     .then(() => {
  //       uploadBlob.close()
  //       return imageRef.getDownloadURL()
  //     })
  //     .then((url) => {
  //       resolve(url)
  //     })
  //     .catch((error) => {
  //       reject(error)
  //     })
  // })
}
