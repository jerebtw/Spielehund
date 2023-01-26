import { Center, Loader } from "@mantine/core";

export default function Loading() {
  return (
    <Center style={{ width: "100%", height: "80%" }}>
      <Loader />
    </Center>
  );
}
