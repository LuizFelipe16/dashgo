import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Stack, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiDeleteBin3Fill, RiEditLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { getUsers, useUsers } from "../../hooks/useUsers";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";

export default function UserList({ users }) {
  const [page, setPage] = useState(1);
  const { data, isLoading, error, isFetching } = useUsers(page
    // { initialData: users }
  );

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 // minutos
    });
  }

  return (
    <>
      <Head><title>Usuários | DashGo</title></Head>
      <Box>
        <Header />

        <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8" display="flex" flexDir="column" >
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal">
                Usuários
                {!isLoading && !!isFetching && <Spinner size="sm" color="pink.600" ml="4" />}
              </Heading>

              <NextLink href="/users/create">
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiAddLine} fontSize="18" />}
                >
                  Criar Novo
                </Button>
              </NextLink>
            </Flex>

            {!!isLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      {isWideVersion && (
                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                          <Checkbox colorScheme="pink" />
                        </Th>
                      )}
                      <Th>Usuários</Th>
                      {isWideVersion && <Th>Data de Cadastro</Th>}
                      <Th width="8">Opções</Th>
                    </Tr>
                  </Thead>

                  <Tbody>
                    {data.users.map(user => {
                      return (
                        <Tr key={user.id}>
                          {isWideVersion && (
                            <Td px={["4", "4", "6"]}>
                              <Checkbox colorScheme="pink" />
                            </Td>
                          )}
                          <Td>
                            <Box>
                              <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                                <Text fontWeight="bold">{user.name}</Text>
                              </Link>
                              <Text fontSize="sm" color="gray.300">{user.email}</Text>
                            </Box>
                          </Td>
                          {isWideVersion && <Td>{user.created_at}</Td>}
                          <Td>
                            <Stack spacing="4" direction={["column", "row"]}>
                              <Button
                                as="a"
                                variant="outline"
                                size="sm"
                                fontSize="sm"
                                colorScheme="purple"
                                leftIcon={<Icon as={RiEditLine} />}
                                _hover={{
                                  bg: 'purple.500',
                                  color: 'gray.900'
                                }}
                              >
                                {isWideVersion && 'Editar'}
                              </Button>

                              <Button
                                as="a"
                                size="sm"
                                variant="outline"
                                fontSize="sm"
                                colorScheme="purple"
                                leftIcon={<Icon as={RiDeleteBin3Fill} />}
                                _hover={{
                                  bg: 'purple.500',
                                  color: 'gray.900'
                                }}
                              >
                                {isWideVersion && 'Excluir'}
                              </Button>
                            </Stack>
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);

//   return {
//     props: {
//       users,
//     }
//   }
// }