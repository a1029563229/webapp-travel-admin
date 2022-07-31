import { Menu } from "antd";

const items = [
  { label: '攻略列表', key: 'guideline-list' }
]

const SystemMenu = () => {
  return (
    <Menu items={items} theme="dark"></Menu>
  )
}

export default SystemMenu;