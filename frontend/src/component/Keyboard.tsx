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
  currentWord,
  setValue: setSelectedVal,
  value: selectedVal,
  onChange,
}: {
  currentWord: string;
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
  onChange: (value: string) => void;
}) {
  function getLetterColor(letter: string) {
    if (letter === "") {
      return "gray";
    }

    if (selectedVal.includes(letter) && !currentWord.includes(letter)) {
      return "red";
    }

    if (selectedVal.includes(letter) && currentWord.includes(letter)) {
      return "green";
    }

    return "gray";
  }

  function getRow(letters: { value: string }[]) {
    return (
      <Group spacing={4} grow>
        {letters.map((letter, index) => (
          <Button
            key={`keyboard-${letter.value}-${index}`}
            onClick={() => {
              if (selectedVal.includes(letter.value)) {
                return;
              }

              onChange(letter.value);
              setSelectedVal((c) => c + letter.value);
            }}
            disabled={letter.value === ""}
            variant={
              getLetterColor(letter.value) === "gray" ? "default" : "filled"
            }
            color={getLetterColor(letter.value)}>
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
