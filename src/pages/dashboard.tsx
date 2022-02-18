import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import dynamic from 'next/dynamic';
import Head from "next/head";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '03 Mar.',
      '04 Mar.',
      '05 Mar.',
      '06 Mar.',
      '07 Mar.',
      '08 Mar.',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityForm: 0.7,
      opacityTo: 0.3,
    }
  }
};

const series1 = [
  { name: 'data1', data: [301, 120, 100, 26, 229, 220] }
];
const series2 = [
  { name: 'data2', data: [100, 30, 70, 9, 119, 130] }
];

export default function Dashboard() {
  return (
    <>
      <Head><title>Dashboard | DashGo</title></Head>
      <Flex
        direction="column"
        w="100vw"
        h="100vh"
        align="center"
      >
        <Header />

        <Flex w="100%" h="100%" my="6" maxW={1480} mx="auto" px="6">
          <Sidebar />

          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
            <Box
              p={["5", "8"]}
              bg="gray.800"
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4">Inscritos da Semana</Text>
              <Chart options={options} series={series1} type="area" height={160} />
            </Box>
            <Box
              p={["5", "8"]}
              bg="gray.800"
              borderRadius={8}
            >
              <Text fontSize="lg" mb="4">Taxa de Abertura</Text>
              <Chart options={options} series={series2} type="area" height={160} />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}