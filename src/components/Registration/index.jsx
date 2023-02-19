/*
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
  Button,

} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { ModalPolicies } from '../../Components/Modal';
import { database } from "../../Components/components/firebase";
import { getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";


const schema = yup.object({
  username: yup
    .string()
    .min(4, "Informe seu nome completo")
    .required("Informe seu nome"),
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Informe seu email"),
  password: yup
    .string()
    .min(8, "Informe no mínimo 8 números")
    .required("Informe sua senha"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "A senha de confirmação não confere.")
    .required("Informe sua senha de confirmação"),
  address_cep: yup
    .string()
    .min(7, "CEP precisa ter no mínimo 8 números")
    .max(12, "CEP deve ter no máximo 12 números")
    .required("Informe somente números para o CEP"),
  address_route: yup
    .string()
    .min(6, "Informe nome completo do logradouro")
    .required("Informe nome do logradouro"),
  address_complement: yup.string(),
  address_district: yup
    .string()
    .min(4, "Informe nome completo do bairro")
    .required("Informe nome do bairro"),
  city: yup
    .string()
    .min(4, "Informe nome completo da sua cidade")
    .required("Informe o nome da sua cidade"),
  city_state: yup
    .string()
    .min(2, "Informe a sigla do seu estado")
    .max(2, "Informe apenas a sigla do seu estado")
    .required("Informe s sigla do seu estado"),
  phone: yup
    .string()
    .min(11, "Informe o número incluindo o DDD")
    .required("Informeo número do celular com DDD"),
  doc_rg: yup
    .string()
    .min(4, "Informe o número completo")
    .required("Informe o número do RG"),
  doc_cpf: yup
    .string()
    .min(9, "CPF deve conter no mínimo 10 números")
    .max(12, "CPF deve conter no máximo 12 números")
    .required("Informe oresidência"),
});

export function Registration() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState([])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleSignIn(data) {
    //-------------------funcao para criar cadastro ------------------------------
    try {
      const user = await addDoc(userCollectionRef, {
        data
      });
      console.log(user)
      console.log("dados salvos com sucessos", user);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

  }
  // esse useEffect serve para coletar e apresentar dados alterados no banco de dados
  //=======================================================================
  // tentativa video? usandoREact + Firebase | Firebase 9 e Firestore   https://www.youtube.com/watch?v=gqbXnYhvB5E      https://github.com/Rodrigo322/firebaseReact/blob/main/src/App.jsx
  const userCollectionRef = collection(database, "usuarios");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollectionRef)

      setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      //console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);


  async function criarDado() {

  }

  //--------funçao para deletar usuarios
  async function deleteUser(id) {
    const userDoc = doc(database, "usuarios", id);
    await deleteDoc(userDoc);
    // o botao precisa ter uma arroy function para funcionar
    //    <Button onclick={() => deleteUser(user.id)}>Deletar
  }


  //--------------------------------------------------------------
  // lembrete inserir o campo type="string", mudar value para o nome do campo
  // mudar o onchange{(text) => onchange(text)} <- confira . depoisapagar o submite
  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <Animatable.View
          animation="fadeInLeft"
          delay={700}
          style={styles.containerHeader}
        >
          <Text style={styles.message}>Cadastro</Text>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={900}
          style={styles.containerForm}
        >
          <View>
            <ScrollView>
              <Text style={styles.title}>Nome</Text>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.username && 1,
                        borderColor: errors.username && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor={"#999"}
                    Feather="user"
                    keyboardType="default"
                  />
                )}
              />
              {errors.username && (
                <Text style={styles.labelError}>
                  {errors.username?.message}
                </Text>
              )}

              <Text style={styles.title}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.email && 1,
                        borderColor: errors.email && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.password && 1,
                        borderColor: errors.password && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
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

              <Text style={styles.title}>Confirme sua senha</Text>
              <Controller
                control={control}
                name="passwordConfirm"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.passwordConfirm && 1,
                        borderColor: errors.passwordConfirm && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Confirme aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    secureTextEntry
                    error={errors.passwordConfirm}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.passwordConfirm && (
                <Text style={styles.labelError}>
                  {errors.passwordConfirm?.message}
                </Text>
              )}

              <Text style={styles.title}>Telefone celular</Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.phone && 1,
                        borderColor: errors.phone && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="DDD+números ex.21998876543"
                    placeholderTextColor={"#999"}
                    Icon="mail"
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.phone && (
                <Text style={styles.labelError}>{errors.phone?.message}</Text>
              )}

              <Text style={styles.title}>Documento de Identificação - RG</Text>
              <Controller
                control={control}
                name="doc_rg"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.doc_rg && 1,
                        borderColor: errors.doc_rg && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite apenas número"
                    placeholderTextColor={"#999"}
                    Icon="mail"
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.doc_rg && (
                <Text style={styles.labelError}>{errors.doc_rg?.message}</Text>
              )}

              <Text style={styles.title}>Informe seu CPF</Text>
              <Controller
                control={control}
                name="doc_cpf"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.doc_cpf && 1,
                        borderColor: errors.doc_cpf && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite seu email"
                    placeholderTextColor={"#999"}
                    Icon="mail"
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.doc_cpf && (
                <Text style={styles.labelError}>{errors.doc_cpf?.message}</Text>
              )}

              <Text style={styles.title}>CEP</Text>
              <Controller
                control={control}
                name="address_cep"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_cep && 1,
                        borderColor: errors.address_cep && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe seu CEP, apenas números "
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="numeric"
                    error={errors.address_cep}
                  />
                )}
              />
              {errors.address_cep && (
                <Text style={styles.labelError}>
                  {errors.address_cep?.message}
                </Text>
              )}

              <Text style={styles.title}>Informe seu Endereço Residencial</Text>
              <Controller
                control={control}
                name="address_route"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_route && 1,
                        borderColor: errors.address_route && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Avenida/Rua e o número"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.address_route}
                  />
                )}
              />
              {errors.address_route && (
                <Text style={styles.labelError}>
                  {errors.address_route?.message}
                </Text>
              )}

              <Text style={styles.title}>Complemento do Endereço</Text>
              <Controller
                control={control}
                name="address_complement"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_complement && 1,
                        borderColor: errors.address_complement && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Casa, apartamento nº?, bloco nº?"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.address_complement}
                  />
                )}
              />
              {errors.address_complement && (
                <Text style={styles.labelError}>
                  {errors.address_complement?.message}
                </Text>
              )}

              <Text style={styles.title}>Bairro do seu Endereço</Text>
              <Controller
                control={control}
                name="address_district"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_district && 1,
                        borderColor: errors.address_district && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.address_district}
                  />
                )}
              />
              {errors.address_district && (
                <Text style={styles.labelError}>
                  {errors.address_district?.message}
                </Text>
              )}

              <Text style={styles.title}>Cidade onde você reside</Text>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.city && 1,
                        borderColor: errors.city && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.city}
                  />
                )}
              />
              {errors.city && (
                <Text style={styles.labelError}>{errors.city?.message}</Text>
              )}

              <Text style={styles.title}>Estado onde você reside - UF</Text>
              <Controller
                control={control}
                name="city_state"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.city_state && 1,
                        borderColor: errors.city_state && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.city_state}
                  />
                )}
              />
              {errors.city_state && (
                <Text style={styles.labelError}>
                  {errors.city_state?.message}
                </Text>
              )}
              < ModalPolicies />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(handleSignIn)}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </ScrollView>

          </View>
        </Animatable.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", //"#38a69d",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  message: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,

  },
  containerForm: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginTop: 4,
  },
  policies: {
    flex: 1,

  }
});



// backup original
//====================================================================
/*
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as Animatable from "react-native-animatable";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import {ModalPolicies} from '../../Components/Modal';

import { database } from "../../Components/components/firebase";

const schema = yup.object({
  username: yup
    .string()
    .min(4, "Informe seu nome completo")
    .required("Informe seu nome"),
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Informe seu email"),
  password: yup
    .string()
    .min(8, "Informe no mínimo 8 números")
    .required("Informe sua senha"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "A senha de confirmação não confere.")
    .required("Informe sua senha de confirmação"),
  address_cep: yup
  .string()
  .min(7, "CEP precisa ter no mínimo 8 números")
  .max(12, "CEP deve ter no máximo 12 números")
  .required("Informe somente números para o CEP"),
  address_route: yup
    .string()
    .min(6, "Informe nome completo do logradouro")
    .required("Informe nome do logradouro"),
  address_complement: yup.string(),
  address_district: yup
    .string()
    .min(4, "Informe nome completo do bairro")
    .required("Informe nome do bairro"),
  city: yup
    .string()
    .min(4, "Informe nome completo da sua cidade")
    .required("Informe o nome da sua cidade"),
  city_state: yup
    .string()
    .min(4, "nome completo do seu estado")
    .required("Informe o nome do seu estado"),
  phone: yup
    .string()
    .min(11, "Informe o número incluindo o DDD")
    .required("Informeo número do celular com DDD"),
  doc_rg: yup
    .string()
    .min(4, "Informe o número completo")
    .required("Informe o número do RG"),
  doc_cpf: yup
    .string()
    .min(9, "CPF deve conter no mínimo 10 números")
    .max(12, "CPF deve conter no máximo 12 números")
    .required("Informe oresidência"),
});

export function Registration() {
  const navigation = useNavigation();

  const [userData, setUserData] = useState([])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleSignIn(data) {
        
    console.log(data);
       
  }

  // esse useEffect serve para coletar e apresentar dados alterados no banco de dados
  useEffect(() => {
    database.collection("usuarios").onSnapshot((query) =>{
      const list = [];
      query.forEach((doc) = {
        list.push({...doc.data(), id: doc.id})
      })
      setUserData(list)
    })
  }, []);
  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#38A69D" barStyle="light-content" />
        <Animatable.View
          animation="fadeInLeft"
          delay={700}
          style={styles.containerHeader}
        >
          
          <Text style={styles.message}>Cadastro</Text>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          delay={900}
          style={styles.containerForm}
        >
          <View>
            <ScrollView>
              <Text style={styles.title}>Nome</Text>
              <Controller
                control={control}
                name="username"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.username && 1,
                        borderColor: errors.username && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor={"#999"}
                    Feather="user"
                    keyboardType="default"
                  />
                )}
              />
              {errors.username && (
                <Text style={styles.labelError}>
                  {errors.username?.message}
                </Text>
              )}

              <Text style={styles.title}>Email</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.email && 1,
                        borderColor: errors.email && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
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
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.password && 1,
                        borderColor: errors.password && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
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

              <Text style={styles.title}>Confirme sua senha</Text>
              <Controller
                control={control}
                name="passwordConfirm"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.passwordConfirm && 1,
                        borderColor: errors.passwordConfirm && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Confirme aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    secureTextEntry
                    error={errors.passwordConfirm}
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.passwordConfirm && (
                <Text style={styles.labelError}>
                  {errors.passwordConfirm?.message}
                </Text>
              )}

              <Text style={styles.title}>Telefone celular</Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.phone && 1,
                        borderColor: errors.phone && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="DDD+números ex.21998876543"
                    placeholderTextColor={"#999"}
                    Icon="mail"
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.phone && (
                <Text style={styles.labelError}>{errors.phone?.message}</Text>
              )}

              <Text style={styles.title}>Documento de Identificação - RG</Text>
              <Controller
                control={control}
                name="doc_rg"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.doc_rg && 1,
                        borderColor: errors.doc_rg && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite apenas número"
                    placeholderTextColor={"#999"}
                    Icon="mail"
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.doc_rg && (
                <Text style={styles.labelError}>{errors.doc_rg?.message}</Text>
              )}

              <Text style={styles.title}>Informe seu CPF</Text>
              <Controller
                control={control}
                name="doc_cpf"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.doc_cpf && 1,
                        borderColor: errors.doc_cpf && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Digite seu email"
                    placeholderTextColor={"#999"}
                    Icon="mail"
                    keyboardType="numeric"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.doc_cpf && (
                <Text style={styles.labelError}>{errors.doc_cpf?.message}</Text>
              )}

              <Text style={styles.title}>CEP</Text>
              <Controller
                control={control}
                name="address_cep"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_cep && 1,
                        borderColor: errors.address_cep && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe seu CEP, apenas números "
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="numeric"
                    error={errors.address_cep}
                  />
                )}
              />
              {errors.address_cep && (
                <Text style={styles.labelError}>
                  {errors.address_cep?.message}
                </Text>
              )}

              <Text style={styles.title}>Informe seu Endereço Residencial</Text>
              <Controller
                control={control}
                name="address_route"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_route && 1,
                        borderColor: errors.address_route && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Avenida/Rua e o número"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.address_route}
                  />
                )}
              />
              {errors.address_route && (
                <Text style={styles.labelError}>
                  {errors.address_route?.message}
                </Text>
              )}

              <Text style={styles.title}>Complemento do Endereço</Text>
              <Controller
                control={control}
                name="address_complement"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_complement && 1,
                        borderColor: errors.address_complement && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Casa, apartamento nº?, bloco nº?"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.address_complement}
                  />
                )}
              />
              {errors.address_complement && (
                <Text style={styles.labelError}>
                  {errors.address_complement?.message}
                </Text>
              )}

              <Text style={styles.title}>Bairro do seu Endereço</Text>
              <Controller
                control={control}
                name="address_district"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.address_district && 1,
                        borderColor: errors.address_district && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.address_district}
                  />
                )}
              />
              {errors.address_district && (
                <Text style={styles.labelError}>
                  {errors.address_district?.message}
                </Text>
              )}

              <Text style={styles.title}>Cidade onde você reside</Text>
              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.city && 1,
                        borderColor: errors.city && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.city}
                  />
                )}
              />
              {errors.city && (
                <Text style={styles.labelError}>{errors.city?.message}</Text>
              )}

              <Text style={styles.title}>Estado onde você reside - UF</Text>
              <Controller
                control={control}
                name="city_state"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderWidth: errors.city_state && 1,
                        borderColor: errors.city_state && "#ff375b",
                      },
                    ]}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Informe aqui"
                    placeholderTextColor={"#999"}
                    Icon="lock"
                    keyboardType="default"
                    error={errors.city_state}
                  />
                )}
              />
              {errors.city_state && (
                <Text style={styles.labelError}>
                  {errors.city_state?.message}
                </Text>
              )}
                < ModalPolicies />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(handleSignIn)}
              >
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </ScrollView>
          
          </View>
        </Animatable.View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", //"#38a69d",
  },
  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
  },
  message: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    borderBottomWidth: 1,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    
  },
  containerForm: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingStart: "5%",
    paddingEnd: "5%",
  },
  button: {
    backgroundColor: "black",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },
  registerText: {
    color: "#a1a1a1",
  },
  labelError: {
    alignSelf: "flex-start",
    color: "#ff375b",
    marginTop: 4,
  },
  policies: {
    flex: 1,
 
  }
});

*/