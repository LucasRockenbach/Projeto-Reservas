import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import Botton from '../components/botton';
import { useNavigation } from '@react-navigation/native';



export default props = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [reservaParam, setReservaParam] = useState({});


  const doPost = async () => {
    //validações 
    

    URL = 'https://reservasembrapa-dev-bggt.3.us-1.fl0.io/api/reserva'
    const dadosParaEnviar = {
        idReseva: reservaParam.idReseva,
        nomeUsuario: reservaParam.nomeUsuario,
        nomeSala: reservaParam.nomeSala,
        Descricao: reservaParam.Descricao,
        DataInicio: reservaParam.DataInicio,
        DataFim: reservaParam.DataFim,
    }

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosParaEnviar)
    };

    try {
      const response = await fetch(URL, options);

      if (response.ok) {
        const dadosRecebidos = await response.json();
        console.log('Resposta do servidor: ', dadosRecebidos);
        // Navegue para a tela desejada após a conclusão bem-sucedida do POST 
      } else {
        throw new Error('A solicitação via POST falhou!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigation = useNavigation();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || selectedDate;
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || startTime;
    setShowStartTimePicker(false);
    setStartTime(currentDate);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentDate = selectedTime || endTime;
    setShowEndTimePicker(false);
    setEndTime(currentDate);
  };

  const formatDate = (date) => {
    return format(date, 'HH:mm');
  };

  const showConfirmationAlert = () => {
    const confirmationMessage = `Deseja confirmar a reserva \nHorário de ${format(startTime, 'HH:mm')} até ${format(endTime, 'HH:mm')}?`;
    Alert.alert(
      'Confirmação',
      confirmationMessage,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: generateReservation },
      ],
      { cancelable: false }
    );
  };


  const generateReservation = () => {
    const formattedDate = format(selectedDate, 'dd/MM/yyyy');
    const formattedStartTime = format(startTime, 'HH:mm');
    const formattedEndTime = format(endTime, 'HH:mm');

    const data = {

      date: formattedDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
    };

    const jsonData = JSON.stringify(data, null, 2);
    console.log('Dados enviados:', jsonData);
    Alert.alert('Reserva Confirmada', 'Horário reservado com sucesso!');

    // Navegar para a tela "Home" após o cadastro
    navigation.navigate('Home');
  
  };


  return (
    <>
      <View style={style.HeaderContainer}>
        <Text style={style.HeaderText}>Cadastrar Reservas</Text>
      </View>
      <View style={style.container} >
      <Text style={style.label}>Reservista</Text>
        <TextInput
          placeholder='Insira o reservista'
          style={style.inputLogin}
          value={reservaParam.nomeUsuario}
          onChangeText={(nomeUsuario) => setReservaParam({ ...reservaParam, nomeUsuario })}
          />
        <Text style={style.label}>Descrição</Text>
        <TextInput
          placeholder='Insira a descrição'
          style={style.inputLogin}
          value={reservaParam.Descricao}
          onChangeText={(Descricao) => setReservaParam({ ...reservaParam, Descricao })}
          />
        <Text style={style.label}>Sala</Text>
        <TextInput
          placeholder='Insira a Sala'
          style={style.inputLogin}
          value={reservaParam.nomeSala}
          onChangeText={(nomeSala) => setReservaParam({ ...reservaParam, nomeSala })}
          
        />

        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            value={selectedDate}
            mode="date"
            is24Hour={true}
            display="default"
            minimumDate={new Date()}
            onChange={handleDateChange}
            
          />
        )}
        <Text style={style.label}>Data de Inicio</Text>
        <TextInput onPressIn={() => setShowStartTimePicker(true)}
          placeholder={`${formatDate(startTime)}`}
          style={style.inputLogin}
          value={reservaParam.DataInicio}
          onChangeText={(DataInicio) => setReservaParam({ ...reservaParam, DataInicio })}
        />
        {showStartTimePicker && (
          <DateTimePicker
            testID="startTimePicker"
            value={startTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleStartTimeChange}
          />
        )}
        <Text style={style.label}>Data Final</Text>
        <TextInput onPressIn={() => setShowEndTimePicker(true)}
          placeholder={` ${formatDate(endTime)}`}
          style={style.inputLogin}
          value={reservaParam.DataFim}
          onChangeText={(DataFim) => setReservaParam({ ...reservaParam, DataFim })}
        />
        {showEndTimePicker && (
          <DateTimePicker
            testID="endTimePicker"
            value={endTime}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={handleEndTimeChange}
          />
        )}
        <Botton
        textoBotao={"Cadastrar"}
        funcao={() => {
          showConfirmationAlert(), doPost()
        }} />
      </View>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    top: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  infoText: {
    marginVertical: 10,
    fontSize: 16,
  },
  inputLogin: {
    height: 50,
    width: 300,
    fontSize: 16,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    // Estilos adicionais para relevo e sombra
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
  },
  shadowOpacity: 5,
  shadowRadius: 5,
  elevation: 5, // Adiciona a elevação para a sombra no Android
},
  HeaderContainer: {
    width: 395,
    height: 130,
    backgroundColor: "#28364D",
    borderRadius: 10,
  },
    HeaderText: {
      width: 266,
      height: 39,
      color: '#FAFAFA',
      fontStyle: 'normal',
      fontSize: 25,
      fontWeight: '700',
      marginTop: 60,
      marginRight: 50,
      marginLeft: 55,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
});