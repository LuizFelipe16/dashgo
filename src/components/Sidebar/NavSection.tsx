import { ReactNode } from "react";
import { Text, Box, Stack } from "@chakra-ui/react";

interface PropsNavSection {
  title: string;
  children?: ReactNode;
}

export function NavSection({ children, title }: PropsNavSection) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">{title}</Text>
      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}