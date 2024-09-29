import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Linking,
} from "react-native";
import { firebase } from "./firebaseconfig";

const AppWidth = Dimensions.get("window").width;
const AppHeight = Dimensions.get("window").height;

const Fetch = () => {
  const [users, setUsers] = useState([]);
  const [microphone, setMicrophone] = useState([]);
  const [headphone, setHeadphone] = useState([]);
  const [watch, setWatch] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const listRef = firebase.firestore().collection("products");
  const microphoneRef = firebase.firestore().collection("microphone");
  const headphoneRef = firebase.firestore().collection("headphone");
  const watchRef = firebase.firestore().collection("watch");

  useEffect(() => {
    const fetchData = async () => {
      listRef.onSnapshot((QuerySnapshot) => {
        const users = [];
        QuerySnapshot.forEach((doc) => {
          const { image, name } = doc.data();
          users.push({
            id: doc.id,
            image,
            name,
          });
        });
        setUsers(users);
      });
    };

    const fetchMicrophoneData = async () => {
      microphoneRef.onSnapshot((QuerySnapshot) => {
        const mics = [];
        QuerySnapshot.forEach((doc) => {
          const { image, name, price, discount, link } = doc.data();
          mics.push({ id: doc.id, image, name, price, discount, link });
        });
        setMicrophone(mics);
      });
    };

    const fetchHeadphoneData = async () => {
      headphoneRef.onSnapshot((QuerySnapshot) => {
        const phones = [];
        QuerySnapshot.forEach((doc) => {
          const { image, name, price, discount, link } = doc.data();
          phones.push({ id: doc.id, image, name, price, discount, link });
        });
        setHeadphone(phones);
      });
    };

    const fetchWatchData = async () => {
      watchRef.onSnapshot((QuerySnapshot) => {
        const watchs = [];
        QuerySnapshot.forEach((doc) => {
          const { image, name, price, discount, link } = doc.data();
          watchs.push({ id: doc.id, image, name, price, discount, link });
        });
        setWatch(watchs);
      });
    };

    fetchData();
    fetchMicrophoneData();
    fetchHeadphoneData();
    fetchWatchData();
  }, []);

  const handleCardPress = (item) => {
    setSelectedItem(item);
  };

  const closeDetails = () => {
    setSelectedItem(null);
  };

  return (
    <View style={styles.mainscreen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <View style={styles.catagoriesscreen}>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.catagoriestitle}>CATEGORIES</Text>
          </View>

          <FlatList
            data={users}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.content}
            contentContainerStyle={{ justifyContent: "space-between" }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable style={styles.itemContainer}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 50, height: 50 }}
                />
                <Text style={styles.itemText}>{item.name}</Text>
              </Pressable>
            )}
          />
        </View>

        {/* Exclusive Offers Section */}
        <View style={styles.offer}>
          <Text style={styles.offerTitle}>
            EXCLUSIVE OFFERS{" "}
            <Text style={styles.limitedTime}>[ LIMITED TIME ]</Text>
          </Text>

          {/* Microphone Section */}
          <View style={styles.offerCards}>
            {microphone.map((item) => (
              <Pressable
                style={styles.card}
                key={item.id}
                onPress={() => handleCardPress(item)}
              >
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>
                    - {100 - item.discount}% OFF
                  </Text>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPriceStrikethrough}>
                  ₨ {item.price}
                </Text>
                <Text style={styles.cardPrice}>
                  ₨ {Math.floor(item.price * (item.discount / 100))}
                </Text>
                <Pressable onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.linkText}>Buy Now</Text>
                </Pressable>
              </Pressable>
            ))}
          </View>

          {/* Headphone Section */}
          <View style={styles.offerCards}>
            {headphone.map((item) => (
              <Pressable
                style={styles.card}
                key={item.id}
                onPress={() => handleCardPress(item)}
              >
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>
                    - {100 - item.discount}% OFF
                  </Text>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPriceStrikethrough}>
                  ₨ {item.price}
                </Text>
                <Text style={styles.cardPrice}>
                  ₨ {Math.floor(item.price * (item.discount / 100))}
                </Text>
                <Pressable onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.linkText}>Buy Now</Text>
                </Pressable>
              </Pressable>
            ))}
          </View>

          {/* Watch Section */}
          <View style={styles.offerCards}>
            {watch.map((item) => (
              <Pressable
                style={styles.card}
                key={item.id}
                onPress={() => handleCardPress(item)}
              >
                <View style={styles.discountTag}>
                  <Text style={styles.discountText}>
                    - {100 - item.discount}% OFF
                  </Text>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={styles.cardImage}
                />
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardPriceStrikethrough}>
                  ₨ {item.price}
                </Text>
                <Text style={styles.cardPrice}>
                  ₨ {Math.floor(item.price * (item.discount / 100))}
                </Text>
                <Pressable onPress={() => Linking.openURL(item.link)}>
                  <Text style={styles.linkText}>Buy Now</Text>
                </Pressable>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Details Screen Overlay */}
      {selectedItem && (
        <View style={styles.overlay}>
          <DetailsScreen
            item={selectedItem}
            onClose={closeDetails}
          />
        </View>
      )}
    </View>
  );
};

