import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from "react-native";
import { Screen, Title, Icon } from "../components";
import { COLORS, SIZES, foodPlaceholder, FONTS } from "../helpers/constants";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleLike, addComment, deleteComment } from "../helpers/controllers";
import { updateLikes } from "../redux/userSlice";

const Ingredient = ({ ingredient }) => {
  return (
    <View style={styles.ingredientRow}>
      <View style={styles.listMarker}></View>
      <Text style={styles.text}>
        {ingredient.text} - {ingredient.amount}
      </Text>
    </View>
  );
};

const Direction = ({ direction, index }) => {
  return (
    <View style={styles.directionsRow}>
      <Text style={styles.text}>
        <Text style={{ color: COLORS.primary }}>{index + 1}.</Text> {direction}
      </Text>
    </View>
  );
};

const Comment = ({ comment, username, press, index }) => {
  return (
    <View style={styles.commentRow}>
      <View style={styles.commentText}>
        <Text style={styles.commenter}>{comment.commenter}</Text>
        <Text style={styles.text}>{comment.comment}</Text>
      </View>
      {comment.commenter === username && (
        <Pressable style={styles.commentBtn} onPress={() => press(index)}>
          <Icon name="close" color={COLORS.dark} size={SIZES.large + 5} />
        </Pressable>
      )}
    </View>
  );
};

const CommentBox = ({ submit }) => {
  const [comment, setComment] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current;
    input.focus();
  }, []);

  return (
    <View style={[styles.commentBox, { paddingBottom: 225 }]}>
      <TextInput
        ref={inputRef}
        value={comment}
        onChangeText={(text) => setComment(text)}
        multiline={true}
        placeholder="write a comment"
        style={styles.commentInput}
      />
      <Pressable style={styles.commentSubmit} onPress={() => submit(comment)}>
        <Text style={styles.btnText}>Submit Comment</Text>
      </Pressable>
    </View>
  );
};

const Recipe = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  let recipe = route.params;
  const user = useSelector((state) => state.user);
  const [comments, setComments] = useState(recipe?.comments || []);
  const [isAuthor, setIsAuthor] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const handleLikePress = async () => {
    try {
      const newLikes = await toggleLike(recipe._id, user.token);
      dispatch(updateLikes(newLikes));
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenCommentBox = () => {
    setShowCommentBox(true);
  };

  const handleAddComment = async (comment) => {
    const updatedRecipe = await addComment(recipe._id, comment, user.token);
    setComments(updatedRecipe.comments);
    setShowCommentBox(false);
  };

  const handleDeleteComment = async (index) => {
    const updatedRecipe = await deleteComment(recipe._id, index, user.token);
    setComments(updatedRecipe.comments);
    setShowCommentBox(false);
  };

  useEffect(() => {
    if (user.username === recipe.createdBy) {
      setIsAuthor(true);
    }
  }, []);

  useEffect(() => {
    if (showCommentBox) {
      const scroller = scrollRef.current;
      scroller.scrollToEnd({ animated: true });
    }
  }, [showCommentBox]);

  return (
    <Screen>
      <Title>{recipe.name}</Title>
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        contentContainerStyle={{
          width: "100%",
        }}
      >
        <View style={styles.row}>
          {isAuthor ? (
            <>
              <Pressable
                onPress={() => navigation.navigate("editRecipe", recipe)}
              >
                <Text style={{ fontSize: SIZES.text, color: COLORS.primary }}>
                  Edit recipe
                </Text>
              </Pressable>
            </>
          ) : (
            <>
              <Pressable
                onPress={() =>
                  navigation.navigate("recipeBook", recipe.createdBy)
                }
              >
                <View style={styles.moreRecipes}>
                  <Text style={{ fontSize: SIZES.text }}>
                    More recipes by{" "}
                    <Text style={{ color: COLORS.primary }}>
                      {recipe.createdBy}
                    </Text>
                  </Text>
                </View>
              </Pressable>
              <Pressable onPress={() => handleLikePress()}>
                <Icon
                  name={
                    user.likes.includes(recipe._id) ? "heart" : "heart-outline"
                  }
                  color="red"
                  size={SIZES.large + 5}
                />
              </Pressable>
            </>
          )}
        </View>
        <Image
          style={styles.img}
          source={
            recipe.image.url === "/food-placeholder.png"
              ? foodPlaceholder
              : { uri: recipe.image.url }
          }
          resizeMode="cover"
        />
        <View style={styles.row}>
          <Text>Time: {recipe.time}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Ingredients</Text>
          {recipe.ingredients.map((ingredient) => (
            <Ingredient key={ingredient._id} ingredient={ingredient} />
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.header}>Directions</Text>
          {recipe.directions.map((direction, i) => (
            <Direction
              key={`${direction.slice(0, 4)}${i}`}
              direction={direction}
              index={i}
            />
          ))}
        </View>
        <View stlye={styles.section}>
          <Text style={[styles.header, { alignSelf: "flex-start" }]}>
            Comments
          </Text>
          {comments.map((comment, i) => (
            <Comment
              comment={comment}
              username={user.username}
              press={handleDeleteComment}
              index={i}
              key={comment._id}
            />
          ))}
          {showCommentBox ? (
            <View>
              <CommentBox submit={handleAddComment} />
            </View>
          ) : (
            <Pressable onPress={() => handleOpenCommentBox()}>
              <Icon
                name="add-circle"
                color={COLORS.primary}
                size={SIZES.large * 2}
              />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  moreRecipes: {
    fontSize: SIZES.text,
    width: "100%",
  },
  img: {
    width: "100%",
    height: 200,
  },
  header: {
    fontSize: SIZES.large + 5,
    color: COLORS.dark,
    textDecorationLine: "underline",
    textDecorationColor: COLORS.primary,
    margin: 10,
  },
  section: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginVertical: 5,
  },
  listMarker: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: COLORS.primary,
    marginRight: 10,
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.pen,
    letterSpacing: 1,
  },
  directionsRow: {
    width: "100%",
    marginVertical: 5,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginVertical: 7,
    borderBottomColor: COLORS.primary,
    borderBottomWidth: 1,
    borderStyle: "solid",
    position: "relative",
  },
  commentText: {
    width: "90%",
    marginBottom: 3,
  },
  commenter: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  commentBtn: {
    position: "absolute",
    right: 3,
  },
  commentBox: {
    width: "100%",
    alignItems: "center",
  },
  commentInput: {
    textAlignVertical: "top",
    backgroundColor: COLORS.white,
    width: "90%",
    fontSize: SIZES.text,
    height: 100,
    padding: 8,
    borderRadius: 8,
  },
  commentSubmit: {
    width: "50%",
    backgroundColor: COLORS.primary,
    marginVertical: 10,
    padding: 8,
    alignItems: "center",
    borderRadius: 8,
  },
  btnText: {
    color: COLORS.white,
  },
});
