// PhoneInput.js
import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {countryCodes} from '../utils/countryCode';

// Define the types for the props
interface PhoneInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
}) => {
  const [countryCode, setCountryCode] = useState('+234');

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.phoneInputWrapper}>
        <Picker
          selectedValue={countryCode}
          onValueChange={(itemValue: React.SetStateAction<string>) =>
            setCountryCode(itemValue)
          }
          style={styles.countryCodeDropdown}>
          {countryCodes.map(country => (
            <Picker.Item
              key={country.code}
              label={` (${country.code}) ${country.country}`}
              value={country.code}
            />
          ))}
        </Picker>
        <TextInput
          style={styles.phoneInput}
          placeholder={placeholder}
          value={` ${value}`}
          placeholderTextColor="#1B263BE5"
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  phoneInputWrapper: {
    height: 44,
    // padding: 12,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#1B263BE5',
    flexDirection: 'row',
    alignItems: 'center',
    // borderBottomWidth: 1,
  },
  countryCodeDropdown: {
    flex: 0.4,

    // height: 40,
  },
  phoneInput: {
    flex: 0.6,
    fontSize: 14,
    color: '#1B263BE5',
    borderLeftWidth: 0.5,
    borderRightColor: '#ccc',
    // height: 40,
    // paddingHorizontal: 10,
  },
});

export default PhoneInput;
