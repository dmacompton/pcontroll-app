import React from "react";
import { Icon } from "expo";

import Colors from "../constants/Colors";

interface Props {
  name: string;
  focused: boolean;
}

export default class TabBarIcon extends React.Component<Props> {
  render() {
    const { name, focused } = this.props;

    return (
      <Icon.Ionicons
        name={name}
        size={26}
        style={{ marginBottom: -3 }}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}
