import { Text, View, Pressable, TextInput } from "react-native"
import { useState, useEffect} from "react";
import { StyleSheet } from "react-native";
import { auth } from "../firebase/config";

function Login(props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [login, setLogin] = useState(false)
  const [error, setError] = useState("")

  function onSubmit(email, password) {
    if (email === "" || password === "") {
      setError("Todos los campos son obligatorios")
      return;
    }
    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        setLogin(true)
        props.navigation.navigate("Home")
      })
      .catch(error => {
        console.log(error);
        setError(error.message)
      });
  }
useEffect(() => {
    auth.onAuthStateChanged(user => {
        if (user) {
            props.navigation.navigate("Home")
        }
    })
}, [])
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput style={styles.input} keyboardType="email-address" placeholder="email" onChangeText={text => setEmail(text)} value={email} />
      <TextInput style={styles.input} keyboardType="default" placeholder="password" secureTextEntry={true} onChangeText={text => setPassword(text)} value={password} />

      {error === "" ? null : <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={() => { onSubmit(email,password) }}>
        <Text style={styles.buttonText}> Login</Text>
      </Pressable>

      <Pressable onPress={() => props.navigation.navigate("Register")}>
        <Text style={styles.link}>No tengo cuenta. Registrarme</Text>
      </Pressable>
    </View>);
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 20,
  },

  input: {
    height: 50,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#28a745",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 6,
    paddingBottom: 6,
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#28a745",
  },

  buttonText: {
    color: "#fff",
  },

  error: {
    color: "red",
    marginTop: 10,
    marginBottom: 10,
  },
});
export default Login;