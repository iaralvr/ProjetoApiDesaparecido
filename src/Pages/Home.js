import React, { useEffect, useState,useContext } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import Pessoa from '../Components/Pessoas';
import { AuthContext } from '../Context/AuthContext';

export default function Home() {
  const [pessoa, setPessoa] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPessoa, setSelectedPessoa] = useState(null);
  const [newObservation, setNewObservation] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const {usuarioId } = useContext(AuthContext);

  useEffect(() => {
    getPessoa();
  }, []);

  async function getPessoa() {    
    try {
      const response = await fetch('http://10.139.75.42:5251/api/Pessoa/GetAllPessoa');
      const data = await response.json();
      setPessoa(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao obter pessoas:', error);
      setLoading(false);
    }
  }

  const openModal = (pessoa) => {
    setSelectedPessoa(pessoa);
    setModalVisible(true);
  }

  const closeModal = () => {
    setSelectedPessoa(null);
    setModalVisible(false);
  }

  const addObservation = () => {      
      if (selectedPessoa && newObservation) {    
        fetch('http://10.139.75.42:5251/api/Observacao/InsertObservacao', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            observacaoDescricao: newObservation,
            observacaoLocal: newLocation,
            observacaoData: "2024-06-19T14:55:38.796Z",
            pessoaId:selectedPessoa.pessoaId,
            usuarioId: usuarioId
        })
      })
        .then(res => res.json())
        .then(json => {
           console.log(json)
        })
        .catch(err => console.log(err));
      setNewObservation('');
      setNewDate('');
      setNewLocation('');
    }
  }

  return (
    <View style={styles.container}>
         <Text style={styles.titulo}>Lista de Pessoas Desaparecidas</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        pessoa.length > 0 ? (
          <>

            <FlatList
              data={pessoa}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => openModal(item)} style={styles.card}>
                  <Image source={{ uri: item.pessoaFoto }} style={styles.avatar} />
                  <View style={styles.cardText}>
                    <Text style={styles.nome}>{item.pessoaNome}</Text>
                    <Text style={styles.info}>{item.pessoaRoupa}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.pessoaId.toString()}
              contentContainerStyle={styles.listContainer}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={closeModal}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  {selectedPessoa && (
                    <>
                      <Image source={{ uri: selectedPessoa.pessoaFoto }} style={styles.modalImage} />
                      <Text style={styles.modalText}>{selectedPessoa.pessoaNome}</Text>
                      <Text style={styles.modalText}>{selectedPessoa.pessoaCor}</Text>
                      <Text style={styles.modalText}>{selectedPessoa.pessoaObservacao}</Text>
                      <Text style={styles.modalText}>{selectedPessoa.pessoaLocalDesaparecimento}</Text>
                      <Text style={styles.modalText}>{selectedPessoa.pessoaDtDesaparecimento}</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Nova observação"
                        value={newObservation}
                        onChangeText={setNewObservation}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Nova data"
                        value={newDate}
                        onChangeText={setNewDate}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Novo local"
                        value={newLocation}
                        onChangeText={setNewLocation}
                      />
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={addObservation}
                      >
                        <Text style={styles.addButtonText}>Adicionar Observação</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeModal}
                      >
                        <Text style={styles.closeButtonText}>Fechar</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </Modal>
          </>
        ) : (
          <Text style={styles.text}>Nenhuma pessoa encontrada.</Text>
        )
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  card: {
    backgroundColor: "#FFF",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,  
    width: '100%',  
  },
  avatar: {
    width: 60,  
    height: 60,  
    borderRadius: 30,  
    marginRight: 10,
  },
  cardText: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#8E7BE0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
  },
});