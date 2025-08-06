// src/components/KarmaThanksModal.tsx
type Props = {
  show: boolean
  onClose: () => void
}

export function KarmaThanksModal({ show, onClose }: Props) {
  if (!show) return null

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white', padding: 30, borderRadius: 10,
        textAlign: 'center', maxWidth: 400
      }}>
        <h2>🎉 ¡Karma recibido!</h2>
        <p>Alguien te envió karma. ¡Sigue así!</p>
        <button onClick={onClose} style={{
          marginTop: 15, padding: '6px 12px',
          border: 'none', backgroundColor: '#7065F0',
          color: 'white', borderRadius: 6, cursor: 'pointer'
        }}>
          Cerrar
        </button>
      </div>
    </div>
  )
}