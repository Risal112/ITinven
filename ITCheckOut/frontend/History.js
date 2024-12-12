import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert, ScrollView, Dimensions } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function History({ navigation }) {
  const [peminjamanList, setPeminjamanList] = useState([]);
  const [filteredPeminjaman, setFilteredPeminjaman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const screenWidth = Dimensions.get('window').width;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://redesigned-spoon-r4ggj6xwgp453w5r4-3000.app.github.dev/api/peminjaman');
      const data = await response.json();
      const updatedData = data.map((item) => ({
        ...item,
        status:
          item.status === 'Sudah Dikembalikan' || item.status === 'Belum Dikembalikan'
            ? item.status
            : 'Belum Dikembalikan',
        returnDate: item.status === 'Sudah Dikembalikan' ? new Date().toLocaleDateString() : null,
      }));
      if (isMounted) {
        setPeminjamanList(updatedData);
        setFilteredPeminjaman(updatedData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Terjadi kesalahan', 'Gagal mengambil data peminjaman');
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchData();
    return () => setIsMounted(false);
  }, []);

  const handleKembalikan = async (itemId) => {
    if (processing) return;
    setProcessing(true);
    try {
      const response = await fetch('https://redesigned-spoon-r4ggj6xwgp453w5r4-3000.app.github.dev/api/return/return', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ returnId: itemId }),
      });
      const data = await response.json();
      if (response.ok) {
        const returnDate = new Date().toLocaleDateString();
        const updatedList = peminjamanList.map((item) =>
          item._id === itemId ? { ...item, status: 'Sudah Dikembalikan', returnDate } : item
        );
        if (isMounted) {
          setPeminjamanList(updatedList);
          setFilteredPeminjaman(updatedList);
        }
        Alert.alert('Sukses', 'Status berhasil diperbarui menjadi "Sudah Dikembalikan".');
      } else {
        Alert.alert('Gagal', data.message || 'Gagal mengubah status.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Kesalahan', 'Terjadi kesalahan saat mengubah status.');
    } finally {
      setProcessing(false);
    }
  };

  const handleEdit = (item) => {
    navigation.navigate('Edit', { dataToEdit: item, onUpdate: updatePeminjaman });
  };

  const updatePeminjaman = (updatedItem) => {
    const updatedList = peminjamanList.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    setPeminjamanList(updatedList);
    setFilteredPeminjaman(updatedList);
  };

  const handlePrintData = async () => {
    try {
      const dataToPrint = filteredPeminjaman.map((item, index) => (
        `<p>#${index + 1}: Nama Peminjam: ${item.name}<br/>` +
        `Nama Alat: ${item.alat}<br/>` +
        `Tanggal Peminjaman: ${item.date}<br/>` +
        `Petugas: ${item.petugas}<br/>` +
        `Status: ${item.status}<br/>` +
        `Tanggal Pengembalian: ${item.returnDate || '-'}</p>`
      )).join('');

      const htmlContent = `
        <html>
          <body>
            <h1>Data Peminjaman</h1>
            ${dataToPrint}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log('PDF created at:', uri);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert('Gagal', 'Berbagi file tidak tersedia di perangkat ini.');
      }
    } catch (error) {
      console.error('Error creating PDF:', error);
      Alert.alert('Kesalahan', 'Gagal membuat PDF.');
    }
  };

  const renderRow = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={[styles.cell, { flex: 2 }]}>{item.name}</Text>
        <Text style={[styles.cell, { flex: 2 }]}>{item.alat}</Text>
        <Text style={styles.cell}>{new Date(item.date).toLocaleDateString()}</Text>
        <Text style={styles.cell}>{item.petugas}</Text>
        <Text style={[styles.cell, { color: item.status === 'Sudah Dikembalikan' ? 'green' : 'red' }]}>{item.status}</Text>
        <Text style={styles.cell}>{item.returnDate || '-'}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.returnButton, item.status === 'Sudah Dikembalikan' && styles.disabledButton]}
            onPress={() => item.status !== 'Sudah Dikembalikan' && handleKembalikan(item._id)}
            disabled={item.status === 'Sudah Dikembalikan' || processing}
          >
            <Text style={styles.returnButtonText}>
              {item.status === 'Sudah Dikembalikan' ? 'Dikembalikan' : 'Kembalikan'}
            </Text>
          </TouchableOpacity>

          {item.status !== 'Sudah Dikembalikan' && (
            <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.printButton} onPress={handlePrintData}>
          <Text style={styles.printButtonText}>Print</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : filteredPeminjaman.length > 0 ? (
        <ScrollView horizontal>
          <View style={{ minWidth: screenWidth }}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, { flex: 2 }]}>Nama Peminjam</Text>
              <Text style={[styles.headerCell, { flex: 2 }]}>Nama Alat</Text>
              <Text style={styles.headerCell}>Tanggal Peminjaman</Text>
              <Text style={styles.headerCell}>Nama Petugas</Text>
              <Text style={styles.headerCell}>Status</Text>
              <Text style={styles.headerCell}>Tanggal Pengembalian</Text>
              <Text style={styles.headerCell}>Aksi</Text>
            </View>

            <FlatList
              data={filteredPeminjaman}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderRow}
            />
          </View>
        </ScrollView>
      ) : (
        <Text>No data available</Text>

      )}
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
    backgroundColor: '#28a745',
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
