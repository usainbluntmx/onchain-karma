import { useEffect, useState } from 'react'
import { publicClient } from '../clients/wagmiClient'
import { onchainKarmaABI, onchainKarmaAddress } from '../contracts/onchainKarma'
import { getKarmaDetails } from '../utils/karmaUtils'

export function useKarmaHistory(address?: `0x${string}`) {
  const [sent, setSent] = useState<any[]>([])
  const [received, setReceived] = useState<any[]>([])

  useEffect(() => {
    if (!address) return

    const fetchData = async () => {
      const sentIds = await publicClient.readContract({
        address: onchainKarmaAddress,
        abi: onchainKarmaABI,
        functionName: 'getSentKarmas',
        args: [address],
      }) as readonly bigint[]

      const receivedIds = await publicClient.readContract({
        address: onchainKarmaAddress,
        abi: onchainKarmaABI,
        functionName: 'getReceivedKarmas',
        args: [address],
      }) as readonly bigint[]

      const sentData = await Promise.all(sentIds.map(id => getKarmaDetails(id)))
      const receivedData = await Promise.all(receivedIds.map(id => getKarmaDetails(id)))

      setSent(sentData)
      setReceived(receivedData)
    }

    fetchData()
  }, [address])

  return { sent, received }
}