import React, { useState } from 'react';
import { View, Alert, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native';
import Botton from '../components/botton';

export default () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const navigation = useNavigation(); // Adicionando o hook useNavigation

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

    // Navegar para a tela "Home" após o cadastro
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* Seu código aqui */}
      <Botton
        textoBotao={"Cadastrar"}
        funcao={() => {
          showConfirmationAlert();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputLogin: {
    height: 60,
    width: 250,
    fontSize: 20,
    margin: 20,
    textAlign: 'center',
    borderWidth: 0.5,
    borderRadius: 20,
  },
});
