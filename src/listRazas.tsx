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
import huella from './img/huella.png'

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
        setRazas(oldArray => [
          ...oldArray,
          {
            name: element,
            subrazas: json.message[element],
          },
        ]);
        setRazasFilter(oldArray => [
          ...oldArray,
          {
            name: element,
            subrazas: json.message[element],
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
        return name.indexOf(text.toLowerCase()) > -1;
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
      <ScrollView contentInsetAdjustmentBehavior="automatic"
      style={{marginBottom: 100}}>
        {load
          ? null
          : razasFilter.map((raza: any, i: number) => (
              <TouchableOpacity
                key={i}
                style={styles.razas}
                onPress={raza.subrazas.length > 0 ? () => navigation.navigate('Subraza', {name: raza.name, raza: raza.subrazas}) : () => {}}>
                <View style={styles.letterSpace}>
                  <View style={styles.row}>
                    <Image source={huella} style={styles.image} />
                    <Text style={styles.title}> {raza.name.toUpperCase()}</Text>
                  </View>
                  <Text style={styles.subtitle}>{raza.subrazas.length > 0 ? 'Ver subrazas ->' : ''}</Text>
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
  title: {
    fontWeight: '400',
    fontSize: 18,
    color: '#333',
  },
  subtitle: {
    fontWeight: '400',
    fontSize: 18,
    color: '#2196F3'
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
