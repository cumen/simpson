import React from 'react';
import {
  Box,
  StatusBar,
  HStack,
  Text,
  ChevronLeftIcon,
  Pressable,
} from 'native-base';
import NavigationService from '../navigation/NavigationService';

const CustomHeader = (props) => {
  return (
    <>
      <StatusBar bg="#FFFFFF" barStyle="dark-content" />
      <Box safeAreaTop bg="#FFFFFF" />
      <HStack
        bg='#FFFFFF'
        px="3"
        maxH={'80px'}
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack
          alignItems="center"
          maxW={'10%'}
          minW={'10%'}
          h={'full'}
          justifyContent="center">
          {!props.noBack && (
            <Pressable
              onPress={() => {
                NavigationService.goBack()
              }}
              w={'full'}
              h={'full'}
              alignItems={'center'}
              justifyContent={'center'}>
              <ChevronLeftIcon
                color={'blue.600'}
                size={'6'}></ChevronLeftIcon>
            </Pressable>
          )}
        </HStack>
        <HStack>
          <Text
            numberOfLines={1}
            color={'black'}
            fontSize="18"
            fontWeight="bold">
            {props.title}
          </Text>
        </HStack>
        <HStack
          maxW={'10%'}
          minW={'10%'}
          h={'full'}
          justifyContent="center"
          alignItems={'center'}>
          {props.right}
        </HStack>
      </HStack>
    </>
  );
}

export default CustomHeader;