import React, {useState, useEffect} from 'react';
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
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
function ListRazas() {
  const [razas, setRazas] = useState([]);
  const [razasFilter, setRazasFilter] = useState([]);
  const [load, setLoad] = useState(true);
  const navigation = useNavigation();
  const [text, onChangeText] = React.useState('');

  const getRazas = async () => {
    try {
      const response = await fetch('https://dog.ceo/api/breeds/list/all');
      const json = await response.json();
      var names = Object.keys(json?.message);
      for (let index = 0; index < names.length; index++) {
        const element = names[index];
        const imageResp = await fetch(
          `https://dog.ceo/api/breed/${element}/images/random`,
        );
        const image = await imageResp.json();
        setRazas(oldArray => [
          ...oldArray,
          {
            name: element,
            subrazas: json.message[element],
            image: image.message,
          },
        ]);
        setRazasFilter(oldArray => [
          ...oldArray,
          {
            name: element,
            subrazas: json.message[element],
            image: image.message,
          },
        ]);
      }
      setLoad(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onFilter = () => {
    console.log('e', text);
    if (text == '') {
      setRazasFilter(razas);
    } else {
      let element = razas.filter(function (el) {
        let name = el.name.toLowerCase();
        return name.indexOf(text) > -1;
      });
      setRazasFilter(element);
    }
  };

  useEffect(() => {
    onFilter();
  }, [text]);

  useEffect(() => {
    getRazas();
  }, []);

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
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {load
          ? null
          : razasFilter.map((raza: any, i: number) => (
              <TouchableOpacity
                key={i}
                style={styles.razas}
                onPress={() => navigation.navigate('Detail', {raza})}>
                {raza.image ? (
                  <Image source={{uri: raza.image}} style={styles.image} />
                ) : null}
                <View style={styles.letterSpace}>
                  <Text style={styles.title}>{raza.name}</Text>
                  <Text style={styles.title}>{raza.subrazas.length}</Text>
                </View>
              </TouchableOpacity>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  title: {
    fontWeight: '400',
    fontSize: 18,
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
    height: 100,
    width: 100,
    marginHorizontal: 25,
    marginVertical: 10,
  },
  letterSpace: {
    width: width,
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ListRazas;
