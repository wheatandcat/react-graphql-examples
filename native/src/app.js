import { Platform } from "react-native";
import { Navigation } from "react-native-navigation";
import {
  registerScreens,
  registerScreenVisibilityListener
} from "./containers/Routers";

// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

const tabs = [
  {
    label: "xxxxx",
    screen: "tampatsu.MyPage",
    icon: require("../img/list.png"),
    title: "xxxxx"
  },
  {
    label: "xxxxx",
    screen: "tampatsu.Setting",
    icon: require("../img/swap.png"),
    title: "xxxxx"
  }
];

// this will start our app
Navigation.startTabBasedApp({
  tabs,
  animationType: Platform.OS === "ios" ? "slide-down" : "fade",
  tabsStyle: {
    tabBarBackgroundColor: "#ffffff",
    tabBarButtonColor: "#888888",
    tabBarSelectedButtonColor: "#FF9933",
    tabFontFamily: "BioRhyme-Bold"
  },
  appStyle: {
    tabBarBackgroundColor: "#003a66",
    navBarButtonColor: "#ffffff",
    tabBarButtonColor: "#ffffff",
    navBarTextColor: "#111111",
    tabBarSelectedButtonColor: "#ff505c",
    navigationBarColor: "#003a66",
    navBarBackgroundColor: "#ffffff",
    statusBarColor: "#002b4c",
    tabFontFamily: "BioRhyme-Bold"
  }
  /*
  drawer: {
    left: {
      screen: "example.Types.Drawer"
    }
  }
  */
});
