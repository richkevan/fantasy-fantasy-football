import React from 'react'
import firebase from "firebase/app"
import {useHistory} from "react-router-dom"
import {Button} from '@chakra-ui/core'





const GoogleRedirect = ()  => {
    const history = useHistory()
    const GoogleLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider).then(async function(result) {
         const user = await result.user
          if(user.emailVerified){
            console.log("If executed")
            history.push('/profile')  
          }
          else{
            console.log("else executed")
            history.push('/profile')
          }
        
        }).catch(function(error) {
         console.error("error")
          // ...
        });
        
      
      }
    return (
        <>
        <Button onClick={GoogleLogin}>Google Login</Button>
        </>
    )}
      

export default GoogleRedirect





  
