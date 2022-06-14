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
  Animated,
} from "react-native";
import Icon from "./Icon";
import { useNavigation } from "@react-navigation/native";
import { foodPlaceholder, COLORS, SIZES, FONTS } from "../helpers/constants";
import { deleteRecipe } from "../helpers/controllers";
import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import * as ImagePicker from "expo-image-picker";

const FormButton = ({ press, children }) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={() => press()}>
      <Text style={{ color: COLORS.white }}>{children}</Text>
    </TouchableOpacity>
  );
};

const DirectionInput = ({ direction, index, scroll, change, press }) => {
  const [text, setText] = useState(direction);

  const handleFocus = () => {
    scroll(index);
  };

  const handleEndEditingText = () => {
    change(index, text);
  };

  return (
    <View style={styles.ingredientRow}>
      <TextInput
        value={text}
        multiline={true}
        onChangeText={(t) => setText(t)}
        onFocus={() => handleFocus()}
        style={[styles.input, styles.directionInput]}
        onEndEditing={() => handleEndEditingText()}
        placeholder={`direction #${index + 1}`}
      />
      <Pressable style={styles.deleteIngredient} onPress={() => press(index)}>
        <Icon name="close" color={COLORS.dark} size={SIZES.large + 5} />
      </Pressable>
    </View>
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
        placeholder={`ingredient`}
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

const RecipeForm = ({ recipe, submit }) => {
  const navigation = useNavigation();
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [name, setName] = useState(recipe?.name || "");
  const [time, setTime] = useState(recipe?.time || "");
  const scrollRef = useRef();
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients || [
      {
        text: "",
        amount: "",
      },
    ]
  );
  const [directions, setDirections] = useState(recipe?.directions || [""]);
  const [image, setImage] = useState(
    recipe?.image?.url || "/food-placeholder.png"
  );
  const [share, setShare] = useState(
    recipe?.share === undefined ? true : recipe.share
  );
  const [showDelete, setShowDelete] = useState(false);
  const slideAnim = useRef(new Animated.Value(240)).current;

  // animations
  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 240,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // submit and delete
  const handleSubmit = async () => {
    setMessage({ error: false, msg: "" });
    if (!name.length)
      setMessage({ error: true, msg: "What do you call the recipe?" });
    else if (!time.length)
      setMessage({ error: true, msg: "How long does it take to make?" });
    else if (!ingredients.length || ingredients[0].text === "")
      setMessage({ error: true, msg: "What are the ingredients?" });
    else if (!directions.length || directions[0] === "")
      setMessage({ error: true, msg: "How do you make it?" });
    else
      submit({
        name,
        image: { url: image },
        time,
        ingredients,
        directions,
        share,
      });
  };

  const handleDeleteRecipe = async () => {
    const data = await deleteRecipe(recipe._id);
    if (data.error) {
      setMessage({ error: true, msg: data.error.message });
    } else {
      navigation.navigate("recipeBook", recipe.createdBy);
    }
  };

  // scrolling for multiline input focus
  const handleScroll = (i) => {
    const scroller = scrollRef.current;
    scroller.scrollTo({ x: 0, y: 550 + 50 * ingredients.length + 100 * i });
  };

  // image selections
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

  // ingredient functions
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

  // directions functions
  const handleDirectionChange = (index, text) => {
    let newDirections = [...directions];
    newDirections[index] = text;
    setDirections(newDirections);
  };

  const handleDeleteDirection = (index) => {
    setDirections((prev) => prev.filter((dir, i) => i !== index));
  };

  const handleAddDirection = () => {
    setDirections((prev) => [...prev, ""]);
  };

  useEffect(() => {
    setMessage({ error: false, msg: "" });
  }, [name, time, directions, ingredients]);

  useEffect(() => {
    if (showDelete) {
      slideUp();
    } else {
      slideDown();
    }
  }, [showDelete]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={50}
      style={{ flex: 1, alignItems: "center" }}
    >
      {message.msg.length > 0 && (
        <Message error={message.error}>{message.msg}</Message>
      )}
      <ScrollView
        ref={scrollRef}
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
        <View style={styles.section}>
          <Text style={styles.label}>Directions</Text>
          {directions.length > 0 &&
            directions.map((direction, i) => (
              <DirectionInput
                direction={direction}
                index={i}
                key={Math.random() * Math.random() * 1000}
                scroll={handleScroll}
                change={handleDirectionChange}
                press={handleDeleteDirection}
              />
            ))}
          <FormButton press={handleAddDirection}>Add Direction</FormButton>
        </View>
        <View style={styles.row}>
          <Pressable
            style={[
              styles.btn,
              { backgroundColor: share ? COLORS.primary : COLORS.dark },
            ]}
            onPress={() => setShare(true)}
          >
            <Text style={{ color: COLORS.white }}>Public</Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              { backgroundColor: !share ? COLORS.primary : COLORS.dark },
            ]}
            onPress={() => setShare(false)}
          >
            <Text style={{ color: COLORS.white }}>Private</Text>
          </Pressable>
        </View>
        <FormButton press={handleSubmit}>
          {recipe?.name ? "Update Recipe" : "Create Recipe"}
        </FormButton>
        {recipe?.name && (
          <Pressable
            onPress={() => setShowDelete((prev) => !prev)}
            style={[styles.btn, { backgroundColor: COLORS.red }]}
          >
            <Text style={{ color: COLORS.white }}>Delete Recipe</Text>
          </Pressable>
        )}
      </ScrollView>
      <Animated.View
        style={[
          styles.confirmDelete,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text>Are you sure you want to delete?</Text>
        <View style={[styles.row, { justifyContent: "center" }]}>
          <Pressable
            onPress={() => handleDeleteRecipe()}
            style={[
              styles.btn,
              { backgroundColor: COLORS.red, alignSelf: "center" },
            ]}
          >
            <Text style={{ color: COLORS.white }}>Delete</Text>
          </Pressable>
          <Pressable
            onPress={() => setShowDelete((prev) => !prev)}
            style={[
              styles.btn,
              { backgroundColor: COLORS.dark, alignSelf: "center" },
            ]}
          >
            <Text style={{ color: COLORS.white }}>Cancel</Text>
          </Pressable>
        </View>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default RecipeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
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
    marginVertical: 10,
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
    maxWidth: "100%",
  },
  ingredientInput: {
    width: "50%",
  },
  amountInput: {
    width: "40%",
  },
  directionInput: {
    height: 90,
    textAlignVertical: "top",
    width: "90%",
  },
  confirmDelete: {
    justifyContent: "center",
    alignItems: "center",
    height: 220,
    backgroundColor: COLORS.secondary,
    borderTopWidth: 1,
    borderColor: COLORS.dark,
    borderStyle: "solid",
    position: "absolute",
    width: "100%",
    bottom: 0,
    borderRadius: 8,
  },
});
