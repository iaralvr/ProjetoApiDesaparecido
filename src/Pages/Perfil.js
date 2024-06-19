import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function Perfil() {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.name}>ONG Encontre-Me</Text>
        <Text style={styles.title}>Fale com a gente </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Email:</Text>
          <Text style={styles.info}> contato@encontre-me.org</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Telefone:</Text>
          <Text style={styles.info}>(11) 1234-5678</Text>
        </View>
        <Text style={styles.description}>
        A Encontre-Me é uma organização não-governamental dedicada a ajudar famílias a encontrar seus entes queridos desaparecidos. Fundada em 2010, nossa missão é proporcionar esperança e suporte através de uma rede de recursos e voluntários comprometidos em reunir famílias separadas.
        </Text>
        
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#1E1E1E',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    color: '#CCC',
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#878286',
    marginRight: 10,
  },
  info: {
    fontSize: 16,
    color: '#FFF',
  },
  description: {
    fontSize: 16,
    color: '#AAA',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },

  editButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
