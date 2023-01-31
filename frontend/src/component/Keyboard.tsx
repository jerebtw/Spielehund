import { Center, Stack, Group, Button } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

const letters = [
  [
    { value: "Q" },
    { value: "W" },
    { value: "E" },
    { value: "R" },
    { value: "T" },
    { value: "Z" },
    { value: "U" },
    { value: "I" },
    { value: "O" },
    { value: "P" },
    { value: "Ü" },
  ],
  [
    { value: "A" },
    { value: "S" },
    { value: "D" },
    { value: "F" },
    { value: "G" },
    { value: "H" },
    { value: "J" },
    { value: "K" },
    { value: "L" },
    { value: "Ö" },
    { value: "Ä" },
  ],
  [
    { value: "" },
    { value: "" },
    { value: "Y" },
    { value: "X" },
    { value: "C" },
    { value: "V" },
    { value: "B" },
    { value: "N" },
    { value: "M" },
    { value: "" },
    { value: "" },
  ],
];

export default function Keyboard({
  setValue: setSelectedVal,
}: {
  setValue: Dispatch<SetStateAction<string>>;
}) {
  function getRow(letters: { value: string }[]) {
    return (
      <Group spacing={4} grow>
        {letters.map((letter, index) => (
          <Button
            key={`keyboard-${letter.value}-${index}`}
            onClick={() => {
              if (letter.value === "") {
                return;
              } else if (letter.value === "back") {
                setSelectedVal((c) => c.slice(0, -1));
                return;
              }

              setSelectedVal((c) => c + letter.value);
            }}
            variant="default">
            {letter.value}
          </Button>
        ))}
      </Group>
    );
  }

  return (
    <Center>
      <Stack style={{ width: "80%" }}>
        {getRow(letters[0])}
        {getRow(letters[1])}
        {getRow(letters[2])}
      </Stack>
    </Center>
  );
}
