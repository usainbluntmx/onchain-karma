import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import {
  WagmiConfig,
  configureChains,
  createConfig
} from 'wagmi';

import { baseSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import {
  RainbowKitProvider,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';

import '@rainbow-me/rainbowkit/styles.css';

// Configuración de chains y providers
const { chains, publicClient } = configureChains(
  [baseSepolia],
  [publicProvider()]
);

// IMPORTANTE: Cambia esto por tu propio projectId de WalletConnect si lo tienes
const projectId = 'onchain-karma-app'; // o 'YOUR_WALLETCONNECT_PROJECT_ID'

// Obtener conectores por defecto
const { connectors } = getDefaultWallets({
  appName: 'OnChain Karma (Testnet)',
  projectId,
  chains,
});

// Crear config de Wagmi
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

// Renderizado principal
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);