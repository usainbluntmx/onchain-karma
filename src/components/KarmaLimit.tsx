import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { readContract } from 'wagmi/actions'
import { onchainKarmaABI, onchainKarmaAddress } from '../contracts/onchainKarma'

interface Karma {
  from: string
  to: string
  timestamp: bigint
}

export function KarmaLimit({ refresh = 0 }: { refresh?: number }) {
  const { address } = useAccount()
  const [remaining, setRemaining] = useState<number | null>(null)

  useEffect(() => {
    const fetchLimit = async () => {
      if (!address) return

      try {
        const total = (await readContract({
          address: onchainKarmaAddress,
          abi: onchainKarmaABI,
          functionName: 'totalKarmas',
        })) as bigint

        let used = 0
        const today = Math.floor(Date.now() / 1000 / 86400)

        const karmaPromises = Array.from({ length: Number(total) }, (_, i) =>
          readContract({
            address: onchainKarmaAddress,
            abi: onchainKarmaABI,
            functionName: 'getKarma',
            args: [BigInt(i)],
          }).catch(() => null)
        )

        const karmaResults = await Promise.all(karmaPromises)

        for (const result of karmaResults) {
          if (!result) continue
          const karma = result as unknown as Karma
          const day = Number(karma.timestamp) / 86400
          if (
            karma.from.toLowerCase() === address.toLowerCase() &&
            Math.floor(day) === today
          ) {
            used += 1
          }
        }

        setRemaining(Math.max(0, 3 - used))
      } catch (error) {
        console.error('Error fetching karma limit:', error)
      }
    }

    fetchLimit()
  }, [address, refresh])

  return (
    <div style={{ marginTop: 20 }}>
      <p>🧮 Te quedan {remaining === null ? '...' : remaining} karmas para enviar hoy.</p>
    </div>
  )
}