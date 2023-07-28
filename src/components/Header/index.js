import { View, StyleSheet, TextInput, TouchableOpacity, Text, Keyboard} from 'react-native'
import  Icon  from "react-native-vector-icons/Feather";

export default function Header(props){
    return(
        <View style={styles.container}>
            <View style={styles.containerFind}>
                <Text style={styles.headerText}>Encontre pelo SICAR</Text>
                <View style={styles.inputIcon}>
                    <TextInput
                        style={styles.input}
                        value={props.sicar}
                        onChangeText={props.isSicar}
                        />
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={() => (props.isSearch(props.sicar), Keyboard.dismiss())}
                        >
                        <Icon name="search" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.icon}
                        onPress={props.isClear}
                        >
                        <Icon name="trash" size={30}/>
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
    containerFind: {
        marginTop: Platform.OS == 'ios' ? 20 : 20,
        height: 150,
        width: '90%',
        borderWidth: 2,
        borderRadius: 20,
        backgroundColor: '#144369',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText :{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20
    },
    inputIcon: {
        flexDirection: "row",
        alignItems: 'center',
    },
    input: {
        textAlign: 'center',
        marginTop: 10,
        height: 40,
        width: 150,
        borderWidth: 1,
        borderRadius: 10,
        
    },
    icon: {
        flexDirection: 'row',
        marginHorizontal: 5, 
        marginTop: 5
    },
})