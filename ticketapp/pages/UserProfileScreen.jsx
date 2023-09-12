import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;
const buttonSize = (windowWidth - 72) / 2; // 24 de margem em cada lado dos botões e 24 de espaço entre eles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap', // Permite que os botões quebrem para a próxima linha
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24, // Espaçamento vertical entre os botões
  },
  buttonPrimary: {
    backgroundColor: '#d5d5d8',
  },
  buttonSecondary: {
    backgroundColor: '#605eb5',
  },
  buttonTextPrimary: {
    color: '#605eb5',
    fontFamily: 'Poppins-Extrabold',
    fontSize: 14,
  },
  buttonTextSecondary: {
    color: '#d5d5d8',
    fontFamily: 'Poppins-Extrabold',
    fontSize: 14,
  },
  reportButton: {
    width: 250,
    height: 50,
    backgroundColor: '#605eb5', // Cor roxa
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center', // Centraliza horizontalmente
  },
  reportButtonText: {
    color: 'white',
    fontFamily: 'Poppins-Extrabold',
    fontSize: 16,
  },
});

const UserProfileScreen = ({ route }) => {
  const [user, setUser] = useState(route.params.userData);

  useEffect(() => {
    axios
      .get(`http://0.0.0.0:4567/user/${user._id}/announcementCount`)
      .then((response) => {
        setUser({ ...user, announcementCount: response.data.count });
      })
      .catch((error) => {
        console.error('Erro ao obter a contagem de anúncios', error);
      });
  }, [user._id]);

  const navigation = useNavigation();

  const handleCreateAd = () => {
    // Aqui você pode navegar para a tela de cadastro de anúncios
    navigation.navigate('AnnouncementRegisterScreen', {
      userId: route.params.userData._id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>{route.params.userData.name}</Text>
        <Text style={styles.userInfoText}>{route.params.userData.cpf}</Text>
        <Text style={styles.userInfoText}>{route.params.userData.email}</Text>
        <Text style={styles.userInfoText}>
          *FINGE QUE A FOTO TA AQUI*
        </Text>
        <Text style={styles.userInfoText}>
          Anúncios Criados: {user.announcementCount}
        </Text>
      </View>
      <View style={styles.buttonRow}>
        <View style={[styles.button, styles.buttonPrimary]}>
          <Text style={styles.buttonTextPrimary}>Botão 1</Text>
        </View>
        <View style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonTextSecondary}>Botão 2</Text>
        </View>
        <View style={[styles.button, styles.buttonSecondary]}>
          <Text style={styles.buttonTextSecondary}>Botão 3</Text>
        </View>
        <View style={[styles.button, styles.buttonPrimary]}>
          <Text style={styles.buttonTextPrimary}>Botão 4</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.reportButton}
        onPress={() => {
          // Adicione a lógica para relatar o vendedor aqui
        }}
      >
        <Text style={styles.reportButtonText}>Reportar Vendedor</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfileScreen;
