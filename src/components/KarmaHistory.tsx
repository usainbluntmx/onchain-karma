// src/components/KarmaHistory.tsx
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { onchainKarmaABI, onchainKarmaAddress } from '../contracts/onchainKarma'
import { readContract } from '@wagmi/core'
import { format } from 'date-fns'

type Karma = {
  from: string
  to: string
  timestamp: bigint
}

type Props = {
  refresh: number
}

export function KarmaHistory({ refresh }: Props) {
  const { address } = useAccount()
  const [sent, setSent] = useState<Karma[]>([])
  const [received, setReceived] = useState<Karma[]>([])

  useEffect(() => {
    if (!address) return

    const fetchKarma = async () => {
      const sentIds: bigint[] = await readContract({
        address: onchainKarmaAddress,
        abi: onchainKarmaABI,
        functionName: 'getSentKarmas',
        args: [address],
      }) as bigint[]

      const receivedIds: bigint[] = await readContract({
        address: onchainKarmaAddress,
        abi: onchainKarmaABI,
        functionName: 'getReceivedKarmas',
        args: [address],
      }) as bigint[]

      const fetchDetails = async (ids: bigint[]) => {
        return Promise.all(ids.map(id =>
          readContract({
            address: onchainKarmaAddress,
            abi: onchainKarmaABI,
            functionName: 'getKarma',
            args: [id],
          }) as Promise<Karma>
        ))
      }

      setSent(await fetchDetails(sentIds))
      setReceived(await fetchDetails(receivedIds))
    }

    fetchKarma()
  }, [address, refresh])

  return (
    <div style={{ marginTop: 30 }}>
      <h2>🍰 Karmas enviados</h2>
      {sent.length === 0 ? (
        <p>No has enviado karmas aún.</p>
      ) : (
        <ul>
          {sent.map((karma, index) => (
            <li key={index}>
              A {karma.to} — {format(Number(karma.timestamp) * 1000, 'PPPp')}
            </li>
          ))}
        </ul>
      )}

      <h2 style={{ marginTop: 20 }}>🍂 Karmas recibidos</h2>
      {received.length === 0 ? (
        <p>No has recibido karmas aún.</p>
      ) : (
        <ul>
          {received.map((karma, index) => (
            <li key={index}>
              De {karma.from} — {format(Number(karma.timestamp) * 1000, 'PPPp')}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}