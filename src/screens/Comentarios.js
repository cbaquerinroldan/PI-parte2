import { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet} from "react-native";
import { auth, db } from "../firebase/config";
import firebase from "firebase/app";


function Comentarios(props) {
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [error, setError] = useState("");
  const idPosteo = props.route.params.id;

  useEffect(() => {
    db.collection("posts")
      .doc(idPosteo)
      .onSnapshot(doc => {
        setComentarios(doc.data().comentarios);
      });
  }, []);

  function agregarComentario() {
     if (comentario.length === 0) {
        setError("El comentario no puede estar vacío");
        return;
    }
    db.collection("posts")
      .doc(idPosteo)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
          email: auth.currentUser.email,
          texto: comentario,
          createdAt: Date.now(),
        }),
      })
      .then(() => {
        setComentario("");
        props.navigation.navigate("NavegacionStack", { screen: "Home", });
      })
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.container}>
       <View style={styles.contenedorTitulo}>
      <Text style={styles.title}>Comentarios</Text>


      <TextInput style={styles.input}
        value={comentario}
        onChangeText={text => setComentario(text)}
        placeholder="Escribí un comentario"
      />
       {error === "" ? null : <Text style={styles.error}>{error}</Text>}


      <Pressable style={styles.boton} onPress={agregarComentario}>
        <Text style={styles.buttonText}>Comentar</Text>
      </Pressable>
       </View>
         <Text style={styles.subtitulo}>Comentarios del posteo</Text>

      <FlatList
        data={comentarios}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
         <View style={styles.comentario}>
            <Text style={styles.email} >{item.email}</Text>
            <Text style={styles.descr}>{item.texto}</Text>
          </View>
        )}
      />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF7F1",
    padding: 20
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F2B8A0",
    marginBottom: 20
  },
 error: {
        color: "#C0392B",
        marginBottom: 12,
        fontWeight: "600"
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

  boton: {
    backgroundColor: "#ff9e80ff",
    padding: 16,
    borderRadius: 12
  },

  buttonText: {
    color: "#FFFFFF", 
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16
  },

  subtitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff9e80ff",
    marginBottom: 12,
    marginTop: 12
  },

  comentario: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F2B8A0",
    marginBottom: 10
  },

  email: {
    color: "#7A3E2B",
    fontWeight: "bold",
    fontSize: 13,
    marginBottom: 5
  },
  descr:{
    color: "#7A3E2B",
    fontSize: 13,
    marginBottom: 5
  },

  textoComentario: {
    color: "#4E342E",
    fontSize: 15
  }
});
export default Comentarios;