import { auth, db } from "../firebase/config";
import { Text, View, Pressable, TextInput, StyleSheet } from "react-native"
import { useState } from "react";


function CrearPost(props) {

    const [descripcion, setDescripcion] = useState("")
    const [error, setError] = useState("");

    function crearPost() {
        if (descripcion.length === 0) {
        setError("El posteo no puede estar vacío");
        return;
    }
        db.collection('posts').add({
            Email: auth.currentUser.email,
            Descripcion: descripcion,
            createdAt: Date.now(),
            comentarios: [],
            likes: [],
        })
            .then(() => {
                setDescripcion("")
                props.navigation.navigate("NavegacionStack", { screen: "Home", });
            })
            .catch(e => console.log(e))
    }
    return (
        <View style={styles.container}>
            <View style={styles.contenedorTitulo}>
                 <Text style={styles.title}>Crear posteo</Text>
            <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => setDescripcion(text)}
                placeholder="Ecribe tu Posteo"
                value={descripcion}  />

            {error === "" ? null :<Text style={styles.error}>{error}</Text>}
            <Pressable style={styles.button} onPress={crearPost}>
                <Text style={styles.buttonText}>Publicar</Text>

            </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F1",
    padding: 20
  },

  contenedorTitulo: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2B8A0"
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff9e80ff",
    marginBottom: 20
  },

  input: {
    backgroundColor: "#FFF7F1",
    borderWidth: 1,
    borderColor: "#F2B8A0",
    borderRadius: 14,
    padding: 14,
    color: "#4E342E",
    marginBottom: 15
  },

    error: {
        color: "#C0392B",
        marginBottom: 12,
        fontWeight: "600"
    },
  button: {
    backgroundColor: "#ff9e80ff",
    padding: 14,
    borderRadius: 12
  },

  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default CrearPost;