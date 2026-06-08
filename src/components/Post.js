import { View, Text, Pressable} from "react-native";
import Comentarios from "../screens/Comentarios";

function Post(props) {
    return (
        <View>
            <Text>{props.data.Email}</Text>
            <Text>{props.data.Descripcion}</Text>
            <Pressable onPress={()=> props.navigation.navigate("Comentarios")}> 
                <Text>Comentar</Text> 
            </Pressable>
        </View>
    );
}

export default Post;