// src/hooks/useKarmaListener.ts
import { useEffect } from 'react'
import { useAccount, useContractEvent } from 'wagmi'
import { onchainKarmaABI, onchainKarmaAddress } from '../contracts/onchainKarma'

export function useKarmaListener(onKarmaReceived: () => void) {
  const { address } = useAccount()

  useContractEvent({
    address: onchainKarmaAddress,
    abi: onchainKarmaABI,
    eventName: 'KarmaSent',
    listener(log) {
      const [from, to] = log as unknown as [string, string]
      if (to.toLowerCase() === address?.toLowerCase()) {
        onKarmaReceived()
      }
    },
  })
}