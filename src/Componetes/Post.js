import { View, Text } from "react-native";

function Post(props) {
    return (
        <View>
            <Text>{props.data.Email}</Text>
            <Text>{props.data.Descripcion}</Text>
        </View>
    );
}

export default Post;