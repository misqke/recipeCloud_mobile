import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Recipe from "./screens/Recipe";
import RecipeBook from "./screens/RecipeBook";
import AddRecipe from "./screens/AddRecipe";
import EditRecipe from "./screens/EditRecipe";
import { SafeAreaView, StatusBar, ActivityIndicator } from "react-native";
import { Nav } from "./components";
import { COLORS } from "./helpers/constants";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/userSlice";
import { useEffect, useState } from "react";
import { checkUser, logIn } from "./helpers/controllers";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkForUser = async () => {
      const results = await checkUser();
      if (results !== null) {
        const { token, user } = await logIn({
          username: results.username,
          password: results.password,
        });
        dispatch(setUser({ token, ...user }));
      }
      setLoading(false);
    };
    checkForUser();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        position: "relative",
        backgroundColor: COLORS.dark,
        justifyContent: "center",
      }}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <StatusBar barStyle="light-content" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user.username !== null ? (
              <>
                <Stack.Screen name="home" component={Home} />
                <Stack.Screen name="recipe" component={Recipe} />
                <Stack.Screen name="recipeBook" component={RecipeBook} />
                <Stack.Screen name="addRecipe" component={AddRecipe} />
                <Stack.Screen name="editRecipe" component={EditRecipe} />
              </>
            ) : (
              <Stack.Screen name="login" component={Login} />
            )}
          </Stack.Navigator>
          {user.username !== null && <Nav />}
        </>
      )}
    </SafeAreaView>
  );
};

export default function App() {
  const [loaded] = useFonts({
    marker: require("./assets/fonts/PermanentMarker-Regular.ttf"),
    pen: require("./assets/fonts/ShadowsIntoLightTwo-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <Provider store={store}>
        <StackNav />
      </Provider>
    </NavigationContainer>
  );
}
