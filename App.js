import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';

function Item(props){
  return(
    <View>
      <View>
        <Text>{props.item.fabricante}</Text>
        <Text>{props.item.modelo}</Text>
        <Text>{props.item.preco}</Text>
      </View>
    </View>
  )
  
}

export default function App() {

  const [id, setId] = useState(null);
  const [fabricante, setFabricante] = useState('');
  const [modelo, setModelo] = useState('');
  const [preco, setPreco] = useState('');
  const [counter, setCounter] = useState(1);

  const [lista, setLista] = useState([]);


  function salvar(){
    setLista([...lista, {id: counter, fabricante, modelo, preco}]);
    setCounter(counter + 1);
    setFabricante('');
    setModelo('');
    setPreco('0');
    setId(null)
  }

  return (
  <LinearGradient
    start={{x: 0.5, y: 0}} 
    end={{x: 0.5, y: 1}} 
    colors={['yellow', 'red']}
    style={{flex: 1}}
  >
    <View style={{flex:1}}>
      <Text
        style={{
          flex:1,
          marginTop: 15,
          fontSize: 40,
          fontWeight: 'bold',
          color: '#EEF',
          textShadowColor: 'cyan',
          textShadowRadius: 10,
          textShadowOffset: {width: 1, height: 1},
          textAlign: 'center'
        }}
      >Concessionária de Veículos</Text>
      <StatusBar style="auto" />
      <View style={styles.campo}>
        <Text style={styles.label}>Id: </Text>
        <Text style={styles.label}>____</Text>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Fabricante: </Text>
        <TextInput style={styles.input} value={fabricante} onChangeText={setFabricante}/>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Modelo: </Text>
        <TextInput style={styles.input} value={modelo} onChangeText={setModelo}/>
      </View>
      <View style={styles.campo}>
        <Text style={styles.label}>Preço: </Text>
        <TextInput style={styles.input} value={preco} onChangeText={setPreco}/>
      </View>
      <Button title='Cadastrar'onPress = {salvar}/>
    </View>
    <FlatList data={lista} renderItem={
      (properties)=><Item
          {...properties}
      />
    } style={{flex:2}}/>
  </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  campo: {
    flex: 1,
    justifyContent: "space-between", 
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 5
  },
  label: {
    fontSize: 18, 
    color: "white", 
    fontWeight: "bold"
  },
  input:{
    backgroundColor: "white", 
    borderColor: "lightblue", 
    borderWidth: 2,
    borderRadius: 20,
    width: 150
  }
});
