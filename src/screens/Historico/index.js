import { View, Text, StyleSheet, FlatList, Button, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Cards from '../../components/Cards';
import { useIsFocused } from '@react-navigation/native';
import Icon  from 'react-native-vector-icons/Feather';

export default function Historico(props) {
    const [historico, setHistorico] = useState([])
    const [refreshing, setRefreshing] = useState(false)

    const loadHistorico = () => {
        setTimeout(async () => {
            try {
                const data = await AsyncStorage.getItem('historico');
                if (data) {
                    setHistorico(JSON.parse(data));
                    setRefreshing(false);
                }
            } catch (error) {
                console.error('Erro ao carregar o histórico:', error);
            }
        }, 1000);
    };

    useEffect(() => {
        loadHistorico()
    }, [])

    const handleRefresh = () => {
        setRefreshing(true);
        loadHistorico();
    };



    const renderItens = ({ item, index }) => {
        return (
            <View style={styles.container}>
                <View key={index} style={styles.Cards}>
                    {
                        item.map(item => (
                            <View key={item.idPropriedade} style={styles.CardsInside}>
                                <Text style={styles.CardsTitle}>{item.nomePropriedade ? item.nomePropriedade : 'Nome não encontrado'}</Text>
                                <Text style={styles.CardsSubTitle}>{item.numeroCar ? item.numeroCar : '---'}</Text>
                                <Text
                                    style={styles.titleCidade}
                                >
                                    {`${item.municipio ? item.municipio : 'Não identificado'} - ${item.uf ? item.uf : 'Não identificado'}` ?
                                        `${item.municipio ? item.municipio : 'Não identificado'} - ${item.uf ? item.uf : 'Não identificado'}` :
                                        'Não identificado'}
                                </Text>
                                <View style={[styles.status, item.liberado === 0 ? { backgroundColor: '#FF0000' } : item.liberado === 1 ? { backgroundColor: '#43AD4B' } : { backgroundColor: '#ed4a13' }]}>
                                    <Text>
                                        {item.liberado === 0 ? 'Bloqueado' :
                                            item.liberado === 1 ? 'Liberado' :
                                                item.liberado === 2 ? 'Alerta' : 'Indefinido '
                                        }
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => props.navigation.navigate('Info', { ...item })}
                                >
                                    <Text>Visualizar</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </View>
            </View>
        )
    }


    return (
        <View style={{flex: 1}}>
            <FlatList
                data={historico}
                renderItem={renderItens}
                keyExtractor={(item, index) => index}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        colors={['#9Bd35A', '#689F38']}
                        progressBackgroundColor="#ffffff"
                    />
                }
            />
            <TouchableOpacity 
                style={styles.buttonTrash} 
                activeOpacity={0.7} 
                onPress={() => this.setState({ showAddTask: true })}
                >
                <Icon name="trash-2" size={25} color={'#fff'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Cards: {
        marginTop: Platform.OS == 'ios' ? 30 : 40,
        height: Platform.OS == 'ios' ? 250 : 250,
        width: '90%',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#144369',
        borderLeftWidth: 8,

    },
    CardsInside: {
        alignItems: 'center',
        padding: 10
    },
    CardsTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 10
    },
    CardsSubTitle: {
        fontSize: 14,
        marginBottom: 10
    },
    titleCidade: {
        fontSize: 16,
        marginBottom: 10
    },
    status: {
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        width: 90,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#43AD4B',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        height: 40,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTrash: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#144369',
        justifyContent: 'center',
        alignItems: 'center',
    }
})