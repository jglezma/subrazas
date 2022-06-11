import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import huella from './img/huella.png'
const {width, height} = Dimensions.get('screen');

function DetailRaza(props: any) {
  const [subraza, setSubraza] = useState([]);
  const [selected, setSelected] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const razas = props.route.params;
  const getImage = async (name: string, e: any) => {
    for (let index = 0; index < e.length; index++) {
      const element = e[index];
      const imageResp = await fetch(
        `https://dog.ceo/api/breed/${name}/${element}/images/random`,
      );
      const image = await imageResp.json();
      setSubraza(oldArray => [
        ...oldArray,
        {
          name: element,
          img: image.message,
        },
      ]);
      console.log('element', {
        name: element,
        img: image.message,
      });
    }
    console.log('raza', subraza);
  };
  useEffect(() => {
    console.log('detail, ', razas.raza);
    getImage(razas.name, razas.raza);
  }, []);

  const showModal = async (e: any) => {
    setSelected(e);
    setModalVisible(true);
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFF',
      }}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {subraza.map((raza: any, i: number) => (
          <React.Fragment key={i}>
            <Image source={{uri: raza?.img}} style={styles.image} />
            <View style={styles.head}>
              <Text style={styles.title}>{raza?.name}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => showModal(raza)}>
                <Text style={styles.textStyle}>Ver Detalle</Text>
              </TouchableOpacity>
            </View>
          </React.Fragment>
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal ha sido cerrado.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{selected ? selected?.name.toUpperCase() : null}</Text>
            <Image source={{uri: selected?.img}} style={styles.image} />
            <View style={styles.head}>
              <TouchableOpacity
                  style={[styles.button, styles.buttonFav]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Guardar Favorito </Text>
                  <Image source={huella} style={styles.huella} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 18,
  },
  head: {
    borderBottomWidth: 0.5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: '#2196F3',
    fontWeight: '600',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 160,
    alignContent:'center',
  },
  huella: {
    height: 24,
    width: 24,
    
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    margin: 15,
  },
  buttonFav: {
    backgroundColor: '#FFD700',
    margin: 15,
    flexDirection:'row',
    alignItems:'center',
  },
  image: {
    width: width,
    height: height / 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
});

export default DetailRaza;