const DetailsScreen = ({ item, onClose }) => {
  return (
    <View style={styles_details.container}>
      <Pressable
        onPress={onClose}
        style={styles_details.closeButton}
      >
        <Text style={styles_details.closeButtonText}>Close</Text>
      </Pressable>
      <View style={styles_details.discountTag}>
        <Text style={styles_details.discountText}>
          - {100 - item.discount}% OFF
        </Text>
      </View>
      <Image
        source={{ uri: item.image }}
        style={styles_details.image}
      />
      <Text style={styles_details.name}>{item.name}</Text>
      <Text style={styles_details.cardPriceStrikethrough}>₨ {item.price}</Text>

      <Text style={styles_details.price}>
        Price: ₨ {Math.floor(item.price * (item.discount / 100))}
      </Text>
      <Pressable onPress={() => Linking.openURL(item.link)}>
        <Text style={styles_details.link}>Buy Now</Text>
      </Pressable>
    </View>
  );
};

const styles_details = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: AppWidth,
    height: AppHeight,
    fontFamily: "Poppins",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#31393C",
    borderRadius: 10,
  },
  closeButtonText: {
    fontSize: 14,
    fontFamily: "PoppinsSemi",
    color: "#FFFFFF",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontFamily: "PoppinsSemi",
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "PoppinsBold",
  },
  cardPriceStrikethrough: {
    fontSize: 14,
    color: "gray",
    textDecorationLine: "line-through",
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  discountTag: {
    position: "relative",
    top: 10,
    left: 10,
    backgroundColor: "orange",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    marginVertical: 10,
  },
  discountText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    fontSize: 18,
    fontFamily: "PoppinsSemi",
    color: "blue",
  },
});

const styles = StyleSheet.create({
  mainscreen: {
    flex: 1,
    paddingHorizontal: AppWidth * 0.056,
  },
  catagoriesscreen: {
    width: "100%",
    height: 160,
  },
  catagoriestitle: {
    fontSize: 20,
    color: "Gray",
    fontFamily: "PoppinsBold",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    backgroundColor: "white",
    width: 85,
    height: 100,
    marginTop: 2,
    borderRadius: 10,
    paddingTop: 3,
    elevation: 5, // For shadow effect on Android
    shadowColor: "#000", // For shadow effect on iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    fontFamily: "Poppins",
  },
  // Exclusive Offers Styles
  offer: {
    marginTop: 20,
    padding: 10,
  },
  offerTitle: {
    fontSize: 20,
    color: "Gray",
    fontFamily: "PoppinsBold",
  },
  limitedTime: {
    fontSize: 14,
    color: "orange",
    fontFamily: "PoppinsSemi",
  },
  offerCards: {
    flexDirection: "row",
    flexWrap: "wrap", // Wrap the cards to the next line if needed
    justifyContent: "space-between",
    marginTop: 10,
  },
  card: {
    width: "47%", // Adjust width for spacing
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15, // Added margin for spacing between cards
    elevation: 5, // For shadow effect on Android
    shadowColor: "#000", // For shadow effect on iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  discountTag: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "orange",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  discountText: {
    color: "white",
    fontSize: 12,
    fontfamily: "PoppinsSemi",
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginTop: 24,
  },
  cardName: {
    fontSize: 12,
    marginTop: 10,
    textAlign: "center",
  },
  cardPriceStrikethrough: {
    marginTop: 5,
    fontSize: 10,
    color: "gray",
    textDecorationLine: "line-through",
    marginBottom: 5,
    fontFamily: "Poppins",
  },
  cardPrice: {
    fontSize: 14,
    fontFamily: "PoppinsBold",
    marginTop: 3,
    color: "black",
  },
  linkText: {
    fontSize: 16,
    color: "blue",
    fontFamily: "PoppinsSemi",
    marginTop: 5,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Fetch;
