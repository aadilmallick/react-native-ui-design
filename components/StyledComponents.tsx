import { styled } from "nativewind";
import { Text } from "react-native";
const H1 = styled(Text, "capitalize text-4xl font-bold");
const H2 = styled(Text, "capitalize text-2xl font-bold");
const H3 = styled(Text, "capitalize text-xl font-bold");
const H4 = styled(Text, "capitalize text-lg font-bold");
const Label = styled(Text, "capitalize text-sm text-gray-400 font-semibold");
const ButtonText = styled(
  Text,
  "text-base font-semibold text-center capitalize"
);

export default { Text: { H1, H2, H3, H4, Label, ButtonText } };
