import {
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { COLORS, SIZES } from "../helpers/constants";
import React, { useState } from "react";

const AuthForm = ({ isLogin, press }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (isLogin) {
      press(username, password);
    } else {
      press(username, name, email, password);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, alignItems: "center", width: "100%" }}
    >
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
              onChangeText={(t) => setUsername(t)}
            />
          </View>
          {isLogin === false && (
            <>
              <View style={styles.formControl}>
                <Text style={styles.formLabel}>Name</Text>
                <TextInput
                  style={styles.formInput}
                  value={name}
                  onChangeText={(t) => setName(t)}
                />
              </View>
              <View style={styles.formControl}>
                <Text style={styles.formLabel}>Email</Text>
                <TextInput
                  style={styles.formInput}
                  value={email}
                  keyboardType="email-address"
                  onChangeText={(t) => setEmail(t)}
                />
              </View>
            </>
          )}
          <View style={styles.formControl}>
            <Text style={styles.formLabel}>Password</Text>
            <TextInput
              style={styles.formInput}
              value={password}
              onChangeText={(t) => setPassword(t)}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={() => handleSubmit()}>
            <Text style={styles.formLabel}>
              {isLogin ? "Log In" : "Sign Up"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuthForm;

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
