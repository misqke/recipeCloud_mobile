import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Screen, Title, Message } from "../components";
import { COLORS, SIZES, FONTS } from "../helpers/constants";
import React, { useRef, useState } from "react";
import { logIn } from "../helpers/controllers";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleInputChange = (text, name) => {
    if (message.msg.length) setMessage({ error: false, msg: "" });
    if (name === "username") {
      setUsername(text);
    } else if (name === "password") {
      setPassword(text);
    }
  };

  const handleLoginPress = async () => {
    if (!username || !username.length) {
      setMessage({ error: true, msg: "Username is required" });
    } else if (!password || !password.length) {
      setMessage({ error: true, msg: "Password is required" });
    }
    const { token, user, error } = await logIn({ username, password });
    if (error) {
      console.log(error);
      setMessage({ error: true, msg: data.error });
      return;
    }
    dispatch(setUser(user));
  };

  return (
    <Screen>
      <Title>Log In</Title>
      {message.msg.length > 0 && (
        <Message error={message.error}>{message.msg}</Message>
      )}
      <ScrollView
        style={styles.formContainer}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.formLabel}>Username</Text>
            <TextInput
              style={styles.formInput}
              value={username}
              onChangeText={(text) => handleInputChange(text, "username")}
            />
          </View>
          <View style={styles.formControl}>
            <Text style={styles.formLabel}>Password</Text>
            <TextInput
              style={styles.formInput}
              value={password}
              onChangeText={(text) => handleInputChange(text, "password")}
              type="password"
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleLoginPress(username, password)}
          >
            <Text style={styles.formLabel}>Log in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  form: {
    backgroundColor: COLORS.dark,
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 40,
    borderRadius: SIZES.small,
    width: "75%",
    maxWidth: 450,
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
  },
  formControl: {
    marginVertical: 10,
    width: "75%",
  },
  formLabel: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginBottom: 5,
  },
  formInput: {
    backgroundColor: COLORS.secondary,
    width: "100%",
    fontSize: SIZES.text,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },
  btn: {
    marginTop: 20,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.small,
    borderRadius: SIZES.small,
  },
});
