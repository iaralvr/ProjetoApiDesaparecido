import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { AuthContext } from '../Context/AuthContext';
import Cadastro from '../Components/Cadastro'

export default function Login({ navigation }) {
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const {Login, error } = useContext(AuthContext);
    const [cadastrar, setCadastrar] = useState(false);

    function RealizaLogin() {
        Login(email, senha);
    }

    if(cadastrar) {
        return <Cadastro handle={setCadastrar}/>
    }

    return (
        <ScrollView contentContainerStyle={css.container}>
            <Image 
                source={require("../../assets/logo.png")} 
                style={css.logo} 
            />
            <TextInput
                inputMode="email"
                placeholder="Email"
                style={css.input}
                value={email}
                onChangeText={(digitado) => setEmail(digitado)}
                placeholderTextColor="white"
            />
            <TextInput
                inputMode="text"
                placeholder="Password"
                secureTextEntry={true}
                style={css.input}
                value={senha}
                onChangeText={(digitado) => setSenha(digitado)}
                placeholderTextColor="white"
            />
            <TouchableOpacity style={css.btnLogin} onPress={RealizaLogin}>
                <Text style={css.btnLoginText}>Entrar</Text>
            </TouchableOpacity>
            {error &&
                <View style={css.error}>
                    <Text style={css.errorText}>Revise os campos. Tente novamente!</Text>
                </View>
            }
            <TouchableOpacity onPress={() => setCadastrar(true)}>
                <Text style={css.signUpText}>Fazer cadastro</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        backgroundColor: "#ffff"
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain"
    },
    input: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "#262626",
        color: "white"
    },
    btnLogin: {
        width: "90%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 30,
        backgroundColor: "#878286"
    },
    btnLoginText: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    error: {
        width: "100%",
        height: 50,
        marginTop: 30
    },
    errorText: {
        color: "white",
        textAlign: "center"
    },
    signUpText: {
        marginTop: 20,
        color: "#878286",
        fontWeight: "bold",
        fontSize: 16
    }
});
