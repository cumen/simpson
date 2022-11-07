import React from "react";
import { Box, Image, Text, HStack, Center, VStack } from "native-base";
import i18next from 'i18next';
import CustomHeader from '../../components/CustomHeader';

const DetailScreen = ({ route }) => {

    const { item } = route.params;

    const renderHeader = () => {
        return <CustomHeader title={i18next.t('Header.Details')} />;
    }

    const renderBody = () => {
        return (
            <Center
                h="full"
                w="100%"
                justifyContent="flex-start"
                alignContent="center"
                flex={1}
            >
                <Box w="100%" maxW="350" h='full' pb={10}>
                    <HStack justifyContent={'center'} alignItems={'center'} mb={5}>
                        <Image w={'full'} h={'2xs'} marginY={5} resizeMode={'contain'} source={{
                            uri: item.avatar
                        }} alt={item.name} />
                    </HStack>
                    <VStack justifyContent={'center'} alignItems={'center'} mb={5}>
                        <Text fontSize={24} fontWeight='medium'>
                            {item.name}
                        </Text>
                        <Text color="gray.600">
                            {item.job}
                        </Text>
                        <Text color="gray.600" mt={5} fontSize={13}>
                            {item.description}
                        </Text>
                    </VStack>
                </Box>
            </Center>
        )

    }

    return (
        <>
            {renderHeader()}
            {renderBody()}
        </>
    );
};

export default DetailScreen;