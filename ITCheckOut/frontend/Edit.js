import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Edit({ navigation, route }) {
  const { dataToEdit } = route.params;
  const [name, setName] = useState(dataToEdit.name);
  const [alat, setAlat] = useState(dataToEdit.alat);
  const [petugas, setPetugas] = useState(dataToEdit.petugas);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://scaling-umbrella-7v99g5xw947wcpxw5-3000.app.github.dev/api/peminjaman/${dataToEdit._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, alat, petugas }),
      });
      const data = await response.json();

      if (response.ok) {
        Alert.alert('Sukses', 'Data berhasil diperbarui.');
        navigation.goBack();
      } else {
        Alert.alert('Gagal', data.message || 'Terjadi kesalahan saat memperbarui data.');
      }
    } catch (error) {
      console.error('Error updating data:', error);
      Alert.alert('Kesalahan', 'Tidak dapat memperbarui data.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nama Peminjam</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Nama Alat</Text>
        <TextInput
              style={[styles.input, { height: 120 }]} // Menyesuaikan tinggi
              placeholder="Nama Alat"
              value={alat}
              onChangeText={text => setAlat(text)}
              multiline={true}  // Mengaktifkan multiline
              textAlignVertical="top" // Memastikan teks berada di atas
            />
        <Text style={styles.label}>Nama Petugas</Text>
        <TextInput style={styles.input} value={petugas} onChangeText={setPetugas} />
      </View>

      {/* Tombol Kembali dan Perbarui dalam satu baris */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Kembali</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.updateButton]} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Perbarui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    marginTop: 20, // Pindahkan semua input lebih ke atas
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  inputLarge: {
    height: 100, // Memperbesar tinggi input untuk Nama Alat
    textAlignVertical: 'top', // Menjaga teks tetap mulai dari atas
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  backButton: {
    backgroundColor: '#007bff',
  },
  updateButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
