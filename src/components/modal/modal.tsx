import { Flex, Modal, Typography } from 'antd'
import tickAnimation from '../../assets/tick-animation.json'
import Lottie from 'lottie-react'

const { Title } = Typography

interface ModalJSXProps {
  isOpen: boolean
  message: string
  handleCancel?: () => void
}

export default function ModalJSX({ isOpen, message, handleCancel = () => {} }: ModalJSXProps) {
  return (
    <Modal open={isOpen} onCancel={handleCancel} footer={null}>
      <Flex vertical align='center' gap='10px' style={{ padding: '4px 100px' }}>
        <Lottie animationData={tickAnimation} loop={true} style={{ height: '80px', width: '80px' }} />
        <Title level={5} style={{ textAlign: 'center' }}>
          {message}
        </Title>
      </Flex>
    </Modal>
  )
}
