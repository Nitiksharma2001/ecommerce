import { Button } from 'antd'

interface ButtonJSXProps {
  label: string
  onClick: () => void
  style?: React.CSSProperties
  icon?: React.ReactNode
}

export default function ButtonJSX({ label, onClick, style = {}, icon }: ButtonJSXProps) {
  return (
    <Button
      type='default'
      onClick={onClick}
      style={{
        border: '1px solid #D6680B',
        backgroundColor: '#FE5000',
        boxShadow:
          '0px 2px 5px 0px rgba(20, 88, 201, 0.17), 0px -2px 0.3px 0px rgba(14, 56, 125, 0.18) inset, 0px 2px 1px 0px rgba(255, 255, 255, 0.22) inset',
        color: '#FFF',
        height: '32px',
        padding: '8px 16px',
        fontWeight: 500,
        ...style,
      }}
      icon={icon}
    >
      {label}
    </Button>
  )
}
