import React, {useState} from 'react';
import { Button, FlatList, Text, TextInput, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


function Item(props) { 
  return (
    <View style={{flex: 1, 
                backgroundColor: "lightyellow",
                borderColor: "lightgreen",
                borderWidth: 3,
                marginHorizontal: 10,
                marginVertical: 5,
                paddingHorizontal: 20,
                padding: 5,
                justifyContent: "space-between",
                flexDirection: "row"}}>
      <View style={{flex: 1}}>
        <Text style={{fontWeight: "bold", 
                      fontSize: 18, 
                      color: "black"}}>{"(" + props.item.id + ") " + props.item.fabricante}</Text>
        <Text style={{fontWeight: "bold", 
                      fontSize: 14, 
                      color: "gray"}}>{props.item.modelo}</Text>
        <Text style={{fontWeight: "bold", 
                      fontSize: 14, 
                      color: "gray"}}>{props.item.preco}</Text>
      </View>
      <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
        <Icon name="pencil-box-outline" size={24}
        onPress={
          () => {
            // alert("Apagar: " + props.item.id);
            props.onEditar( props.item.id );
          }
        }/>
        <Icon name="delete" size={24} onPress={
          () => {
            // alert("Apagar: " + props.item.id);
            props.onApagar( props.item.id );
          }
        }/>
      </View>
    </View>
  );
}


export default function App() {
  const [fabricante, setFabricante] = useState("");
  const [modelo, setModelo] = useState("");
  const [preco, setPreco] = useState("");
  const [id, setId] = useState(null);
  const [counter, setCounter] = useState(1);

  const [lista, setLista] = useState( [] );

  const nomeBotao = id === null ? "Cadastrar" : "Salvar"

  function apagar( id ) { 
    const tempLista = [...lista];
    for (let i = 0; i < tempLista.length; i++) { 
      const o = tempLista[i];
      if (o.id === id) { 
        tempLista.splice(i, 1);
        setLista(tempLista);
        break;
      }
    }
  }

  function editar( id ) { 
    const tempLista = [...lista];
    for (let i = 0; i < tempLista.length; i++) { 
      const o = tempLista[i];
      if (o.id === id) {
        setId(o.id); 
        setNome(o.nome);
        setTelefone(o.telefone);
        setEmail(o.email);
      }
    }
  }

  function salvar() { 
    if (id === null) {
      setLista([...lista, {id: counter, fabricante, modelo, preco} ]);
      setCounter(counter + 1);
      setFabricante("");
      setModelo("");
      setPreco("")
      setId(null);
    } else { 
      const tempLista = [...lista];
      for (let i = 0; i < tempLista.length; i++) { 
        const o = tempLista[i];
        if (o.id === id) { 
          const novoObj = {id, fabricante, modelo, preco};
          tempLista.splice(i, 1, novoObj);
          setLista(tempLista);
          setFabricante("");
          setModelo("");
          setPreco("")
          setId(null);
          break;
        }
      }
    }
  }

  return (
    <LinearGradient 
        start={{x: 0.5, y: 0}} 
        end={{x: 0.5, y: 1}} 
        colors={['yellow', 'red']}
        style={{flex: 1}}
        >
      <View style={{flex: 1}}>
        <Text style={{
          flex: 1,
          fontSize: 48,
          fontWeight: "bold",
          color: "#EEF",
          textShadowColor: "cyan",
          textShadowRadius: 10,
          textShadowOffset: {width: 1, height: 1},
          textAlign: "center"
        }}> Concessionária de Carros </Text>
        <View style={estilos.campo}>
          <Text style={estilos.label}>Id</Text>
          <Text style={estilos.label}>{id}</Text>
        </View>
        <View style={estilos.campo}>
          <Text style={estilos.label}>Fabricante</Text>
           <TextInput style={estilos.input}
            value={fabricante}  onChangeText={setFabricante}/>
        </View>
        <View style={estilos.campo}>
          <Text style={estilos.label}>Modelo</Text>
          <TextInput style={estilos.input} 
            value={modelo} onChangeText={setModelo}/>
        </View>
        <View style={estilos.campo}>
          <Text style={estilos.label}>Preço</Text>
          <TextInput style={estilos.input}
            value={preco} onChangeText={setPreco}/>
        </View>
        <Button title={nomeBotao} onPress={salvar}/>
      </View>

      <FlatList data={lista} renderItem={
        (properties)=><Item  {...properties} 
              onApagar={apagar} onEditar={editar}/>
      } 
                style={{flex: 1}}/>
    </LinearGradient>
  );
}

const estilos = StyleSheet.create({
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
  input: { 
    backgroundColor: "white", 
    borderColor: "lightblue", 
    borderWidth: 2,
    borderRadius: 20,
    width: 150
  }
})
