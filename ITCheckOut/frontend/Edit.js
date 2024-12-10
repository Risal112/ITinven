import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Edit({ navigation, route }) {
  const { dataToEdit } = route.params;
  const [name, setName] = useState(dataToEdit.name);
  const [alat, setAlat] = useState(dataToEdit.alat);
  const [petugas, setPetugas] = useState(dataToEdit.petugas);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://redesigned-spoon-r4ggj6xwgp453w5r4-3000.app.github.dev/api/peminjaman/${dataToEdit._id}`, {
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
      <Text style={styles.label}>Nama Peminjam</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Nama Alat</Text>
      <TextInput style={styles.input} value={alat} onChangeText={setAlat} />

      <Text style={styles.label}>Nama Petugas</Text>
      <TextInput style={styles.input} value={petugas} onChangeText={setPetugas} />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Perbarui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  button: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
