import React, { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Box, Image, Text, Spacer, HStack, Center, Button, Stack, Input, VStack, Pressable, ArrowUpIcon, ArrowDownIcon, DeleteIcon, AddIcon } from "native-base";
import i18next from 'i18next';
import CustomHeader from '../../components/CustomHeader';
import ContentService from '../../services/ContentService';
import common from '../../common';
import contentStore from '../../mobx/ContentStore'
import { observer } from 'mobx-react'
import AsyncStorage from "@react-native-async-storage/async-storage";


const ListScreen = ({ navigation, props }) => {
  useEffect(() => {
    controlData();
  }, []);

  const controlData = async ()=>{
    const list = await AsyncStorage.getItem('items')
    const listParsed = JSON.parse(list)
    if(!listParsed){
      getList();
    }else{
      contentStore.saveListItems(listParsed)
    }
  }


  const getList = async () => {
    //ApplicationStore.setPageLoading(false);
    ContentService.getList()
      .then(async res => {
        contentStore.saveListItems(res.data)
      })
      .catch(async err => {
        console.log('err :', err)
        common.catchHandler(err);
      })
      .then(() => {
        //ApplicationStore.setPageLoading(false);
      });
  };

  const ListItem = ({ number, item }) => {
    return (
      <Pressable onPress={() => { gotoPage('DetailScreen', number, item) }} borderBottomWidth="0.5" _dark={{
        borderColor: "muted.50"
      }} borderColor="gray.300" py="2">
        <HStack space={[2, 3]} justifyContent="space-between" alignItems={'center'}>
          <Text>
            {number + 1}
          </Text>
          <Center>
            <Image size={45} borderRadius={100} resizeMode={'contain'} source={{
              uri: item.avatar
            }} alt={item.name} />
          </Center>
          <VStack>
            <Text>
              {item.name}
            </Text>
          </VStack>
          <Spacer />
          <HStack>
            <Pressable
              onPress={() => { moveUp(number) }}
              alignItems={'center'}
              justifyContent={'center'}>
              <ArrowUpIcon
                color={'green.500'}
                size={'4'}></ArrowUpIcon>
            </Pressable>
            <Pressable
              onPress={() => { moveDown(number) }}
              alignItems={'center'}
              ml={3}
              justifyContent={'center'}>
              <ArrowDownIcon
                color={'red.500'}
                size={'4'}></ArrowDownIcon>
            </Pressable>
            <Pressable
              onPress={() => { deleteItem(number) }}
              alignItems={'center'}
              ml={3}
              justifyContent={'center'}>
              <DeleteIcon
                color={'gray.900'}
                size={'4'}></DeleteIcon>
            </Pressable>
          </HStack>
        </HStack>
      </Pressable>
    );
  };

  const gotoPage = (pageName, number = 0, item = null) => {
    navigation.navigate(pageName, { number, item })
  }

  const deleteItem = (index) => {
    contentStore.removeList(index);
  }

  const moveUp = (index) => {
    contentStore.moveUpItem(index);
  }

  const moveDown = (index) => {
    contentStore.moveDownItem(index);
  }

  const renderHeader = () => {
    return <CustomHeader title={i18next.t('Header.Simpson')} noBack={true} />;
  }

  const renderBody = () => {
    return (
      <Center
        h="full"
        w="100%"
        justifyContent="flex-start"
        alignContent="center"
        style={styles.container}
      >
        <Box w="100%" maxW="350" h='full' pb={10}>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={contentStore.listItems}
            style={{ marginBottom: 40 }}
            renderItem={({ item, index }) => {
              return (
                <ListItem
                  number={index}
                  item={item}
                />
              );
            }}
          />

          <HStack justifyContent={'center'} alignItems={'center'} mb={5}>
            <Box bg="blue.600" borderRadius={'full'} w={50} h={50} justifyContent={'center'} alignItems={'center'}>
              <Pressable
                onPress={() => { gotoPage('FormScreen') }}
                alignItems={'center'}
                justifyContent={'center'}>
                <AddIcon
                  color={'white'}
                  size={'6'}></AddIcon>
              </Pressable>
            </Box>
          </HStack>
        </Box>
      </Center>
    )

  }

  return (
    <>
      {renderHeader()}
      <Box opacity={0}>
        {contentStore.listItems.length.toString()}
      </Box>
      {renderBody()}
    </>
  );
};

export default observer(ListScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});