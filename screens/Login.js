import { ActivityIndicator, Text, Pressable, StyleSheet } from "react-native";
import { Screen, Title, Message, AuthForm } from "../components";
import { COLORS, SIZES, FONTS } from "../helpers/constants";
import React, { useState } from "react";
import { logIn } from "../helpers/controllers";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ error: false, msg: "" });

  const handleLoginPress = async (username, password) => {
    setMessage({ error: false, msg: "" });
    if (!username || !username.length) {
      setMessage({ error: true, msg: "Username is required" });
    } else if (!password || !password.length) {
      setMessage({ error: true, msg: "Password is required" });
    }
    setLoading(true);
    const { token, user, error } = await logIn({ username, password });
    if (error) {
      console.log(error);
      setMessage({ error: true, msg: error });
      setLoading(false);
      return;
    }
    dispatch(setUser({ token, ...user }));
  };

  return (
    <Screen>
      <Title>Log In</Title>
      {message.msg.length > 0 && (
        <Message error={message.error}>{message.msg}</Message>
      )}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} />
      ) : (
        <>
          <AuthForm isLogin={true} press={handleLoginPress} />
          <Pressable onPress={() => navigation.navigate("signup")}>
            <Text style={{ fontSize: SIZES.text }}>
              Need an account?{" "}
              <Text style={{ color: COLORS.primary }}>Sign Up</Text>
            </Text>
          </Pressable>
        </>
      )}
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({});
