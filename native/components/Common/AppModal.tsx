import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface AppModalProps {
  children: React.ReactNode;
  onPress: () => void;
}

export default function AppModal({ children, onPress }: AppModalProps) {
  return (
    <TouchableOpacity
      className="bg-black/30 flex-1 flex-col justify-end "
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
}
