import { View, Text, Pressable, StyleSheet } from "react-native";
import app from "firebase/app";
import "firebase/firestore";
import { auth, db } from "../firebase/config";

function Post(props) {

    function likePosteo() {
        const email = auth.currentUser.email;

        db.collection("posts").doc(props.id).update({
            likes: props.data.likes?.includes(email)
                ? app.firestore.FieldValue.arrayRemove(email)
                : app.firestore.FieldValue.arrayUnion(email)
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.email}>{props.data.Email}</Text>
            <Text style={styles.descripcion}>{props.data.Descripcion}</Text>

            <Pressable style={styles.botonLike} onPress={likePosteo}>
                <Text style={styles.textoBoton}>{props.data.likes ? props.data.likes.length : 0} ❤️</Text>
            </Pressable>

            <Pressable style={styles.botonComentario} onPress={() => props.navigation.navigate("Comentarios", { id: props.id })}>
                <Text style={styles.textoBoton}>
                    Comentarios {props.data.comentarios ? props.data.comentarios.length : 0}
                </Text>
            </Pressable>
        </View>
    );
}const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffffff",
        margin: 10,
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#F2B8A0"
    },
    email: {
        fontWeight: "bold",
        fontSize: 12, 
        color: "#85432fff",
        marginBottom: 8
    },
    descripcion: {
        color: "#402621ff",
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 20
    },
    botonLike: {
        backgroundColor: "#fdece5ff",
        padding: 8,
        borderRadius: 8,
        marginBottom: 8
    },
    botonComentario: {
        backgroundColor: "#fdece5ff",
        padding: 8,
        borderRadius: 8
    },
    textoBoton: {
        color: "#7A3E2B",
        fontWeight: "600"
    }
});

export default Post;