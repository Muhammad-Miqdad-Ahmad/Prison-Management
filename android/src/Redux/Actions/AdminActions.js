import { ADD_ADMIN_DATA } from "./types";

export const addAdminData = (data) => ({
    type: ADD_ADMIN_DATA,
    payload: data
});
