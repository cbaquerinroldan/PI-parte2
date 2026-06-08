import { auth, db } from "../firebase/config";
import { Text, View, Pressable, TextInput } from "react-native"
import { useState } from "react";
import { StyleSheet } from "react-native";

function CrearPost(props) {

    const [descripcion, setDescripcion] = useState("")

    function crearPost() {
        db.collection('posts').add({
            Email: auth.currentUser.email,
            Descripcion: descripcion,
            createdAt: Date.now(),
        })
            .then(() => {
               
            })
            .catch(e => console.log(e))
    }
    return (
        <View>
            <TextInput
                style={styles.input}
                keyboardType="default"
                onChangeText={(text) => setDescripcion(text)}
                value={descripcion}

            />
            <Pressable onPress={crearPost}>
                <Text>Publicar posteo</Text>
            </Pressable>
        </View>
    );
}


const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        padding: 10,
        margin: 10
    }
});

export default CrearPost;