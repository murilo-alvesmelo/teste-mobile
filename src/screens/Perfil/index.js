import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/AntDesign'

export default function Perfil(props) {

    const [user, setUser] = useState('')

    const loadUser = async () => {
        try {
            const data = await AsyncStorage.getItem('user');
            if (data) {
                setUser(JSON.parse(data));
            }
        } catch (error) {
            console.error('Erro ao carregar o histórico:', error);
        }
    }

    const logout = async () => {
        await AsyncStorage.removeItem('user')
        props.navigation.navigate('Login')
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.containerPerfil}>
                <Avatar
                    size={80}
                    rounded
                    icon={{ name: "user", type: "font-awesome" }}
                    containerStyle={{ backgroundColor: "#144369" }}
                />
                <Text style={styles.username}>{user.nomeUsuario}</Text>
                <View style={styles.containerDescri}>
                    <Text style={styles.descricao}>Cargo: {user.descricaoCargo ? user.descricaoCargo : 'Sem descrição'}</Text>
                    <Text style={styles.descricao}>Email: {user.emailUsuario}</Text>
                    <Text style={styles.descricao}>Industria: {user.industria}</Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={logout}
                >
                    <Icon name='logout' size={40} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    containerPerfil: {
        margin: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerDescri: {
        alignItems: 'flex-start'
    },
    username: {
        fontSize: 24,
        marginTop: 20
    },
    descricao: {
        fontSize: 16,
        marginTop: 15
    },
    button: {
        marginTop: 100,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#144369',
        justifyContent: 'center',
        alignItems: 'center',
    }
})