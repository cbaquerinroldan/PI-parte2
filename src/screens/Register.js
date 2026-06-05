import {Text, View, Pressable, TextInput} from "react-native"
import { useState} from "react";
import { StyleSheet } from "react-native";
import { auth } from "../firebase/config";
import Login from "./Login";

function Register ({navigation}){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [register, setRegister] = useState(false)

  function onSubmit() {
  auth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      setRegister(true)
    })
    .catch(error => {
      console.log(error);
    });
}
    return(
    <View style={styles.container}> 
        <Text>Register</Text>
        <TextInput style={styles.input} keyboardType="email-address" placeholder="email" onChangeText={text => setEmail(text)} value={email}/> 
        <TextInput style={styles.input} keyboardType="default" placeholder="password" secureTextEntry= {true} onChangeText={text => setPassword(text)} value={password}/>
        <Pressable styles={styles.button} onPress={()=> {onSubmit();
          navigation.navigate("Login")
        }}> 
            <Text styles={styles.buttonText}> Register</Text>
        </Pressable>
      
    </View>);
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginTop: 20,
  },

  input: {
    height: 50,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginVertical: 10,
  },

  button: {
    backgroundColor: "#28a745",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#28a745",
  },

  buttonText: {
    color: "#fff",
  },
});
export default Register;