import { Text, View, Pressable, TextInput } from "react-native"
import { useState, useEffect } from "react";
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
        setEmail("")
        setPassword("")
        setError("")
        props.navigation.navigate("Home")
      })
      .catch(error => {
        console.log(error);

        if (error.message.toLowerCase().includes("invalid")) {
          setError("Credenciales incorrectas");
        } else {
          setError(error.message);
        }
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
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} keyboardType="email-address" placeholder="email" onChangeText={text => setEmail(text)} value={email} />
      <TextInput style={styles.input} keyboardType="default" placeholder="password" secureTextEntry={true} onChangeText={text => setPassword(text)} value={password} />

      {error === "" ? null : <Text style={styles.error}>{error}</Text>}

      <Pressable style={styles.button} onPress={() => { onSubmit(email, password) }}>
        <Text style={styles.buttonText}> Login</Text>
      </Pressable>

      <Pressable onPress={() => { setEmail("") 
      setPassword("")
      setError("")
      props.navigation.navigate("Register")
      }}>
        <Text style={styles.link}>No tengo cuenta. Registrarme</Text>
      </Pressable>
    </View>);
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F1",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ff9e80ff",
    marginBottom: 25,
  },

  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#F2B8A0",
    borderRadius: 14,
    marginBottom: 14,
    color: "#4E342E",
  },

  button: {
    backgroundColor: "#ff9e80ff",
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ff9e80ff",
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    color: "#7A3E2B",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "bold",
  },

  error: {
    color: "#C0392B",
    marginBottom: 12,
    fontWeight: "600",
  },
});