import {
  centre,
  ToDoManagerStyles,
  AdminAddPrisonerStyle,
} from "../Styles/AdminStyling";
import axios from "axios";
import Constants from "expo-constants";
import { View, Text, Pressable, Alert, BackHandler } from "react-native";

export const textInputForMenu = (content) => {
  return (
    <View style={AdminAddPrisonerStyle.textDiv}>
      <Text style={AdminAddPrisonerStyle.text}>{content}</Text>
    </View>
  );
};

const databaseRoot = (router = "", route = "") => {
  const baseUrl = Constants?.expoGoConfig?.debuggerHost.split(":").shift();
  return `http://${baseUrl}:9000/${router}/${route}`;
};

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

export const searchDebounce = async (tableName, search) => {
  console.log(tableName);
  if (search === "") return [];
  let root = databaseRoot("admin", "debounce");
  root = root + "?tableName=" + tableName + "&search=" + search;

  const searchResults = await fetch(root, {
    method: "GET",
    headers: {
      "CONTENT-TYPE": "application/json",
    },
  })
    .then((result) => {
      return result;
    })
    .catch((error) => {
      return error;
    });
  return searchResults;
};

export const submitAddAdmin = async (data) => {
  if (!data || typeof data !== "object") {
    alert("Invalid data.");
    return;
  }

  const requiredFields = ["FirstName", "LastName", "Password", "Prison"];

  for (const field of requiredFields) {
    if (!data[field]) {
      alert(`Invalid data. The field '${field}' is required and cannot be empty.`);
      return;
    }
  }

  const baseEmail = data["FirstName"] + "_" + data["LastName"] + "@jail.admin.pk";
  let admin_email = baseEmail;

  const requestData = {
    admin_email,
    prision_id: data["Prison"],
    admin_password: data["Password"],
  };

  const root = databaseRoot("admin", "addAdmin");

  for (let index = 1; true; index++) {
    try {
      const response = await axios.post(root, requestData);

      alert("Admin added successfully!");
      console.log("Response data:", response.data);
      break;
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === HttpStatusCodes.CONFLICT && data?.data?.detail?.includes("admin_email")) {
          admin_email = `${baseEmail}${index}`;
          requestData.admin_email = admin_email;
          continue;
        } else {
          alert(`Failed to add admin: ${data?.message || "Unknown error"}`);
          break;
        }
      } else {
        alert("An unexpected error occurred. Please try again later.");
        break;
      }
    }
  }
};


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
