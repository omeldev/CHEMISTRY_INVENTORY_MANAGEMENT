import {theme} from 'antd';

const {defaultAlgorithm} = theme;

const antdTheme = {
  // Basis-Tokens (Colors, Border, Radius)
  token: {
    colorPrimary: '#722ED1',      // Main Color (Purple)
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',
    borderRadius: 6,
    fontSize: 14,
    controlHeight: 40,
    lineHeight: 1.5,
    colorText: '#000000',
    colorBgBase: '#f5f5f5',
  },

  // Komponenten-spezifische Anpassungen
  components: {
    Button: {
      controlHeight: 40,
      borderRadius: 6,
      fontWeightStrong: 600,
    },
    Card: {
      borderRadius: 8,
      padding: 16,
    },
    Input: {
      borderRadius: 6,
    },
    Modal: {
      borderRadius: 8,
    },
  },

  // Optional: Algorithmus (Light / Dark / Compact)
  algorithm: defaultAlgorithm,
};

export default antdTheme;
