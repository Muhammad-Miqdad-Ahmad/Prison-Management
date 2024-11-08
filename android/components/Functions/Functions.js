import { centre, ToDoManagerStyles, AdminAddPrisonerStyle } from "../Styles/AdminStyling";
import { View, Text, Pressable, Alert, BackHandler } from "react-native";

export const textInputForMenu = (content) => {
  return (
    <View style={AdminAddPrisonerStyle.textDiv}>
      <Text style={AdminAddPrisonerStyle.text}>{content}</Text>
    </View>
  );
};

export const textInputForHeader = (content) => {
  
}

const databaseRoot = (router, route) =>
  `http://192.168.241.14:9000/${router}/${route}`;

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

export const postData = async (data, router, route) => {
  const body = {};

  body["email"] = data.email;
  body["password"] = data.password;

  const root = databaseRoot(router, route);

  const result = await fetch(root, {
    method: "POST",
    headers: {
      "CONTENT-TYPE": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
  return result;
};

// HttpStatusCodes.js
export const HttpStatusCodes = Object.freeze({
  // 200 - Success
  OK: 200,

  // 201 - Created
  CREATED: 201,

  // 204 - No Content
  NO_CONTENT: 204,

  // 400 - Bad Request
  BAD_REQUEST: 400,

  // 401 - Unauthorized
  UNAUTHORIZED: 401,
  // Used when credentials are incorrect, e.g., incorrect password.

  // 403 - Forbidden
  FORBIDDEN: 403,
  // User doesn't have permission to access this resource, even if authenticated.

  // 404 - Not Found
  NOT_FOUND: 404,
  // Resource not found, e.g., user not found in the database.

  // 409 - Conflict
  CONFLICT: 409,
  // Conflict with the current state of the resource, e.g., email already exists during registration.

  // 500 - Internal Server Error
  INTERNAL_SERVER_ERROR: 500,
  // Server error for unexpected issues.

  // 503 - Service Unavailable
  SERVICE_UNAVAILABLE: 503,
  // Server temporarily unable to handle the request.
});
