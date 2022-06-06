import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Recipe from "./screens/Recipe";
import RecipeBook from "./screens/RecipeBook";
import AddRecipe from "./screens/AddRecipe";
import EditRecipe from "./screens/EditRecipe";
import { SafeAreaView, StatusBar } from "react-native";
import { Page, Nav } from "./components";
import { COLORS } from "./helpers/constants";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    marker: require("./assets/fonts/PermanentMarker-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <SafeAreaView
        style={{
          flex: 1,
          position: "relative",
          backgroundColor: COLORS.dark,
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar barStyle="light-content" />
        <Stack.Navigator
          initialRouteName="home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="recipe" component={Recipe} />
          <Stack.Screen name="recipeBook" component={RecipeBook} />
          <Stack.Screen name="addRecipe" component={AddRecipe} />
          <Stack.Screen name="editRecipe" component={EditRecipe} />
        </Stack.Navigator>
        <Nav />
      </SafeAreaView>
    </NavigationContainer>
  );
}
