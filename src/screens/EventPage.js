import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, Alert, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import NavBar from '../components/navBar';
import Botton from '../components/botton';




export default props = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [userParam, setUserParam] = useState({});


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
    return format(date, 'dd/MM/yyyy HH:mm');
  };

  const showConfirmationAlert = () => {
    const confirmationMessage = `Deseja confirmar a reserva do dia ${format(selectedDate, 'dd/MM/yyyy')}\nHorário de ${format(startTime, 'HH:mm')} até ${format(endTime, 'HH:mm')}?`;
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
  };


  return (


    <View style={styles.container}>

      <View >
      </View>
      <View style={styles.container} >
        <TextInput
          placeholder='Reservista'
          style={styles.inputLogin} />
        <TextInput
          placeholder='Descrição'
          style={styles.inputLogin} />
        <TextInput
          placeholder='Sala'
          style={styles.inputLogin}
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
        <TextInput onPressIn={() => setShowStartTimePicker(true)}
          placeholder= "horario inicio"
          style={styles.inputLogin}
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
        <TextInput onPressIn={() => setShowEndTimePicker(true)}
          placeholder='Hora Fim'
          style={styles.inputLogin}
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
        <Botton textoBotao={"Cadastrar"} funcao={
                ()=>{ navigation.navigate("Home");
                }
            } />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    height: 60,
    width: 250,
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 20
  },
});

