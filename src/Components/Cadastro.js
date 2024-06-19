import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useContext, useState } from 'react';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../Context/AuthContext';


export default function Inserir({ handle }) {
    const [usuarioNome, setUsuarioNome] = useState("");
    const [usuarioTelefone, setUsuarioTelefone] = useState("");
    const [usuarioEmail, setUsuarioEmail] = useState("");
    const [usuarioSenha, setUsuarioSenha] = useState("");

    const {setCadastro, cadastro} = useContext(AuthContext);
   
    async function InsertUsuario() {
        await fetch('http://10.139.75.42:5251/api/Usuario/CreateUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset-UTF-8',
            },
            body: JSON.stringify({
                usuarioTelefone: usuarioTelefone,
                usuarioEmail: usuarioEmail,
                usuarioNome: usuarioNome,
                usuarioSenha: usuarioSenha
            })
        })
            .then((response) => response.json())
            .then(json => {
                setUsuarioTelefone('');
                setUsuarioEmail('');
                setUsuarioNome('');
                setUsuarioSenha('');
            })
            .catch(err => console.log(err));
    }

    return (
        <ScrollView contentContainerStyle={css.container}>
            <TouchableOpacity onPress={() => setCadastro(!cadastro)} >
                <MaterialCommunityIcons name="arrow-left" size={20} color={"#666"} marginTop={30} />
            </TouchableOpacity>
            <TextInput
                inputMode="text"
                placeholder='Nome'
                style={css.input}
                value={usuarioNome}
                onChangeText={(digitado) => setUsuarioNome(digitado)}
                placeholderTextColor='#B4B4B4'
            />
            <TextInput
                inputMode="text"
                placeholder='Telefone'
                style={css.input}
                value={usuarioTelefone}
                onChangeText={(digitado) => setUsuarioTelefone(digitado)}
                placeholderTextColor='#B4B4B4'
            />
            <TextInput
                inputMode="email"
                placeholder='E-mail'
                style={css.input}
                value={usuarioEmail}
                onChangeText={(digitado) => setUsuarioEmail(digitado)}
                placeholderTextColor='#B4B4B4'
            />
            <TextInput
                inputMode="text"
                placeholder='Senha'
                style={css.input}
                value={usuarioSenha}
                onChangeText={(digitado) => setUsuarioSenha(digitado)}
                placeholderTextColor='#B4B4B4'
            />
            <TouchableOpacity style={css.btnCad} onPress={InsertUsuario}>
                <Text style={css.btnCadText}>Cadastrar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={css.btnCad} onPress={() => handle(false)}>
                <Text style={css.btnCadText}>Voltar</Text>
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
        backgroundColor: "#F9F5F4"
    },
    logo: {
        width: "60%",
        height: "25%",
        resizeMode: "contain"
    },
    input: {
        width: "90%",
        height: 50,
        borderRadius: 10,
        marginBottom: 15,
        padding: 15,
        backgroundColor: "white",
        color: "#262626",
        borderWidth: 2,
        borderColor: "#DCDBDB",
    },
    btnCad: {
        width: "90%",
        height: 50,
        borderWidth: 2,
        borderColor: "#DCDBDB",
        borderRadius: 10,
        marginTop: 20,
        backgroundColor: "black"
    },
    btnCadText: {
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
        color: "black",
        textAlign: "center"
    }
});