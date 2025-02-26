import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image 
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";

const IncidentReportingScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [title, setTitle] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      }
    })();
  }, []);

  const handleSubmit = () => {
    console.log("Incident Details:", {
      location,
      title,
      incidentType,
      description,
    });
    // You can store or send this data to your backend here
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Home</Text>
      </View>

      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image source={require("./assets/reporting.png")} style={styles.image} />
      </View>

      {/* Input Fields */}
      <View style={styles.formContainer}>
      <Text style={styles.label}>Incident Title</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Give a title" 
          value={title} 
          onChangeText={setTitle} 
        />

      <Text style={styles.label}>Type of Incident</Text>
        <TextInput 
          style={styles.input} 
          placeholder="(e.g. Fire, Accident)" 
          value={incidentType} 
          onChangeText={setIncidentType} 
        />

      <Text style={styles.label}>Description</Text>
        <TextInput 
          style={styles.descriptionInput} 
          placeholder="Brief description about the incident" 
          value={description} 
          onChangeText={setDescription} 
          multiline 
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 50,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 3,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 10, // Space below header
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 10,
    color: '#333',
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  descriptionInput: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    height: 120,
    textAlignVertical: "top",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#1eaad1",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default IncidentReportingScreen;
