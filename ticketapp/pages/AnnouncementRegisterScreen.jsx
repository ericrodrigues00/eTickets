import axios from 'axios';
import User from '../models/Ticket';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  height: 100vh;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 38px;
  
`;

const InfoSection = styled.View`
  
  justify-content: space-around;
  width: 100%;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  text-align: center;
  margin: 10px;
  color: #666666;
`;

const InputContainer = styled.View`
  width: 100%;
  margin-top: 18px;
`;

const InputTitle = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${({ error }) => (error ? 'red' : '#ccc')};
  border-radius: 4px;
`;

const ErrorMessage = styled.Text`
  color: red;
  font-size: 14px;
`;

const RegisterButton = styled.TouchableOpacity`
  background-color: #605EB5
;
  padding: 15px 40px;
  border-radius: 8px;
  margin-top: 20px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const LoginLink = styled.Text`
  color: #007bff;
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;


const AnnouncementRegisterScreen = () => {
  const navigation = useNavigation();
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    price: '',
    type: '',
    quantity: '',
  });

  const handleRegister = async () => {
    const { title, price, type, quantity } = announcementData;

    if (!title || !price || !type || !quantity) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    try {
    // Realize aqui a lógica de registro se todas as validações passarem
    const newAnnouncement = {
      title: announcementData.title,
      price: announcementData.price,
      type: announcementData.type,
      quantity: announcementData.quantity,
    };
    axios.post('http://192.168.0.103:4567/register/announcements', newAnnouncement)
      .then(response => {
        alert('Cadastro concluído!');
      })
      .catch(error => {
        console.error('Erro ao cadastrar', error);
      })
    } catch (error) {
      console.error('Erro ao encriptar a senha', error);
    }
  };

  return (
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
        }}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <InfoSection>
            <Title>Anuncie seu ingresso!</Title>
            <Subtitle>Preencha os campos para cadastrar um novo ingresso.</Subtitle>
            <InputContainer>
              <InputTitle>Título</InputTitle>
              <Input
                placeholder="Descreva seu ingresso"
                onChangeText={(text) => setAnnouncementData({ ...announcementData, title: text })}
                value={announcementData.title}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>Preço</InputTitle>
              <Input
                placeholder="Dê seu preço"
                onChangeText={(float) => setAnnouncementData({ ...announcementData, price: float })}
                value={announcementData.price}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>Tipo de Ingresso</InputTitle>
              <Input
                placeholder="É vip ou pista?"
                onChangeText={(text) => setAnnouncementData({ ...announcementData, type: text })}
                value={announcementData.type}
              />
            </InputContainer>
            <InputContainer>
              <InputTitle>Quantidade</InputTitle>
              <Input
                placeholder="Tem quantos?"
                onChangeText={(number) => setAnnouncementData({ ...announcementData, quantity: number })}
                value={announcementData.quantity}
              />
            </InputContainer>
            <RegisterButton onPress={handleRegister}>
              <ButtonText>CADASTRAR INGRESSO</ButtonText>
            </RegisterButton>
          </InfoSection>
        </Container>
      </ScrollView>
    
  );
};

export default AnnouncementRegisterScreen;