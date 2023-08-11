
import React, { useState } from 'react';
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
  background-color: #007bff;
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

const isEmailValid = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};

const isCPFValid = (cpf) => {
  const cleanCPF = cpf.replace(/[^\d]/g, '');

  if (cleanCPF.length !== 11) {
    return false;
  }

  const invalidCPFList = [
    '00000000000', '11111111111', '22222222222', '33333333333',
    '44444444444', '55555555555', '66666666666', '77777777777',
    '88888888888', '99999999999'
  ];

  if (invalidCPFList.includes(cleanCPF)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(9, 10))) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cleanCPF.substring(10, 11))) {
    return false;
  }

  return true;
};

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cpf: '',
    senha: '',
    confirmarSenha: '',
  });

  const [emailError, setEmailError] = useState(false);
  const [cpfError, setCPFError] = useState(false);

  const handleRegister = () => {
    const { nome, email, cpf, senha, confirmarSenha } = formData;

    if (!nome || !email || !cpf || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (!isCPFValid(cpf)) {
      setCPFError(true);
      return;
    } else {
      setCPFError(false);
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    // Realize aqui a lógica de registro se todas as validações passarem
    alert('Cadastro concluído!');
  };

  const handleCPFChange = (text) => {
    const numericCPF = text.replace(/[^0-9]/g, '');

    if (numericCPF.length > 11) {
      return;
    }

    setFormData({ ...formData, cpf: numericCPF });
    setCPFError(false);
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
            <Title>Ingressos</Title>
            <Subtitle>Cadastre-se no eTicket e tenha acesso a diferentes ofertas de ingressos.</Subtitle>
            <InputContainer>
              <InputTitle>Nome</InputTitle>
              <Input
                placeholder="Nome"
                onChangeText={(text) => setFormData({ ...formData, nome: text })}
                value={formData.nome}
              />
            </InputContainer>
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
              <InputTitle>CPF</InputTitle>
              <Input
                placeholder="CPF"
                onChangeText={handleCPFChange}
                value={formData.cpf}
                keyboardType="numeric"
                error={cpfError}
              />
              {cpfError && <ErrorMessage>CPF inválido</ErrorMessage>}
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
            <InputContainer>
              <InputTitle>Confirmar Senha</InputTitle>
              <Input
                placeholder="Confirmar Senha"
                secureTextEntry={true}
                onChangeText={(text) => setFormData({ ...formData, confirmarSenha: text })}
                value={formData.confirmarSenha}
              />
            </InputContainer>
            <RegisterButton onPress={handleRegister}>
              <ButtonText>REGISTER</ButtonText>
            </RegisterButton>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <LoginLink>Já é usuário? Clique aqui.</LoginLink>
            </TouchableOpacity>
          </InfoSection>
        </Container>
      </ScrollView>
    
  );
};

export default RegisterScreen;