import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Image, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import AsyncStorage from '@react-native-async-storage/async-storage';
=======
import { Calendar } from 'react-native-calendars';
>>>>>>> 4489895 (sellesaii)

export default function Peminjaman() {
  const [name, setName] = useState('');
  const [alat, setAlat] = useState('');
  const [date, setDate] = useState(null); // Tanggal yang dipilih
  const [petugas, setPetugas] = useState('');
  const [photo, setPhoto] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false); // Menampilkan kalender
  const [errors, setErrors] = useState({});
  const navigation = useNavigation();

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert('Izin Kamera Ditolak', 'Aplikasi memerlukan akses ke kamera untuk mengambil foto.');
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

  const validateFields = () => {
    let tempErrors = {};
    if (!name) tempErrors.name = true;
    if (!alat) tempErrors.alat = true;
    if (!petugas) tempErrors.petugas = true;
    if (!photo) tempErrors.photo = true;
    if (!date) tempErrors.date = true;  // Menambahkan validasi untuk tanggal
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAjukan = async () => {
    if (!validateFields()) {
      Alert.alert('Error', 'Semua kolom wajib diisi sebelum melanjutkan.');
      return;
    }

<<<<<<< HEAD
    const peminjamanData = {
      name,
      alat,
      date,
      petugas,
      photo
    };

    try {
      const existingData = await AsyncStorage.getItem('historyData');
      const newHistory = existingData ? JSON.parse(existingData) : [];
      newHistory.push(peminjamanData);
      await AsyncStorage.setItem('historyData', JSON.stringify(newHistory));

      Alert.alert('Sukses', 'Data peminjaman berhasil diajukan.');
      navigation.navigate('data');
=======
    const formData = new FormData();
    formData.append('name', name);
    formData.append('alat', alat);
    formData.append('date', date); // Tanggal yang dipilih
    formData.append('petugas', petugas);
    if (photo) {
      formData.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: photo.split('/').pop(),
      });
    }

    try {
      const response = await fetch('https://redesigned-spoon-r4ggj6xwgp453w5r4-3000.app.github.dev/api/peminjaman', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Sukses', 'Data peminjaman berhasil diajukan.');
        navigation.navigate('History');
      } else {
        Alert.alert('Error', result.message || 'Gagal menyimpan data peminjaman.');
      }
>>>>>>> 4489895 (sellesaii)
    } catch (error) {
      Alert.alert('Error', 'Gagal menyimpan data peminjaman.');
      console.error(error);
    }
  };

  const handleDayPress = (day) => {
    setDate(day.dateString); // Mengambil tanggal yang dipilih dalam format YYYY-MM-DD
    setShowCalendar(false); // Menyembunyikan kalender setelah memilih tanggal
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>

        {/* Judul */}
        <Text style={styles.title}>Ajukan Peminjaman</Text>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Peminjam"
            value={name}
            onChangeText={setName}
          />
        </View>

<<<<<<< HEAD
          <View style={[styles.inputContainer, errors.alat && styles.errorInput]}>
=======
        {/* Alat Input */}
        <View style={[styles.inputContainer, errors.alat && styles.errorInput]}>
>>>>>>> 4489895 (sellesaii)
            <Entypo name="tools" size={24} color="brown" />
            <TextInput
              style={[styles.input, { height: 120 }]} // Menyesuaikan tinggi
              placeholder="Nama Alat"
              value={alat}
              onChangeText={text => setAlat(text)}
              multiline={true}  // Mengaktifkan multiline
              textAlignVertical="top" // Memastikan teks berada di atas
            />
          </View>

<<<<<<< HEAD
        
=======
        {/* Date Picker */}
>>>>>>> 4489895 (sellesaii)
        <View style={styles.inputContainer}>
          <FontAwesome name="calendar" size={24} color="brown" />
          <input
            type="date"
            style={styles.dateInput}
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </View>

        {/* Petugas Input */}
        <View style={styles.inputContainer}>
          <FontAwesome name="user" size={24} color="brown" />
          <TextInput
            style={styles.input}
            placeholder="Nama Petugas"
            value={petugas}
            onChangeText={setPetugas}
          />
        </View>

        {/* Photo Section */}
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

        {/* Tombol Sejajar */}
        <View style={styles.buttonContainer}>
          {/* Tombol Kembali */}
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#ffff' }]} onPress={() => navigation.goBack()}>
            <Text style={[styles.submitButtonText, { color: '#000'}]}>KEMBALI</Text>
          </TouchableOpacity>

          {/* Tombol Ajukan */}
          <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#ffff' }]} onPress={handleAjukan}>
            <Text style={[styles.submitButtonText, { color: '#000' }]}>AJUKAN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0070B8', paddingTop: 20 },
  scrollContent: { paddingBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    elevation: 3, // Adds shadow for better separation
  },
  input: { marginLeft: 10, flex: 1, fontSize: 16, color: '#333', padding: 10 },
  dateInput: { marginLeft: 10, fontSize: 16, color: '#333' },
  calendarContainer: {
    position: 'absolute',
    top: 150, // Mengatur posisi kalender
    left: 10,
    right: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    zIndex: 1,
  },
  photoContainer: { alignItems: 'center', margin: 10 },
  image: { width: 120, height: 120, borderRadius: 8, marginBottom: 10 },
  deleteButton: { marginTop: 5, flexDirection: 'row', alignItems: 'center' },
  deleteButtonText: { color: 'red', marginLeft: 5, fontSize: 14 },
  submitButton: {
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 8,
    elevation: 5, // Adds shadow for better button visibility
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center', // Center content in the button
  },
  submitButtonText: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    elevation: 2,
  },
  menuText: { marginLeft: 10, fontSize: 16, color: '#0070B8' },
  errorInput: { borderColor: 'red', borderWidth: 1 }, // Menambahkan border merah jika ada error
  buttonContainer: {
    flexDirection: 'row', // Membuat tombol sejajar
    justifyContent: 'space-between', // Memberikan jarak antar tombol
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 12,
    marginVertical: 6,
<<<<<<< HEAD
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  input: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorMessage: {
    color: 'red',
    marginLeft: 20,
    marginTop: -5,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
  },
  dateInput: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    paddingLeft: 16,
  },
  photoContainer: {
    marginHorizontal: 12,
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
=======
>>>>>>> 4489895 (sellesaii)
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  alatInput: {
    height: 100,  // Memperbesar tinggi input alat
  },

});