import { View, Text, Pressable } from "react-native";
import app from "firebase/app";
import { auth, db } from "../firebase/config";

function Post(props) {

    function likePosteo() {
        if (props.data.likes && props.data.likes.includes(auth.currentUser.email)) {
            db.collection("posts").doc(props.id).update({
                likes: app.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
        } else {
            db.collection("posts").doc(props.id).update({
                likes: app.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
        }
    }

    return (
        <View>
            <Text>{props.data.Email}</Text>
            <Text>{props.data.Descripcion}</Text>

            <Pressable onPress={likePosteo}>
                <Text>Me gusta</Text>
            </Pressable>

            <Text>{props.data.likes ? props.data.likes.length : 0} likes ❤️</Text>

            <Pressable onPress={() => props.navigation.navigate("Comentarios")}>
                <Text>Comentar</Text>
            </Pressable>
        </View>
    );
}

export default Post;