import React from "react";
import { Modal, View, Text, TextInput, SafeAreaView, StatusBar, Pressable, } from "react-native";
import { useState } from "react";


export default function LogInModal({closeModal, logIn, setFetchedRecipes, setUserId}){
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [forgotPassword, setForgotPassword] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")

    const [signUp, setSignUp] = useState(false)

    function sendFormData(){
        if(forgotPassword){
            if(!validateEmail(email)){
                setErrorMsg("Invalid Email")
                setError(true)
                return 
            }
        }else if(signUp){
            if(!validateEmail(email)){
                setErrorMsg("Invalid Email")
                setError(true)
                return 
            }else if(username === ""){
                setErrorMsg("Invalid Username")
                setError(true)
                return 
            }else if(password === ""){
                setErrorMsg("Invalid Password")
                setError(true)
                return 
            }

            sendSignUpAttempt()
        }else{
            if(username === ""){
                setErrorMsg("Invalid Username")
                setError(true)
                return 
            }else if(password === ""){
                setErrorMsg("Invalid Password")
                setError(true)
                return 
            }
            
            sendLogginAttemp()
        }



    }

    async function sendSignUpAttempt(){
        const formBody = createFormBody({username: username, password: password, email: email})
        const res = await fetch("http://10.0.2.2:3000/users/signUp", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).catch(err=>console.log(err))
        closeModal()
    }

    function createFormBody(data){
        let formBody = []
        for(let property in data){
            let encodedKey = encodeURIComponent(property)
            let encodedValue = encodeURIComponent(data[property])
            formBody.push(encodedKey + "=" + encodedValue)
        }

        formBody = formBody.join("&")

        return formBody
    }

    async function sendLogginAttemp(){
        let formBody
        if(forgotPassword){

        }else if(signUp){

        }else{
            formBody = createFormBody({"username": username, "password": password})
        }

        console.log(formBody)

        const res = await fetch("http://10.0.2.2:3000/users/verifyUser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).catch(err=>console.log(err))

        const data = await res.json()

        if(data.responseData.errors){
            console.log(data.responseData.errors[0].message)
            setErrorMsg(data.responseData.errors[0].message)
            setError(true)
            return
        }

        logIn()
        closeModal()
        setUserId(data.responseData.id)
        setFetchedRecipes(data.responseData.saved_recipes)
        

        console.log(data)

    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    function userForgotPassword(){
        setUsername("")
        setPassword("")
        setEmail(""),
        setError(false)
        if(signUp || forgotPassword){
            setSignUp(false)
            setForgotPassword(false)
        }else{
            setForgotPassword(true)
            setSignUp(false);
        }
    }

    function userSignUp(){
        setUsername("")
        setPassword("")
        setError(false)
        setEmail("")
        setSignUp(true)
        
        setForgotPassword(false)
    }

    return(
            <View style={{marginTop: StatusBar.currentHeight || 0, position: 'absolute', zIndex: 100, width: '100%', alignItems: 'center', paddingVertical: 60}}>
                <View style={{width: '90%', backgroundColor: 'white', padding: 20, borderRadius: 10, position: 'relative'}}>
                    <Pressable onPress={closeModal} style={{position: 'absolute', right: 0, marginVertical: 5, marginHorizontal: 20}}><Text style={{fontSize: 20, fontWeight: '700'}}>X</Text></Pressable>
                    {
                        forgotPassword ? "" : <View><Text>Username:</Text>
                        <TextInput style={{borderWidth: 1, paddingHorizontal: 10}} value={username} onChangeText={text=>{
                            setError(false)
                            setUsername(text)
                        }}></TextInput></View>
                    }
                    {
                        forgotPassword ? "" : <View>
                            <Text>Password:</Text>
                    <TextInput style={{borderWidth: 1, paddingHorizontal: 10}}  textContentType="password" secureTextEntry={true} value={password} onChangeText={(text)=>{
                        setError(false)
                        setPassword(text)
                        }}></TextInput>
                        </View>
                    }

                    {
                        signUp || forgotPassword ? <View>
                        <Text>Email:</Text>
                        <TextInput style={{borderWidth: 1, paddingHorizontal: 10}}  value={email} onChangeText={(text)=>{
                            setError(false)
                            setEmail(text)
                            }}></TextInput>
                        
                        </View> : ""
                    }
                    
                    
                    
                    {error ? <Text style={{
                        color: 'red',
                        justifyContent: 'center',
                        width: "100%",
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: 5
                    }}>{errorMsg}</Text> : ""}
                    <Pressable onPress={sendFormData} style={{alignSelf: 'center', paddingHorizontal: 16, paddingVertical: 8, backgroundColor: 'rgb(71, 133, 71)', borderRadius: 7, marginTop: 10}}><Text style={{color: 'white', fontSize: 16}}>Send</Text></Pressable>
                    <View style={{justifyContent: 'center', flexDirection: 'row', gap: 10}}>
                        <Pressable onPress={userForgotPassword}><Text style={{color: 'rgb(71, 133, 71)'}}>{forgotPassword || signUp ? "Sign In" : "Forgot Password"}</Text></Pressable>
                        <Pressable onPress={userSignUp}><Text style={{color: 'rgb(71, 133, 71)'}}>{forgotPassword ? "Sign Up" : signUp ? "" : "Sign Up"}</Text></Pressable>
                    </View> 
                </View>
                

            </View>
        
    )
}