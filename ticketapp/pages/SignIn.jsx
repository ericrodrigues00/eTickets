import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
import Register from './UserRegister'

// Estilos dos componentes
const Container = styled.View`
  flex: 1;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 38px;
`;

const InfoSection = styled.View`
  flex: 1;
  width: 100%;
`;

const TopSec = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  
`;

const MidSec = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

`;

const BotSec = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
 
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  text-align: center;
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
  background-color: #605eb5;
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

// Função para validar email
const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};






//add marco para testar o login
async function handleLogin() {
  const { email, senha } = formData;

  if (!email || !senha) {
    Alert.alert('Erro', 'Preencha todos os campos.');
    return;
  }

  if (!isEmailValid(email)) {
    setEmailError(true);
    return;
  } else {
    setEmailError(false);
  }

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }), // Enviar os dados do formulário
    });

    const data = await response.json();
    if (data.message === "Login bem-sucedido") {
      // Lógica para lidar com o login bem-sucedido
    } else {
      // Lógica para lidar com credenciais inválidas
    }
  } catch (error) {
    // Lógica para lidar com erros de rede ou outras exceções
    console.error('Erro:', error);
    setEmail('');
    setSenha('');
  }
}



const LoginScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [emailError, setEmailError] = useState(false);


    // Realize aqui a lógica de login se todas as validações passarem
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
      keyboardShouldPersistTaps="handled"
    >
      <Container>
        <InfoSection>
          <TopSec>
            <Title>Ingressos</Title>
            <Subtitle>Faça login no eTicket para acessar ofertas de ingressos.</Subtitle>
          </TopSec>
          <MidSec>
            <InputContainer>
              <InputTitle>Email</InputTitle>
              <Input
                placeholder="Email"
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  setEmailError(false);
                }}
                value={formData.email}
                error={emailError}
              />
              {emailError && <ErrorMessage>Email inválido</ErrorMessage>}
            </InputContainer>
            <InputContainer>
              <InputTitle>Senha</InputTitle>
              <Input
                placeholder="Senha"
                secureTextEntry={true}
                onChangeText={(text) => setFormData({ ...formData, senha: text })}
                value={formData.senha}
              />
            </InputContainer>
          </MidSec>
          <BotSec>
            <RegisterButton onPress={handleLogin}>
              <ButtonText >LOGIN</ButtonText>
            </RegisterButton>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <LoginLink>Não possui conta? Clique aqui para se cadastrar.</LoginLink>
            </TouchableOpacity>
          </BotSec>
        </InfoSection>
      </Container>
    </ScrollView>
  );

export default LoginScreen;
