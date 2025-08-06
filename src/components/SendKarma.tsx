import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { onchainKarmaABI, onchainKarmaAddress } from '../contracts/onchainKarma'

type Props = {
  onKarmaSent: () => void
}

export default function SendKarma({ onKarmaSent }: Props) {
// export function SendKarma({ onKarmaSent }: Props) {
  const { address } = useAccount()
  const [receiver, setReceiver] = useState<`0x${string}`>('0x' as `0x${string}`)

  const { config } = usePrepareContractWrite({
    address: onchainKarmaAddress,
    abi: onchainKarmaABI,
    functionName: 'sendKarma',
    args: [receiver],
    enabled: Boolean(receiver && receiver !== '0x'),
  })

  const { write, isLoading, isSuccess } = useContractWrite(config)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (write) write()
  }

  useEffect(() => {
    if (isSuccess && onKarmaSent) {
      onKarmaSent()
    }
  }, [isSuccess, onKarmaSent])

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 30 }}>
      <label>
        Dirección a la que quieres dar karma:
        <input
          value={receiver}
          onChange={(e) => setReceiver(e.target.value as `0x${string}`)}
          placeholder="0x..."
          required
          style={{ width: '100%', marginTop: 8, marginBottom: 12 }}
        />
      </label>
      <button type="submit" disabled={!write || isLoading}>
        {isLoading ? 'Enviando...' : 'Enviar Karma'}
      </button>

      {isSuccess && (
        <p style={{ marginTop: 10 }}>✅ ¡Karma enviado con éxito!</p>
      )}
    </form>
  )
}