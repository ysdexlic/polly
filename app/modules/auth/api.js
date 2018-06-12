import { auth, database, provider, provider2 } from '../../config/firebase'

//Register the user using email and password
export const register = (data, callback) => {
    const { email, password, username } = data
    auth.createUserWithEmailAndPassword(email, password)
        .then((resp) => createUser({ username, uid:resp.user.uid }, callback))
        .catch((error) => callback(false, null, error))
}

//Create the user object in realtime database
export const createUser = (user, callback) => {
    const userRef = database.ref().child('users')

    userRef.child(user.uid).update({ ...user })
        .then(() => callback(true, user, null))
        .catch((error) => callback(false, null, {message: error}))
}

//Sign the user in with their email and password
export const login = (data, callback) => {
    const { email, password } = data
    auth.signInWithEmailAndPassword(email, password)
        .then((resp) => getUser(resp.user, callback))
        .catch((error) => callback(false, null, error))
}

//Get the user object from the realtime database
export const getUser = (user, callback) => {
    database.ref('users').child(user.uid).once('value')
        .then((snapshot) => {

            console.log(snapshot)

            const exists = (snapshot.val() !== null)

            //if the user exist in the DB, replace the user variable with the returned snapshot
            if (exists) user = snapshot.val()

            const data = { exists, user }
            callback(true, data, null)
        })
        .catch(error => callback(false, null, error))
}

//Send Password Reset Email
export const resetPassword = (data, callback) => {
    const { email } = data
    auth.sendPasswordResetEmail(email)
        .then((user) => callback(true, null, null))
        .catch((error) => callback(false, null, error))
}

export const signOut = (callback) => {
    auth.signOut()
        .then(() => {
            if (callback) callback(true, null, null)
        })
        .catch((error) => {
            if (callback) callback(false, null, error)
        })
}

//Sign user in using Facebook
export const signInWithFacebook = (fbToken, callback) => {
    const credential = provider2.credential(fbToken)
    auth.signInAndRetrieveDataWithCredential(credential)
        .then((user) => {
            console.log(user)
            getUser(user.user, callback)
        })
        .catch((error) => {
            console.error(error)
            callback(false, null, error)
        })
}
