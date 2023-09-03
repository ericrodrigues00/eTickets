import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centraliza verticalmente
    alignItems: 'center', // Centraliza horizontalmente
  },
  userInfo: {
    backgroundColor: '#fff', // Cor de fundo para as informações do usuário
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userInfoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

const UserProfileScreen = ({route}) => {

  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.userInfoText}>{route.params.userData.name}</Text>
        <Text style={styles.userInfoText}>{route.params.userData.cpf}</Text>
        <Text style={styles.userInfoText}>{route.params.userData.email}</Text>
        <Text style={styles.userInfoText}>*FINGE QUE A FOTO TA AQUI*</Text>
        {/* Outros dados do usuário */}
      </View>
    </View>
  );
};

export default UserProfileScreen;
