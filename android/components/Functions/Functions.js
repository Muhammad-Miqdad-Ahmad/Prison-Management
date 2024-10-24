import { centre, ToDoManagerStyles } from "../Styles/AdminStyling";
import { View, Text, Pressable, Alert, BackHandler } from "react-native";

export const deletetask = (tasks, index, setTasks) => {
  setTasks(tasks.filter((task, taskIndex) => taskIndex !== index));
};

export function printTasks(tasks, setTasks) {
  if (tasks) {
    return tasks.map((element, index) => {
      return (
        <View style={ToDoManagerStyles.container} key={element + index}>
          <Text style={ToDoManagerStyles.container2}>{element}</Text>
          <Pressable
            style={[ToDoManagerStyles.deleteButton, centre.centre]}
            onPress={() => {
              deletetask(tasks, index, setTasks);
            }}
          >
            <Text style={ToDoManagerStyles.buttonText}>Delete</Text>
          </Pressable>
        </View>
      );
    });
  }
  return null;
}

export const onBackPress = () => {
  Alert.alert(
    "Exit App",
    "Do you want to exit?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ],
    { cancelable: false }
  );

  return true;
};

export const postData = async (data, navigation, setIsLoading) => {
  const body = {};
  setIsLoading(true);

  body["email"] = data.email;
  body["password"] = data.password;

  const root = `http://192.168.168.167:9000/admin/login`;

  const response = await fetch(root, {
    method: "POST",
    headers: {
      "CONTENT-TYPE": "application/json",
    },
    body: JSON.stringify(body),
  })
    .catch((error) => console.log(error))
    .finally(() => setIsLoading(false));

  if (response.status === 200) {
    navigation.navigate("Home");
  } else {
    alert(await response.text());
  }
};
