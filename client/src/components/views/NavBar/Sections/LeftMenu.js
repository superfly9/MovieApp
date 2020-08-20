import React from 'react';
import {useSelector} from 'react-redux';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state=>state.user);
  const {userData : { _id :userId } } = user;
  return (
    <Menu mode={props.mode}>
      {userId ?
      <Menu.Item key="favorite">
        <a href="/favorite">나의 구독 영화</a>
      </Menu.Item>
      :
        ''
      }
  </Menu>
  )
}

export default LeftMenu