import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';

const EmailVerification = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [focusedInput, setFocusedInput] = useState(null);

  const navigation = useNavigation();

  const handleKeypadPress = value => {
    const nextEmptyIndex = code.findIndex(digit => digit === '');
    if (nextEmptyIndex !== -1) {
      const newCode = [...code];
      newCode[nextEmptyIndex] = value;
      setCode(newCode);
    }
  };

  const handleBackspace = () => {
    const lastFilledIndex = code.map(Boolean).lastIndexOf(true);
    if (lastFilledIndex !== -1) {
      const newCode = [...code];
      newCode[lastFilledIndex] = '';
      setCode(newCode);
    }
  };

  const renderKeypad = () => {
    const keypadNumbers = [
      {number: '1', letters: ''},
      {number: '2', letters: 'ABC'},
      {number: '3', letters: 'DEF'},
      {number: '4', letters: 'GHI'},
      {number: '5', letters: 'JKL'},
      {number: '6', letters: 'MNO'},
      {number: '7', letters: 'PQRS'},
      {number: '8', letters: 'TUV'},
      {number: '9', letters: 'WXYZ'},
      {number: '0', letters: ''},
    ];

    return (
      <>
        <View style={styles.keypadRow}>
          {keypadNumbers.slice(0, 3).map((key, index) => (
            <TouchableOpacity
              key={index}
              style={styles.keypadButton}
              onPress={() => handleKeypadPress(key.number)}>
              <Text style={styles.keypadNumber}>{key.number}</Text>
              <Text style={styles.keypadLetters}>{key.letters}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadRow}>
          {keypadNumbers.slice(3, 6).map((key, index) => (
            <TouchableOpacity
              key={index}
              style={styles.keypadButton}
              onPress={() => handleKeypadPress(key.number)}>
              <Text style={styles.keypadNumber}>{key.number}</Text>
              <Text style={styles.keypadLetters}>{key.letters}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadRow}>
          {keypadNumbers.slice(6, 9).map((key, index) => (
            <TouchableOpacity
              key={index}
              style={styles.keypadButton}
              onPress={() => handleKeypadPress(key.number)}>
              <Text style={styles.keypadNumber}>{key.number}</Text>
              <Text style={styles.keypadLetters}>{key.letters}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.keypadRow}>
          <TouchableOpacity
            style={[styles.keypadButton, styles.zeroButton]}
            onPress={() => handleKeypadPress('0')}>
            <Text style={styles.keypadNumber}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keypadButton}
            onPress={handleBackspace}>
            <Icon name="delete" size={24} color="#1B263B" />
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow}>
        <Icon name="arrowleft" size={24} color="#1B263B" />
      </TouchableOpacity>

      <Text style={styles.headerText}>Verify Email</Text>
      <Text style={styles.descriptionText}>
        A code was sent to +2347******43
      </Text>

      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            style={[
              styles.codeInput,
              focusedInput === index && styles.focusedCodeInput,
            ]}
            value={digit}
            keyboardType="none" // Prevent default keyboard from showing up
            maxLength={1}
            editable={false} // Disable manual typing
            onFocus={() => setFocusedInput(index)}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('CongratsMailScreen')}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.keypadContainer}>{renderKeypad()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  backArrow: {
    marginTop: 30,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#415A77',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#415A77',
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 80,
    marginTop: 80,
  },
  codeInput: {
    backgroundColor: '#D9D9D980',
    width: 50,
    height: 50,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 5,
  },
  focusedCodeInput: {
    outlineColor: '#1B263B',
    outlineWidth: 2,
    backgroundColor: '#FFF',
  },
  nextButton: {
    backgroundColor: '#415A77',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 40,
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  keypadContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  keypadButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F9',
    borderRadius: 10,
  },
  keypadNumber: {
    fontSize: 24,
    color: '#1B263B',
  },
  keypadLetters: {
    fontSize: 12,
    color: '#415A77',
  },
  zeroButton: {
    width: '45%',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F4F9',
    borderRadius: 10,
  },
});

export default EmailVerification;
