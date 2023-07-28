import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Info(props) {
    const [propriedadeUser, setPropriedadeUser] = useState([])
    const [produtores, setProdutores] = useState([])

    useEffect(() => {
        api.get(`vinculosPropriedade/${props.route.params.idPropriedade}`)
            .then(res => setPropriedadeUser(res.data))
            .catch(err => console.log(err))
        api.get(`produtores/`)
            .then(res => setProdutores(res.data.produtores))
            .catch(err => console.log(err))
    }, [])

    const produtoresFiltrados = produtores.filter(produtor =>
        propriedadeUser.some(propriedade => propriedade.idProdutor === produtor.idProdutor)
    );

    return (
        <View style={styles.container}>
            <View style={[styles.containerInfo,
            props.route.params.liberado === 0 ? { borderLeftColor: '#FF0000' } :
                props.route.params.liberado === 1 ? { borderLeftColor: '#43AD4B' } : { borderLeftColor: '#ed4a13' }]}>
                <Text style={styles.title}>{props.route.params.nomePropriedade}</Text>
                <Text style={styles.subtitle}>Numero do cadastro ambiental rual</Text>
                <Text style={styles.legend}>{props.route.params.numeroCar}</Text>
                <Text style={styles.subtitle}>Produtores vinculados</Text>
                {
                    produtoresFiltrados.map(p => {
                        return <Text key={p.idProdutor} style={styles.legend}>{p.nomeProdutor ? p.nomeProdutor : 'Nome não consta'}: {p.registroIndividual}</Text>
                    })
                }
                <Text style={styles.subtitle}>Cidade/UF</Text>
                <Text style={styles.legend}>{props.route.params.municipio}/{props.route.params.uf}</Text>
                <Text style={styles.subtitle}>Resultado</Text>
                <Text style={styles.legend}>{
                    props.route.params.liberado === 0 ? 'Bloqueado' :
                        props.route.params.liberado === 1 ? 'Liberado' : 'Alerta'}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInfo: {
        borderLeftWidth: 8,
        alignItems: 'flex-start',
        width: Dimensions.get('window').width / 1.2,
        height: Dimensions.get('window').height / 1.2,
        backgroundColor: '#144369',
        borderRadius: 20,
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20
    },
    subtitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10
    },
    legend: {
        fontSize: 16
    }

})