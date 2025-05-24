import { Collapse } from 'antd'
import type { CollapseProps, GetProp } from 'antd'

import './accordion.css'

const { Panel } = Collapse

const accordionStyle: React.CSSProperties = {
  boxShadow: '0px 2px 16px 0px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'white',
  borderRadius: '8px',
  border: '1px',
  padding: 0
}

interface AccordionProps {
  items: Exclude<GetProp<CollapseProps, 'items'>, undefined>
}
export default function AccordionJSX({ items }: AccordionProps) {
  return (
    <Collapse style={accordionStyle} expandIconPosition='end' size='large'>
      {items.map((item, index) => (
        <Panel header={item.label} key={index}>
          {item.children}
        </Panel>
      ))}
    </Collapse>
  )
}
