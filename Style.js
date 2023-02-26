import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    scrollView: {
        height: '100%',
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    inst: {
        height: 250,
        width: '90%',
        padding: 30,
        marginBottom: 20,
        marginTop: 20,
    },
    instText: {
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 20,
    },
    input: {
        height: 75,
        width: '90%',
        padding: 5,
        marginBottom: 20,
    },
    pName: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        fontSize: 25,
    },
    startGame: {
        backgroundColor: 'limegreen',
        width: '90%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 30,
        marginBottom: 20,
        marginTop: 40,
    },
    startText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    info: {
        width: '90%',
        paddingTop: 20,
        marginBottom: 20,
    },
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    simonBtn: {
        height: 150,
        width: 150,
        borderRadius: 20,
        margin: 10,
        borderColor: 'black',
        borderWidth: 4,
    },
    stats:{
        fontSize: 20,
        padding: 25,
    },
});
