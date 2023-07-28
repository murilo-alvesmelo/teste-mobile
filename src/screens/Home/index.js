import { View, Text, StyleSheet, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react'
import Cards from '../../components/Cards'
import api from '../../services/api'
import Header from '../../components/Header'

export default function Home(props) {
    const [propriedades, setPropriedades] = useState([])
    const [sicar, setSicar] = useState('')
    const [historico, setHistorico] = useState([])

    const pesquisarPropriedade = async () => {
        await api.get(`findNumeroCar/${sicar}`)
            .then(res => {
                setPropriedades(res.data)
                storeData([...historico, res.data])
                setHistorico([...historico, res.data])
            })
            .catch(err => setPropriedades(null))
    }

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('historico', jsonValue);
        } catch (e) {
            console.log(e)
        }
    };

    const loadHistorico = async () => {
        try {
            const data = await AsyncStorage.getItem('historico');
            if (data) {
                setHistorico(JSON.parse(data));
            }
        } catch (error) {
            console.error('Erro ao carregar o histórico:', error);
        }
    };

    useState(() => {
        loadHistorico()
    }, [])

    function clear() {
        setSicar('')
        setPropriedades(null)
    }

    return (
        <>
            <Header
                sicar={sicar}
                isSicar={valor => setSicar(valor)}
                isSearch={valor => pesquisarPropriedade(valor)}
                isClear={clear}
            />
            {
                propriedades ?
                    <FlatList
                        data={propriedades}
                        renderItem={({ item }) => <Cards {...item} {...props} />}
                        keyExtractor={item => item.idPropriedade}
                    /> :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>Digite o numero CAR</Text>
                    </View>
            }
        </>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})