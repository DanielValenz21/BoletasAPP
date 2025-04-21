import React from 'react';
import { ActivityIndicator } from 'react-native';

const Spinner = ({ dark }) => {
  return <ActivityIndicator size="large" color={dark ? '#FFFFFF' : '#000000'} />;
};

export default Spinner;
