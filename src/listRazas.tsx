import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useAPI} from './context/apiContext';
import {useNavigation} from '@react-navigation/native';
import huella from './img/huella.png';

const {width, height} = Dimensions.get('screen');
function ListRazas() {
  const {dog, dogFilter, load, favData} = useAPI();
  const [favorite, setFavorite] = useState('');
  const [razas, setRazas] = useState([]);
  const [razasFilter, setRazasFilter] = useState([]);
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');

  const getRazas = async () => {
    setRazas(dog);
    setRazasFilter(dogFilter);
  };

  const onFilter = () => {
    if (text == '') {
      setRazasFilter(razas);
    } else {
      let element = razas.filter(function (el) {
        let name = el.name.toLowerCase();
        return name.indexOf(text.toLowerCase()) > -1;
      });
      setRazasFilter(element);
    }
  };

  useEffect(() => {
    onFilter();
  }, [text]);

  useEffect(() => {
    setFavorite(favData.fav.favorite);
  }, [favData.fav]);

  useEffect(() => {
    getRazas();
  }, [load]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#FFF',
      }}>
      <StatusBar />
      <View style={styles.head}>
        <Text style={styles.highlight}>Razas</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      {favorite ? (
        <>
          <Text style={styles.modalText}>
            {favorite.name}
          </Text>
          <Image source={{uri: favorite?.img}} style={styles.imageFav} />
        </>
      ) : (
        <Text style={styles.modalText}>No existe perro favorito</Text>
      )}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{marginBottom: favorite ? height / 2.5: 100}}>
        {load
          ? null
          : razasFilter.map((raza: any, i: number) => (
              <TouchableOpacity
                key={i}
                style={styles.razas}
                onPress={
                  raza.subrazas.length > 0
                    ? () =>
                        navigation.navigate('Subraza', {
                          name: raza.name,
                          raza: raza.subrazas,
                        })
                    : () => {}
                }>
                <View style={styles.letterSpace}>
                  <View style={styles.row}>
                    <Image source={huella} style={styles.image} />
                    <Text style={styles.title}> {raza.name.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.subtitle}>
                    {raza.subrazas.length > 0 ? 'Ver subrazas ->' : ''}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'center',
    color: '#333',
  },
  imageFav: {
    width: width,
    height: height / 4,
    resizeMode: 'contain'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: '#2196F3',
    fontWeight: '600',
  },
  title: {
    fontWeight: '400',
    fontSize: 18,
    color: '#333',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 18,
    color: '#2196F3',
  },
  head: {
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  razas: {
    borderBottomWidth: 0.4,
    paddingVertical: 5,
    flexDirection: 'column',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  image: {
    height: 24,
    width: 24,
  },
  row: {
    flexDirection: 'row',
  },
  letterSpace: {
    width: width,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListRazas;
