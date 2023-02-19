import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';


export function Welcome() {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <Animatable.Image
                    animation="flipInY"
                    delay={1200}
                    source={require('../../assets/logo_test.png')}
                    style={{ width: '130%', height: '130%' }}
                    resizeMode="contain"
                />
            </View>
            <Animatable.View animation="fadeInUp" delay={700} style={styles.containerForm}>
                <Text style={styles.title}>Desafio Técnico </Text>
                <Text style={styles.text}>Faça Login para começar</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#014987',    //'black', //'#38a69d',
    },
    containerLogo: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerForm: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 12,
        color: '#004987',
        textAlign: 'center',

    },
    text: {
        color: '#a1a1a1',
        marginTop: 10
    },
    button: {
        position: 'absolute',
        backgroundColor: '#014987', //black',//'#38a69d',
        borderRadius: 50,
        paddingVertical: 10,
        width: '60%',
        alignSelf: 'center',
        bottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }

});
