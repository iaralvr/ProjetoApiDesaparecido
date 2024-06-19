import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function NovaObservacao() {
    const [observacaoDescricao, setDescricao] = useState("");
    const [observacaoLocal, setLocal] = useState("");
    const [observacaoData, setData] = useState("");
    const [sucesso, setSucesso] = useState(false);

    async function SalvarObservacao() {

        if (!observacaoDescricao || !observacaoLocal || !observacaoData) {
            Alert.alert('Erro', 'Confira todos os campos e tente novamente.');
            return;
        }

        await fetch('http://10.139.75.42:5251/api/Observacoes/CreateObservacao', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                observacaoDescricao: observacaoDescricao,
                observacaoLocal: observacaoLocal,
                observacaoData: observacaoData,
            })
        })

            .then(res => res.json())
            .then(json => {
                setSucesso(true);
                setDescricao("");
                setLocal("");
                setData("");
            })
            .catch(err => console.log(err));
    }

    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Descrição da observação"
                style={styles.input}
                value={observacaoDescricao}
                onChangeText={(digitado) => setDescricao(digitado)}
                placeholderTextColor="black"
            />
            <TextInput
                placeholder="Local da observação"
                style={styles.input}
                value={observacaoLocal}
                onChangeText={(digitado) => setLocal(digitado)}
                placeholderTextColor="black"
            />
            <TextInput
                placeholder="Data da observação"
                style={styles.input}
                value={observacaoData}
                onChangeText={(digitado) => setData(digitado)}
                placeholderTextColor="black"
            />

            <TouchableOpacity onPress={SalvarObservacao} style={styles.button}>
                <Text style={styles.btnText}>Salvar</Text>
            </TouchableOpacity>

            {sucesso && (
                <View>
                    <Text style={styles.sucessoTxt}>Observação salva com sucesso!</Text>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 2.5,
        borderColor: 'rgba(203, 108, 230, 0.24)',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        fontWeight: '400',
    },
    button: {
        width: '90%',
        height: 50,
        backgroundColor: '#FFC516',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    sucessoTxt: {
        marginTop: 15,
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
    },
});