import { View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import logo from '../../../assets/logo2.png'
import api from '../../services/api'

export default function Login({ navigation }) {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {
    const user = users.usuarios.find(user => user.emailUsuario === email)

    if (user) {
      if (user.senhaUsuario === password) {
        navigation.navigate('Home', { ...user })
        return true
      } else {
        Alert.alert('Senha incorreta')
        return false
      }
    } else {
      Alert.alert('Usuario não encontrado')
      return false
    }
  }

  useEffect(() => {
    api.get('usuarios')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <View style={style.container}>
          <View style={style.box}>
            <Image
              style={style.logo}
              source={logo}
            />
            <TextInput
              style={style.input}
              value={email}
              onChangeText={setEmail}
              placeholder='Digite o email'
              keyboardType='email-address'
            />
            <TextInput
              style={style.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholder='Digite a senha'
            />
            <TouchableOpacity style={style.button} onPress={login}>
              <Text style={style.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#144369'
  },
  input: {
    padding: 10,
    margin: 10,
    width: '90%',
    height: 50,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    backgroundColor: '#EEE'
  },
  logo: {
    width: '95%',
    height: 80,
    marginBottom: 100
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#43AD4B',
    marginTop: 20,
    width: 100,
    padding: 15,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 16,
  },
})