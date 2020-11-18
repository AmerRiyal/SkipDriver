import { Constants } from "./components/atoms";

import _Icon from "react-native-vector-icons/MaterialCommunityIcons";
export const Icon = _Icon;

import _IconIO from "react-native-vector-icons/Ionicons";
export const IconIO = _IconIO;

import _EventEmitter from "events";
export const EventEmitter = new _EventEmitter();


export const openDrawer = () =>
  EventEmitter.emit(Constants.EmitCode.SideMenuOpen);
export const closeDrawer = () =>
  EventEmitter.emit(Constants.EmitCode.SideMenuClose);

