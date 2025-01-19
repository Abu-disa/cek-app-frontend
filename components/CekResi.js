import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function CekResi() {
  const [courier, setCourier] = useState(""); // Kurir (jne, pos, tiki, dll.)
  const [waybill, setWaybill] = useState(""); // Nomor resi
  const [result, setResult] = useState(null); // Hasil cek resi

  const handleCheckResi = async () => {
    try {
      const response = await axios.post(
        "https://svs6bqbz-5000.asse.devtunnels.ms/resi",
        {
          courier,
          waybill,
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching resi data:", error);
      alert("Terjadi kesalahan saat cek resi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cek Resi Pengiriman</Text>
      <TextInput
        style={styles.input}
        placeholder="Nama Kurir (e.g., jne, pos, tiki)"
        value={courier}
        onChangeText={setCourier}
      />
      <TextInput
        style={styles.input}
        placeholder="Nomor Resi"
        value={waybill}
        onChangeText={setWaybill}
      />
      <Button title="Cek Resi" onPress={handleCheckResi} />
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Hasil Cek Resi:</Text>
          <Text>
            Status: {result.data?.summary?.status || "Tidak ditemukan"}
          </Text>
          <Text>Pengirim: {result.data?.detail?.shipper || "-"}</Text>
          <Text>Penerima: {result.data?.detail?.receiver || "-"}</Text>
          <Text>History:</Text>
          {result.data?.history?.map((item, index) => (
            <Text key={index}>
              {item.date} - {item.desc}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resultTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },
});
