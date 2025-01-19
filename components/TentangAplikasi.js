import React from "react";
import { View, Text, StyleSheet, Linking, Button } from "react-native";

export default function TentangAplikasi() {
  const handleOpenYouTube = () => {
    const url = "https://www.youtube.com/watch?v=DEMO_VIDEO_LINK"; // Ganti dengan link demo
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tentang Aplikasi</Text>
      <Text style={styles.description}>
        Aplikasi ini dibuat untuk memudahkan pengguna dalam melakukan cek ongkos
        kirim (ongkir) dan melacak status pengiriman barang (resi). Dikembangkan
        oleh tim developer dengan tujuan memberikan solusi efisien untuk
        pengguna jasa pengiriman.
      </Text>
      <Text style={styles.subtitle}>Fitur Utama:</Text>
      <Text>- Cek ongkir dari berbagai kurir.</Text>
      <Text>- Lacak status pengiriman berdasarkan nomor resi.</Text>
      <Text>- Statistik transaksi untuk admin.</Text>
      <Text>- Notifikasi realtime menggunakan Firebase.</Text>

      <View style={styles.buttonContainer}>
        <Button title="Lihat Demo di YouTube" onPress={handleOpenYouTube} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
