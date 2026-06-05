import {Text, View, Pressable, TextInput} from "react-native"
import { useState} from "react";
import { StyleSheet } from "react-native";
import { auth, db } from "../firebase/config";


function Register (props){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("");
    const [register, setRegister] = useState(false)
    const [error, setError] = useState("")

  function onSubmit(email, password) {
    if (email === "" || password === "" || username === "") {
      setError("Todos los campos son obligatorios");
      return;
    }
   auth.createUserWithEmailAndPassword(email, password)
    .then(response => {
      db.collection("users").add({
        owner: auth.currentUser.email,
        username : username,
        createdAt: Date.now(),
      })
      .then()
      .catch(error => console.log(error))
      setRegister(true)
      props.navigation.navigate("Login")
    })
    .catch(error => {
      console.log(error);
      setError("error")
    });
}
    return(
    <View style={styles.container}> 
        <Text>Register</Text>
        <TextInput style={styles.input} keyboardType="email-address" placeholder="email" onChangeText={text => setEmail(text)} value={email}/> 
        <TextInput style={styles.input} keyboardType="default" placeholder="password" secureTextEntry= {true} onChangeText={text => setPassword(text)} value={password}/>
        <TextInput style={styles.input} keyboardType="default" placeholder="username" onChangeText={text => setUsername(text)} value={username}/>
        
        {error === "" ? null : <Text style={styles.error}>{error}</Text>}

        <Pressable style={styles.button} onPress={()=> {onSubmit(email,password)
        }}> 
            <Text style={styles.buttonText}> Register</Text>
        </Pressable>

        <Pressable onPress={() => props.navigation.navigate("Login")}>
                <Text style={styles.link}>Ya tengo cuenta. Iniciar Sesión</Text>
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
    marginTop: 10,
    marginBottom: 10,
  },
   error: {
    color: "red",
    marginTop: 10,
    marginBottom: 10,
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