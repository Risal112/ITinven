import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Prink({ route }) {
  const { data } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Peminjaman</Text>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.text}>#{index + 1}</Text>
            <Text style={styles.text}>Nama: {item.name}</Text>
            <Text style={styles.text}>Alat: {item.alat}</Text>
            <Text style={styles.text}>Tanggal Peminjaman: {item.date}</Text>
            <Text style={styles.text}>Petugas: {item.petugas}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>
              Tanggal Pengembalian: {item.returnDate || '-'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    
        container: {
          flex: 1,
          backgroundColor: '#f5f5f5',
        },
        topButtons: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginVertical: 10,
        },
        backButton: {
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: '#007BFF',
          borderRadius: 5,
        },
        backButtonText: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
        },
        printButton: {
          paddingVertical: 5,
          paddingHorizontal: 10,
          backgroundColor: '#6c757d',
          borderRadius: 5,
        },
        printButtonText: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
        },
        tableHeader: {
          flexDirection: 'row',
          backgroundColor: '#007BFF',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          flexWrap: 'nowrap',
        },
        headerCell: {
          flex: 1,
          color: '#fff',
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 12,
          minWidth: 80,
        },
        row: {
          flexDirection: 'row',
          backgroundColor: '#fff',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
        },
        cell: {
          flex: 1,
          textAlign: 'center',
          fontSize: 12,
          paddingVertical: 5,
          minWidth: 80,
        },
        actionButtons: {
          flexDirection: 'column',
        },
        editButton: {
          backgroundColor: '#28a745',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 60,
          marginTop: 5,
        },
        editButtonText: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
        },
        returnButton: {
          backgroundColor: '#ff9800',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 60,
        },
        returnButtonText: {
          color: '#fff',
          fontSize: 12,
          fontWeight: 'bold',
        },
        disabledButton: {
          backgroundColor: '#d3d3d3',
        },
      });
      