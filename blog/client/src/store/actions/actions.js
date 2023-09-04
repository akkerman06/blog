
import axios from "axios";
export const login = (userData) => async (dispatch) => {

  try {
    const res = await axios.post("http://localhost:5000/api/login", userData);
    console.log(res);

    if (res.data) {
      if (res.data.accessToken !== undefined) {
        localStorage.setItem("accessToken", res.data.accessToken);
      }

      dispatch({
        type: "AUTH",
        payload: {
          user: res.data.user,
          token: res.data.accessToken,
          userId: res.data.user.id
        },
      });

      dispatch({ type: "SUCCESS", payload: "Успешная авторизация!" });
    } else {
      dispatch({ type: "ERROR", payload: "Неправильное имя пользователя или пароль!" });
    }
  } catch (err) {
    
  }
};
