import React from 'react';
import { StyleSheet, View, Modal, Text, Pressable } from 'react-native';
import { Entypo } from '@expo/vector-icons';


interface ListItemProps {
    el: {
        text: string;
        key: string;
        value: number;
        daily: boolean;
        isGood: boolean;
        timer: number; //min
    };
    deleteElement?: (key: string) => void;
}



const ListItem: React.FC<ListItemProps> = ({ el, deleteElement }) =>{
    const [confirmModalVisible, setConfirmModalVisible] = React.useState(false);
    
    const handleDelete = () => {
        setConfirmModalVisible(true);
    };

    const handleConfirmDelete = () => {
        deleteElement && deleteElement(el.key);
        setConfirmModalVisible(false);
    };

    const handleCancelDelete = () => {
        setConfirmModalVisible(false);
    };

        
    
    
    
    return (
        <Pressable style = {styles.box} onLongPress={() => (alert('Long'))}>
            
            <View style = {styles.item}>
                <View style = {el.daily ? styles.dailyColor : (el.isGood ? styles.good : styles.bad)}></View>
                <View style = {styles.info}>
                    <Text style={{fontSize: 24, fontWeight: "600"}}>{el.text}</Text>
                    <View style={styles.infoBottom}>
                        <Text style={{fontSize: 20, position: 'absolute'}}>{el.daily? '' : (el.isGood ? '+' : '-')}{el.value} pt</Text>
                        <Text style={[styles.timer, {display: el.daily ? 'flex' : 'none'}]}>У вас: 15 мин.</Text>
                    </View>
                </View>
                <Entypo name="cross" size={24} color="black" style={styles.cross}
                onPress={handleDelete} />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmModalVisible}
                onRequestClose={() => setConfirmModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            Уверены, что хотите удалить?
                        </Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={styles.modalButton}
                                onPress={handleConfirmDelete}
                            >
                                <Text style={styles.buttonText}>Да</Text>
                            </Pressable>
                            <Pressable
                                style={styles.modalButton}
                                onPress={handleCancelDelete}
                            >
                                <Text style={styles.buttonText}>Отмена</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>


        </Pressable>
    )
}

const styles = StyleSheet.create({
    box:{
        height: 80,
        width: 350,
        marginVertical: 10,
    },
    item:{
        marginLeft: 5,
        flexDirection: 'row',
        height: 75,
        width: 320,
        borderRadius: 5,
        backgroundColor: 'white',
        shadowColor: 'black',
        elevation: 10,
    },
    info:{
        width: '80%',
        position: 'absolute',
        left: 20,
        top: 5,
    },
    infoBottom:{
        flexDirection: 'row'
    },
    good:{
        backgroundColor: 'green',
        height: '100%',
        width: '3%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    bad:{
        backgroundColor: 'red',
        height: '100%',
        width: '3%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    dailyColor:{
        backgroundColor: 'purple',
        height: '100%',
        width: '3%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    timer:{
        fontSize: 16,
        position: 'absolute',
        top: 4, 
        right: -30,
    },
    cross:{
        position: 'absolute',
        right: 4
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    
});

export default ListItem;