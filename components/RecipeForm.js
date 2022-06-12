import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";
import Icon from "./Icon";
import { foodPlaceholder, COLORS, SIZES, FONTS } from "../helpers/constants";
import React, { useState, useRef } from "react";
import * as ImagePicker from "expo-image-picker";

const FormButton = ({ press, children }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => press()}>
      <Text style={{ color: COLORS.white }}>{children}</Text>
    </TouchableOpacity>
  );
};

const IngredientInput = ({ ingredient, index, press, change }) => {
  const [text, setText] = useState(ingredient.text);
  const [amount, setAmount] = useState(ingredient.amount);
  const amountRef = useRef(null);

  const handleEndEditingText = () => {
    amountRef.current.focus();
  };

  const handleEndEditingAmount = () => {
    change(index, text, amount);
  };

  return (
    <View style={styles.ingredientRow}>
      <TextInput
        style={[styles.input, styles.ingredientInput]}
        onChangeText={(t) => setText(t)}
        onEndEditing={() => handleEndEditingText()}
        value={text}
        placeholder="ingredient"
      />
      <TextInput
        ref={amountRef}
        style={[styles.input, styles.amountInput]}
        onChangeText={(t) => setAmount(t)}
        onEndEditing={() => handleEndEditingAmount()}
        value={amount}
        placeholder="amount"
      />
      <Pressable style={styles.deleteIngredient} onPress={() => press(index)}>
        <Icon name="close" color={COLORS.dark} size={SIZES.large + 5} />
      </Pressable>
    </View>
  );
};

const RecipeForm = ({ recipe }) => {
  const [name, setName] = useState(recipe?.name || "");
  const [time, setTime] = useState(recipe?.time || "");
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients || [
      {
        text: "",
        amount: "",
      },
    ]
  );
  const [directions, setDirections] = useState(recipe?.directions || []);
  const [image, setImage] = useState(
    recipe?.image?.url || "/food-placeholder.png"
  );
  const [share, setShare] = useState(recipe?.share || true);

  const handleChooseImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        mediaTypes: "Images",
        quality: 0.7,
      });
      if (!result.cancelled) {
        setImage(`data:image/jpeg;base64,${result.base64}`);
      }
    } catch (error) {
      console.log("image select error: ", error);
    }
  };

  const handleAddIngredient = () => {
    setIngredients((prev) => [...prev, { text: "", amount: "" }]);
  };

  const handleDeleteIngredient = (index) => {
    setIngredients((prev) => prev.filter((ing, i) => i !== index));
  };

  const handleIngredientChange = (index, text, amount) => {
    const newIngredient = { text, amount };
    let newIngredientsList = [...ingredients];
    newIngredientsList[index] = newIngredient;
    setIngredients(newIngredientsList);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1 }}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={styles.imgContainer}>
          <Image
            style={[styles.img, { width: 500, height: 250 }]}
            resizeMode="contain"
            source={
              image === "/food-placeholder.png"
                ? foodPlaceholder
                : { uri: image }
            }
          />
          <View style={styles.row}>
            <FormButton press={handleChooseImage}>Choose Image</FormButton>
            <Text>not required</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Recipe Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Make Time</Text>
          <TextInput
            style={styles.input}
            value={time}
            onChangeText={(text) => setTime(text)}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>Ingredients</Text>
          {ingredients.length > 0 &&
            ingredients.map((ingredient, i) => (
              <IngredientInput
                key={Math.random() * Math.random() * 1000}
                ingredient={ingredient}
                index={i}
                press={handleDeleteIngredient}
                change={handleIngredientChange}
              />
            ))}
          <FormButton press={handleAddIngredient}>Add Ingredient</FormButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RecipeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxWidth: "100%",
  },
  scrollContainer: {
    alignItems: "center",
    paddingHorizontal: 16,
  },
  imgContainer: {
    width: "100%",
    alignItems: "center",
  },
  img: {
    maxWidth: "100%",
    borderRadius: 8,
  },
  btn: {
    backgroundColor: COLORS.primary,
    padding: 10,
    alignSelf: "flex-start",
    borderRadius: 8,
    marginRight: 16,
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  section: {
    width: "100%",
    marginVertical: 10,
    flex: 1,
  },
  label: {
    fontSize: SIZES.text,
    color: COLORS.dark,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    fontSize: SIZES.text,
    fontFamily: FONTS.pen,
    letterSpacing: 1,
    padding: 8,
    borderRadius: 8,
    width: "100%",
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  ingredientInput: {
    width: "50%",
  },
  amountInput: {
    width: "40%",
  },
});
