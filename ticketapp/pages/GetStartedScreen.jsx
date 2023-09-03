import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import LoginScreen from './LoginScreen';


const Container = styled.View`
    padding:0;

  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const ImageSection = styled.View`
  height:60%;
  width:100%;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 40px;
`;

const InfoSection = styled.View`
    
    height: 40%;
    justify-content: space-around;

`


const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;

  font-size: 32px;
`;

const Subtitle = styled.Text`
  font-size: 16px;
  text-align: center;

  color: #666666;
`;

const EnterButton = styled.TouchableOpacity`
  background-color: #605EB5;
  padding: 15px 40px;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const GetStartedScreen = ({route}) => {
  const navigation = useNavigation();
    return (
      <Container>
        <ImageSection>
          <Image
            source={require('../assets/banner.png')}
            resizeMode="contain"/>
        </ImageSection>
        <InfoSection>
        <Title>É um prazer te ter aqui</Title>
          <Subtitle>
            Compre seus ingressos de forma facilitada e integrada, podendo escolher o vendedor!
          </Subtitle>
          <Subtitle>
            Bem vindo, {route.params.userData.name}!
          </Subtitle>
            <EnterButton onPress={() => navigation.navigate('UserRegisterScreen')}>
          <ButtonText>GET STARTED</ButtonText>
        </EnterButton>
        </InfoSection>
          
      </Container>
    );
  };
  

export default GetStartedScreen
