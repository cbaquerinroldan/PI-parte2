import { View, Text, Pressable } from "react-native";
import app from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import { auth, db } from "../firebase/config";

function Post(props) {

    function likePosteo() {
        const email= auth.currentUser.email;
          db.collection("posts").doc(props.id).update({ likes:  
        props.data.likes?.includes(email) 
        ? app.firestore.FieldValue.arrayRemove(email)
        : app.firestore.FieldValue.arrayUnion(email)
        
         });
         
        }
    return (
        <View>
            <Text>{props.data.Email}</Text>
            <Text>{props.data.Descripcion}</Text>

            <Pressable onPress={likePosteo}>
                <Text>{props.data.likes ? props.data.likes.length : 0} ❤️</Text>
            </Pressable>

        

            <Pressable onPress={() => props.navigation.navigate("Comentarios")}>
                <Text>Comentar</Text>
            </Pressable>
        </View>
    );
}

export default Post;