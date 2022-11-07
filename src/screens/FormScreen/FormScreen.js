import React from "react";
import { StyleSheet } from "react-native";
import { Box, FormControl, TextArea, Button, HStack, Center, Spinner, Stack, Input, VStack, WarningOutlineIcon, ArrowUpIcon, ArrowDownIcon, DeleteIcon, AddIcon } from "native-base";
import i18next from 'i18next';
import CustomHeader from '../../components/CustomHeader';
import contentStore from '../../mobx/ContentStore'
import { Formik } from 'formik';
import * as Yup from 'yup';

const FormScreen = ({ route, navigation }) => {

    const renderHeader = () => {
        return <CustomHeader title={i18next.t('Header.AddNewCharacter')} />;
    }

    const renderBody = () => {
        return (
            <Formik
                onSubmit={addItem} validationSchema={
                    Yup.object().shape({
                        fullName: Yup
                            .string()
                            .required(i18next.t('Errors.Required')),
                        job: Yup
                            .string()
                            .required(i18next.t('Errors.Required')),
                        about: Yup
                            .string()
                            .required(i18next.t('Errors.Required'))
                            .max(250, i18next.t('Errors.MaxCount', {count:250})),
                        imageLink: Yup
                            .string()
                            .url(i18next.t('Errors.Url'))
                            .required(i18next.t('Errors.Required')),
                    })
                }
                initialValues={{ fullName: '', job: '', about: '', imageLink: '' }}>
                {({ values, handleChange, handleSubmit, errors, touched, setFieldTouched }) => (
                    <Center
                        h="full"
                        w="100%"
                        justifyContent="flex-start"
                        alignContent="center"
                        style={styles.container}
                    >
                        <Box w="100%" maxW="350" h='full' pb={10}>
                            <VStack justifyContent={'center'} alignItems={'center'} marginY={5}>
                                <FormControl isInvalid mb="3">
                                    <FormControl.Label>
                                        {i18next.t('Labels.FullName')}
                                    </FormControl.Label>
                                    <Input
                                        value={values.fullName}
                                        onChangeText={handleChange('fullName')}
                                        onBlur={() => setFieldTouched('fullName')}
                                        autoCapitalize="none"
                                        returnKeyType='done'
                                    />
                                    {touched.fullName && <FormMessage message={errors.fullName} />}
                                </FormControl>
                                <FormControl isInvalid mb="3">
                                    <FormControl.Label>
                                        {i18next.t('Labels.Job')}
                                    </FormControl.Label>
                                    <Input
                                        value={values.job}
                                        onChangeText={handleChange('job')}
                                        onBlur={() => setFieldTouched('job')}
                                        autoCapitalize="none"
                                        returnKeyType='done'
                                    />
                                    {touched.job && <FormMessage message={errors.job} />}
                                </FormControl>
                                <FormControl isInvalid mb="3">
                                    <FormControl.Label>
                                        {i18next.t('Labels.About')}
                                    </FormControl.Label>
                                    <TextArea
                                        h={20}
                                        value={values.about}
                                        onChangeText={handleChange('about')}
                                        onBlur={() => setFieldTouched('about')}
                                        autoCapitalize="none"
                                        returnKeyType='done'
                                    />
                                    {touched.about && <FormMessage message={errors.about} />}
                                </FormControl>
                                <FormControl isInvalid mb="3">
                                    <FormControl.Label>
                                        {i18next.t('Labels.ImageLink')}
                                    </FormControl.Label>
                                    <Input
                                        value={values.imageLink}
                                        onChangeText={handleChange('imageLink')}
                                        onBlur={() => setFieldTouched('imageLink')}
                                        autoCapitalize="none"
                                        returnKeyType='done'
                                    />
                                    {touched.imageLink && <FormMessage message={errors.imageLink} />}
                                </FormControl>
                                <Button onPress={() => handleSubmit()} w="full" mt={5}>
                                    {i18next.t('Buttons.AddCharacter')}
                                </Button>
                            </VStack>
                        </Box>
                    </Center>
                )}
            </Formik>

        )

    }

    const FormMessage = ({ message }) => {
        return (
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {message}
            </FormControl.ErrorMessage>
        )
    }

    const addItem = (_values) => {
        let values = Object.assign({}, _values)
        console.log('values :' ,values)
        let body = {
            avatar: values.imageLink,
            description: values.about,
            job: values.job,
            name: values.fullName
        }
        contentStore.addList(body)
        navigation.goBack()
    }

    return (
        <>
            {renderHeader()}
            {renderBody()}
        </>
    );
};

export default FormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});