import { Button, Divider, Flex, Stack, useBreakpointValue } from "@chakra-ui/react";
import Head from "next/head";
import router from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as validate from 'yup';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';

import { Input } from '../components/Form/Input';
import { Logo } from "../components/Header/Logo";

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = validate.object().shape({
  email: validate.string().required("E-mail é obrigatório.").email("E-mail inválido."),
  password: validate.string().required("Senha é obrigatória."),
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState // podemos usar isso para saber se o form está com alguma ação e assim bloquear e colocar um loading no botão
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const errors = formState.errors;

  const isWideVersion = useBreakpointValue({
    base: true,
    lg: false
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (values, event) => {
    // e agora, sem precisar de nenhum estado, temos acesso a 
    // todas as digitações e informações do formulário, sem problema algum.

    // usar dessa forma, sem tipar diretamente a variavel, podemos ter acesso ao evento 
    // do formulário.

    await new Promise(resolve => setTimeout(resolve, 3000));

    console.log(values);
    router.push('/dashboard');
  }

  return (
    <>
      <Head><title>Sign In | DashGo</title></Head>
      <Flex
        w="100vw"
        h="100vh"
        align="center"
        justify="center"
        direction={["column", "row"]}
      >
        <Logo />
        {!!isWideVersion && <Divider w="90%" bg="pink.900" color="pink" my="5" />}

        <Flex
          as="form"
          w={["90%", "100%"]}
          maxW={460}
          bg="gray.800"
          p="8"
          borderRadius={8}
          flexDir="column"
          boxShadow="md"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              label="E-mail"
              type="email"
              error={errors.email}
              {...register('email')}
            />
            <Input
              name="password"
              label="Senha"
              type="password"
              error={errors.password}
              {...register('password')}
            />
          </Stack>

          <Button
            type="submit"
            variant='outline'
            boxShadow="md"
            size="lg"
            mt="6"
            colorScheme="pink"
            _hover={{
              bg: 'pink.500',
              color: 'gray.900'
            }}
            isLoading={formState.isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}