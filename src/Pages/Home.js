import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Modal, Button } from 'react-native';
import Pessoa from '../Components/Pessoas';
import Stories from '../Components/Stories';

export default function Home() {
  const [pessoa, setPessoa] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState(null);

  async function getPessoa() {    
    await fetch('http://10.139.75.42:5251/api/Pessoa/GetAllPessoa', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        }
      })
      .then( res => res.json() )
      .then( json => setPessoa( json ))      
      .catch( err => console.log( err ) );
  }

  useEffect(() => {
    getPessoa();
  }, []);

  const openModal = (pessoa) => {
    setSelectedPessoa(pessoa);
    setModalVisible(true);
  }

  const closeModal = () => {
    setSelectedPessoa(null);
    setModalVisible(false);
  }

  return (
    <View style={css.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        pessoa.length > 0 ? (
          <>
            <FlatList
              data={pessoa}
              renderItem={({ item }) => (
                <Pessoa
                  onPress={() => openModal(item)}
                  nome={item.pessoaNome}
                  roupa={item.pessoaRoupa}
                  cor={item.pessoaCor}
                  sexo={item.pessoaSexo}
                  observaçao={item.pessoaObservacao}
                  local={item.pessoaLocalDesaparecimento}
                  foto={item.pessoaFoto}
                  dtdesaparecimento={item.pessoaDtDesaparecimento}
                  dtencontro={item.pessoaDtEncontro}
                  status={item.pessoaStatus}
                />
              )}
              keyExtractor={(item) => item.pessoaId}
              contentContainerStyle={css.listContainer}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={css.modalContainer}>
                <View style={css.modalContent}>
                  {selectedPessoa && (
                    <>
                      <Text>{selectedPessoa.pessoaNome}</Text>
                      {/* Adicione outras informações sobre a pessoa aqui */}
                      <Button title="Fechar" onPress={closeModal} />
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <Text style={css.text}>Nenhuma pessoa encontrada.</Text>
        )
      )}
    </View>
  )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  text: {
    color: "#000",
    fontSize: 18,
    textAlign: "center",
  },
  listContainer: {
    paddingBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#f22',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
});