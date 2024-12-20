import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { countryCodes } from '../utils/countryCode';

// Define the types for the props
interface PhoneInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  countryCode: string;
  onCountryCodeChange: (code: string) => void; // Function to update country code
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  countryCode,
  onCountryCodeChange,
}) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.phoneInputWrapper}>
        <Picker
          selectedValue={countryCode}
          onValueChange={onCountryCodeChange} // Use the function passed from the parent to update the country code
          style={styles.countryCodeDropdown}
          itemStyle={styles.pickerItem}
        >
          {countryCodes.map(country => (
            <Picker.Item
              key={country.code}
              label={` (${country.code}) ${country.country}`}
              value={country.code}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
        <TextInput
          style={styles.phoneInput}
          placeholder={placeholder}
          value={`${value}`}
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
    color: '#1B263BE5',
  },
  phoneInputWrapper: {
    height: 54,
    fontSize: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
    color: '#1B263BE5',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCodeDropdown: {
    flex: 0.4,
  },
   pickerItem: {
     color: '#1B263B',
    backgroundColor: '#fff',
    borderColor: '#ccc',
     borderWidth: 0.5,
  },
  phoneInput: {
    flex: 0.6,
    fontSize: 14,
    color: '#1B263BE5',
    borderLeftWidth: 0.5,
    borderRightColor: '#ccc',
  },
});

export default PhoneInput;
