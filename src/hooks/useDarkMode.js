// src/hooks/useDarkMode.js
import { useState, useEffect } from 'react';
import { Appearance } from 'react-native';

export function useDarkMode() {
  // Estado inicial según sistema
  const [dark, setDark] = useState(Appearance.getColorScheme() === 'dark');

  useEffect(() => {
    // Listener a cambios de tema
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      setDark(colorScheme === 'dark');
    });
    return () => sub.remove();
  }, []);

  return [dark, () => setDark(d => !d)];
}