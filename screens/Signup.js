import { View, Text, Pressable } from "react-native";
import { Screen, Title, AuthForm, Message } from "../components";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import { signUp, logIn } from "../helpers/controllers";
import { SIZES, COLORS } from "../helpers/constants";

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleSignupPress = async (username, name, email, password) => {
    setMessage({ error: false, msg: "" });
    if (!username || !username.length) {
      setMessage({ error: true, msg: "Username is required" });
      return;
    } else if (!name || !name.length) {
      setMessage({ error: true, msg: "Name is required" });
      return;
    } else if (!email || !email.length) {
      setMessage({ error: true, msg: "Email is required" });
      return;
    } else if (!password || !password.length) {
      setMessage({ error: true, msg: "Password is required" });
      return;
    }

    const newUser = await signUp({
      username,
      name,
      email,
      password,
    });
    if (newUser.error) {
      setMessage({ error: true, msg: newUser.error });
      return;
    }

    const { token, user, error } = await logIn(newUser);
    if (error) {
      console.log(error);
      setMessage({ error: true, msg: error });
      return;
    } else {
      dispatch(setUser({ token, ...user }));
    }
  };

  return (
    <Screen>
      <Title>Sign Up</Title>
      {message.msg.length > 0 && (
        <Message error={message.error}>{message.msg}</Message>
      )}
      <AuthForm isLogin={false} press={handleSignupPress} />
      <Pressable onPress={() => navigation.navigate("login")}>
        <Text style={{ fontSize: SIZES.text }}>
          Have an account? <Text style={{ color: COLORS.primary }}>Log In</Text>
        </Text>
      </Pressable>
    </Screen>
  );
};

export default Signup;
