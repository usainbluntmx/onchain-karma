// src/contracts/onchainKarma.ts
import { Address } from 'viem'

export const onchainKarmaAddress: Address = '0xcE9A8305391747f8bF34B18Ae37a434c59060Ce2'; // Reemplaza con la dirección real del contrato

export const onchainKarmaABI = [
  {
    type: 'function',
    name: 'sendKarma',
    stateMutability: 'nonpayable',
    inputs: [{ name: 'to', type: 'address', internalType: 'address' }],
    outputs: [],
  },
  {
    type: 'function',
    name: 'getSentKarmas',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256[]', internalType: 'uint256[]' }],
  },
  {
    type: 'function',
    name: 'getReceivedKarmas',
    stateMutability: 'view',
    inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256[]', internalType: 'uint256[]' }],
  },
  {
    type: 'function',
    name: 'getKarma',
    stateMutability: 'view',
    inputs: [{ name: 'karmaId', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct OnChainKarma.Karma',
        components: [
          { name: 'from', type: 'address', internalType: 'address' },
          { name: 'to', type: 'address', internalType: 'address' },
          { name: 'timestamp', type: 'uint256', internalType: 'uint256' },
        ],
      },
    ],
  },
  {
    type: 'function',
    name: 'totalKarmas',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'function',
    name: 'MAX_KARMAS_PER_DAY',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
  },
  {
    type: 'function',
    name: 'dailyKarmaCount',
    stateMutability: 'view',
    inputs: [
      { name: '', type: 'address', internalType: 'address' },
      { name: '', type: 'uint256', internalType: 'uint256' },
    ],
    outputs: [{ name: '', type: 'uint8', internalType: 'uint8' }],
  },
  {
    type: 'event',
    name: 'KarmaSent',
    inputs: [
      { name: 'from', type: 'address', indexed: true },
      { name: 'to', type: 'address', indexed: true },
      { name: 'karmaId', type: 'uint256', indexed: true },
      { name: 'timestamp', type: 'uint256', indexed: false },
    ],
    anonymous: false,
  },
] as const;