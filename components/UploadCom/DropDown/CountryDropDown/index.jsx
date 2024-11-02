import { View, Text, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useUploadContext } from '../../../../providers/UploadProvider'
import styles from './styles'

const LocationDropDown = () => {

    const {
      country, setCountry,
      state, setState,
      city, setCity,} = useUploadContext()

    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);

    const [selectedCountryCode, setSelectedCountryCode] = useState(null);
    const [selectedStateCode, setSelectedStateCode] = useState(null);
    const [selectedCityId, setSelectedCityId] = useState(null);

    const [isFocus, setIsFocus] = useState(false);
    
    const apiKey = 'TWZ2ZzdWbjFFOGFCOEZGMnNxQ1JrOVNaUzVOUE55RDIwTE1Gekd2cQ=='

    useEffect(()=>{
        const fetchCountries = async () => {
          const headers = new Headers();
          headers.append('X-CSCAPI-KEY', apiKey);

          const requestOptions = {
              method: 'GET',
              headers: headers,
              redirect: 'follow'
          };

          try {
              const response = await fetch('https://api.countrystatecity.in/v1/countries', requestOptions);
              const data = await response.json();
              const countryArray = data.map(country => ({
                  value: country.iso2,
                  label: country.name
              }));
              setCountryData(countryArray);
          } catch (error) {
              console.error('Error fetching countries:', error);
          }
        };

        fetchCountries();
    },[])

    const handleState = async (countryCode) => {
        const headers = new Headers();
        headers.append('X-CSCAPI-KEY', apiKey);

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, requestOptions);
            const data = await response.json();
            const stateArray = data.map(state => ({
                value: state.iso2,
                label: state.name
            }));
            setStateData(stateArray);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const handleCity = async (countryCode, stateCode) => {
        const headers = new Headers();
        headers.append('X-CSCAPI-KEY', apiKey);

        const requestOptions = {
            method: 'GET',
            headers: headers,
            redirect: 'follow'
        };

        try {
            const response = await fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, requestOptions);
            const data = await response.json();
            const cityArray = data.map(city => ({
                value: city.id,
                label: city.name
            }));
            setCityData(cityArray);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
   };


  return (
    <View style={styles.container}>

        {/* Country */}
        <Text style={styles.labelTxt}>Country</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={countryData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select Country' : '...'}
            searchPlaceholder="Search..."
            value={country}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setCountry(item.label);  // Store the name in the country state
                setSelectedCountryCode(item.value);  // Store the country code for fetching states
                handleState(item.value);
                setIsFocus(false);
            }}
        />

        {/* State */}
        <Text style={styles.labelTxt}>State</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={stateData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select State' : '...'}
            searchPlaceholder="Search..."
            value={state}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setState(item.label);  // Store the name in the state state
                setSelectedStateCode(item.value);  // Store the state code for fetching cities
                handleCity(selectedCountryCode, item.value);
                setIsFocus(false);
            }}
        />
        {/* City */}
        <Text style={styles.labelTxt}>City</Text>
        <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={cityData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select City' : '...'}
            searchPlaceholder="Search..."
            value={city}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setCity(item.label);  // Store the name in the city state
                setSelectedCityId(item.value);  // Store the city ID
                setIsFocus(false);
            }}
        />
      
    </View>
  )
}

export default LocationDropDown