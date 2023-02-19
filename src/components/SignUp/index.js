import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar, TextInput, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import LottieView from 'lottie-react-native';
//import { AuthContext } from "../Contexts/Auth";
//import { auth } from "../../Components/components/firebase.js";

const schema = yup.object({
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Informe seu email"),
  password: yup
    .string()
    .min(7, "Informe no mínimo 8 números")
    .required("Informe sua senha"),
});


export function SignUp() {
  const navigation = useNavigation();
  //   const { authenticated, login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        let user = userCredentials.user;
        console.log('Registrado como:', user.email);
        Alert.alert('Seu Cadastro foi realizado com Sucesso! "\n" complete seu cadastro agora');
        navigation.navigate('Registration');
      })
      .catch(error => Alert.alert("deu errado", error.message))
  }


  return (

    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Animatable.View animation="fadeInLeft" delay={700} style={styles.containerHeader}>
        <Text style={styles.message}>Cadastro</Text>
        <LottieView
          source={require('../../assets/lottie/developer.json')}
          autoPlay={true}
          Loop={true}
          marginTop={20}
        />
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={900} style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, email } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderWidth: errors.email && 1,
                  borderColor: errors.email && "#ff375b",
                },
              ]}
              onChangeText={(text) => setEmail(text)}
              onBlur={onBlur}
              value={email}
              type="text"
              placeholder="Digite seu email"
              placeholderTextColor={"#999"}
              Icon="mail"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.labelError}>{errors.email?.message}</Text>
        )}

        <Text style={styles.title}>Senha</Text>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, password } }) => (
            <TextInput
              style={[
                styles.input,
                {
                  borderWidth: errors.password && 1,
                  borderColor: errors.password && "#ff375b",
                },
              ]}
              onChangeText={(text) => setPassword(text)}
              onBlur={onBlur}
              value={password}
              type="text"
              placeholder="Digite no mínimo 8 números"
              placeholderTextColor={"#999"}
              Icon="lock"
              secureTextEntry
              error={errors.password}
              keyboardType="numeric"
            />
          )}
        />
        {errors.password && (
          <Text style={styles.labelError}>
            {errors.password?.message}
          </Text>
        )}


        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}   // incluir aqui o caminho autenticação    
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.navigate('List')}
        >
          <Text>Acesse a lista sem login</Text>
        </TouchableOpacity>

      </Animatable.View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#014987',
  },
  containerHeader: {
    flex: 1,
    marginTop: '14%',
    marginBottom: '8%',
    paddingStart: '5%',
  },
  message: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 110,

  },
  containerForm: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingStart: '5%',
    paddingEnd: '5%',
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color: '#014987',
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#014987',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: 'center',
  },
  registerText: {
    color: '#a1a1a1',
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginTop: 4,
  },

});



