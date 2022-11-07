import { Box, Link, HStack, Text, Spacer, ChevronDownIcon, Modal, Button } from 'native-base';
import React, { Component } from 'react'
import DatePicker from 'react-native-modern-datepicker';
import moment from 'moment';
import i18next from 'i18next';

export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    selectedDate: '',
    showDateModal: false,
  }

  componentDidMount(){
    this.setState({selectedDate : moment().format('DD.MM.YYYY')},()=>{
      this.props.dateChange(this.state.selectedDate)
    })
  }

  render() {
    return (
      <Box>
        {this._getModal()}
        <Link onPress={() => { this.setState({ showDateModal: true }) }}>
          <Box w={'100%'} h={'10'} bg={'white'} borderRadius={5} borderColor={'defaultColor.100'} borderWidth={1} justifyContent={'center'} alignItem={'center'} px={3}>
            <HStack>
              <Text>{this.state.selectedDate}</Text>
              <Spacer />
              <ChevronDownIcon color={'defaultColorLight'} size={'5'}></ChevronDownIcon>
            </HStack>
          </Box>
        </Link>
      </Box>
    )
  }

  _getModal() {
    return (
      <Modal isOpen={this.state.showDateModal} onClose={() => this.setState({ showDateModal: false })}>
        <Modal.Content w="90%" bg={'white'}>
          <Modal.Body>
            <DatePicker
              options={{
                textHeaderColor: '#c5abcc',
                mainColor: '#c5abcc',
                textSecondaryColor: '#c5abcc',
                borderColor: '#c5abcc',
                //borderWidth: 2
              }}
              selected={this.state.selectedDate}
              configs={{
                dayNames: [
                  "Pazar",
                  "Pazartesi",
                  "Salı",
                  "Çarşamba",
                  "Perşembe",
                  "Cuma",
                  "Cumartesi",
                ],
                dayNamesShort: ["Pz", "Pzt", "Sa", "Çrş", "Prş", "Cu", "Cmt"],
                monthNames: [
                  "Ocak",
                  "Şubat",
                  "Mart",
                  "Nisan",
                  "Mayıs",
                  "Haziran",
                  "Temmuz",
                  "Ağustos",
                  "Eylül",
                  "Ekim",
                  "Kasım",
                  "Aralık",
                ],
                selectedFormat: 'DD.MM.YYYY',
                dateFormat: 'DD.MM.YYYY',
              }}
              mode="calendar"
              onDateChange={(date) => this.setDate(date)}
            />
          </Modal.Body>
          <Modal.Footer bg={'white'}>
            <Button.Group space={1}>
              {/* <Button onPress={() => { this.setState({ showDateModal: false }) }} variant="ghost" colorScheme="blueGray" >{i18next.t('Buttons.Cancel')}</Button> */}
              <Button size={'sm'} onPress={() => { this.setState({ showDateModal: false }) }}>{i18next.t('Buttons.Save')}</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    )
  }

  setDate(date){
    this.setState({ selectedDate: date })
    this.props.dateChange(date)
  }
}