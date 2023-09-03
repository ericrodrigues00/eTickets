import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  announcementBlock: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBar: {
    marginTop: 70,
    marginHorizontal: 20,
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 8,
    fontSize: 16,
    color: '#000000', // Defina a cor desejada para o texto aqui
    fontWeight: 'bold',
  },
  filters: {
    marginTop: 16,
    // Adicione estilos para os filtros aqui
  },
});

const AnnouncementsScreen = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    // Aqui, você faz uma solicitação HTTP para obter os dados dos anúncios do seu servidor
    axios.get('http://192.168.0.103:4567/announcements')
      .then((response) => {
        setAnnouncements(response.data); // Define os anúncios com os dados recebidos
      })
      .catch((error) => {
        console.error('Erro ao buscar anúncios:', error);
      });
  }, []); // Executado apenas uma vez na montagem do componente

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar anúncios..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <View style={styles.filters}>
        {/* Adicione seus filtros aqui */}
      </View>
      {announcements.map((announcement) => (
        <View key={announcement._id} style={styles.announcementBlock}>
          <Text style={styles.title}>{announcement.title}</Text>
          <Text>Tipo: {announcement.type}</Text>
          <Text>Preço: R$ {announcement.price}</Text>
          <Text>Quantidade disponível: {announcement.quantity}</Text>
          <Text>Status: {announcement.status}</Text>
          <Text>Criado em: {new Date(announcement.createdAt).toLocaleString()}</Text>
          {/* Adicione outros detalhes do anúncio conforme necessário */}
        </View>
      ))}
    </ScrollView>
  );
};

export default AnnouncementsScreen;
