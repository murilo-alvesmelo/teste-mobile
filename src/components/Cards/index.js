import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

export default function Cards(props) {
    return (
        <View style={styles.container}>
            <View style={styles.Cards}>
                <View style={styles.CardsInside}>
                    <Text style={styles.CardsTitle}>{props.nomePropriedade ? props.nomePropriedade : 'Nome não encontrado'}</Text>
                    <Text style={styles.CardsSubTitle}>{props.numeroCar ? props.numeroCar : '---'}</Text>
                    <Text 
                        style={styles.titleCidade}
                    >
                        {`${props.municipio ? props.municipio : 'Não identificado'} - ${props.uf ? props.uf : 'Não identificado'}` ?
                         `${props.municipio ? props.municipio : 'Não identificado'} - ${props.uf ? props.uf : 'Não identificado'}` : 
                         'Não identificado'}
                    </Text>
                    <View style={[styles.status, props.liberado === 0 ? {backgroundColor: '#FF0000'} : props.liberado === 1 ? {backgroundColor: '#43AD4B'} : {backgroundColor: '#ed4a13'}]}>
                        <Text>
                            {props.liberado  === 0 ? 'Bloqueado' :
                                props.liberado === 1 ? 'Liberado' :
                                props.liberado === 2 ? 'Alerta' : 'Indefinido '
                            }
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => props.navigation.navigate('Info', {...props})}
                    >
                        <Text>Visualizar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
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
    }
})