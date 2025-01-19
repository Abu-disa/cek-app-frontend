import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function CekOngkir() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [weight, setWeight] = useState("");
  const [courier, setCourier] = useState("");
  const [result, setResult] = useState(null);

  const handleCheckOngkir = async () => {
    try {
      const response = await axios.post(
        "https://svs6bqbz-5000.asse.devtunnels.ms/ongkir",
        {
          origin,
          destination,
          weight,
          courier,
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching ongkir data", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cek Ongkir Pengiriman</Text>
      <TextInput
        placeholder="Asal"
        value={origin}
        onChangeText={setOrigin}
        style={styles.input}
      />
      <TextInput
        placeholder="Tujuan"
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
      />
      <TextInput
        placeholder="Berat (Kilogram)"
        value={weight}
        onChangeText={setWeight}
        style={styles.input}
      />
      <TextInput
        placeholder="Kurir"
        value={courier}
        onChangeText={setCourier}
        style={styles.input}
      />
      <Button title="Cek Ongkir" onPress={handleCheckOngkir} />
      {result && (
        <ScrollView style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Ringkasan Pengiriman:</Text>
          <Text style={styles.summaryText}>
            Kurir: {result.data.summary.courier.join(", ")}
          </Text>
          <Text style={styles.summaryText}>
            Asal: {result.data.summary.origin}
          </Text>
          <Text style={styles.summaryText}>
            Tujuan: {result.data.summary.destination}
          </Text>
          <Text style={styles.summaryText}>
            Berat: {result.data.summary.weight}
          </Text>
          <Text style={styles.summaryText}>
            Volume: {result.data.summary.volume}
          </Text>

          <Text style={styles.resultTitle}>Detail Layanan:</Text>
          {result.data.costs.map((cost, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{cost.name}</Text>
              <Text>Service: {cost.service}</Text>
              <Text>Jenis: {cost.type}</Text>
              <Text>Harga: Rp{cost.price}</Text>
              <Text>Estimasi: {cost.estimated}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
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
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 5,
  },
  card: {
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
