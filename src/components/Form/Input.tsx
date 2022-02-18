import { FormControl, FormErrorMessage, FormLabel, Input as CInput, InputProps as CInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends CInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

// isso tudo de forward é pra colocar ref no input e poder usar com o form

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps>
  = ({ label, name, error = null, ...rest }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {!!label && (<FormLabel color="pink.400" htmlFor={name}>{label}</FormLabel>)}

        <CInput
          id={name}
          name={name}
          focusBorderColor="pink.500"
          bgColor="gray.900"
          variant="filled"
          _hover={{
            bgColor: 'gray.900'
          }}
          borderRadius={4}
          size="lg"
          padding="2"
          ref={ref}
          {...rest}
        />

        {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
      </FormControl>
    );
  }

export const Input = forwardRef(InputBase); // vai encaminhar a ref passada la no input parao input principal