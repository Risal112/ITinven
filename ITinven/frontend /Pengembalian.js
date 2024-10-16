import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert, StatusBar } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native'; // Impor navigation hook

export default function Peminjaman() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation(); // Gunakan navigation

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Izin Kamera Ditolak", "Aplikasi memerlukan akses ke kamera untuk mengambil foto.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  const deletePhoto = () => {
    setPhoto(null);
  };

  const handleAjukan = () => {
    // Pindah ke halaman konfirmasi pengembalian
    navigation.navigate('konfirmas_pengembalian');
  };

  const handleBackToHome = () => {
    // Navigasi kembali ke halaman Home
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0070B8" />
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>PENGEMBALIAN</Text>
        <Text style={styles.infoText}>
          Isi sesuai data yang diminta, lalu klik proses jika sudah sesuai.
        </Text>
      </View>

      <ScrollView>
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Peminjam"
            value={name}
            onChangeText={text => setName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="construction" size={24} color="brown" /> 
          <TextInput
            style={styles.input}
            placeholder="Nama Alat"
          />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={24} color="brown" />
          <input type="date" name="birthday" style={styles.dateInput}></input>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Petugas"
          />
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={takePhoto}>
          <MaterialIcons name="photo-camera" size={24} color="brown" />
          <Text style={styles.menuText}>AMBIL PHOTO</Text>
        </TouchableOpacity>

        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo }} style={styles.image} />
            <TouchableOpacity style={styles.deleteButton} onPress={deletePhoto}>
              <MaterialIcons name="delete" size={24} color="red" />
              <Text style={styles.deleteButtonText}>HAPUS PHOTO</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>KEMBALI KE HOME</Text>  {/* Hilangkan ikon home */}
        </TouchableOpacity>

        <TouchableOpacity style={styles.submitButton} onPress={handleAjukan}>
          <FontAwesome name="check" size={24} color="white" />
          <Text style={styles.submitButtonText}>AJUKAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0070B8',
    paddingTop: StatusBar.currentHeight || 0, // Adjust for top padding
  },
  infoContainer: {
    backgroundColor: '#001F3F',
    padding: 12,
    borderRadius: 8,
    margin: 12,
  },
  infoTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#fff',
    marginTop: 4,
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Softer background color for inputs
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  dateInput: {
    flex: 1,
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#333',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'center', // Center buttons
    alignItems: 'center',
    backgroundColor: '#001F3F',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0070B8',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  backButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 8, // Space between buttons
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 8,
  },
  image: {
    width: 160,
    height: 120,
    margin: 12,
    borderRadius: 8,
  },
  photoContainer: {
    alignItems: 'center',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffdddd',
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
  },
  deleteButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: 'red',
  },
});
