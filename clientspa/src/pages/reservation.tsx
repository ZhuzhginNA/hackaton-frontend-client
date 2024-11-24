import React from "react"
import{AlertBlock, Block, BlockContent, Box, Flex, FlexItem, TextField, Title, Text, Button, TextAreaField, SelectField} from '@qiwi/pijma-desktop'
import {fetchOs} from '../api/api'
import {useState} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { postReservation } from '../api/api'



type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]



export const Reservation: React.FC = () => {
    const [osValue, setOSValue] = React.useState<any>(undefined);
  const [osOptions, setOSOptions] = React.useState([]);
    const [startDay, onChangeStart] = useState<Value>(new Date())
    const [endDay, onChangeEnd] = useState<Value>(new Date())
    const [startTime, setStartTime] = React.useState('')
    const [endTime, setEndTime] = React.useState('')
    const [textDiscription, setTextDiscription] = React.useState('')
    console.log(new Date())

    const formatDateTime = (date: Date, time: string): string => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        const formattedDate = new Date(date);
        // formattedDate.setHours(hours, minutes, seconds);
        // return formattedDate.toISOString()
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
      }
    
      const sendReservation = () => {
        const formattedStartDateTime = formatDateTime(startDay as Date, startTime)
        const formattedEndDateTime = formatDateTime(endDay as Date, endTime)
        postReservation(formattedStartDateTime, formattedEndDateTime, textDiscription, osValue.id).then((res) => {
          alert(res.message)
        })
      }
    React.useEffect(() => {
        fetchOs().then((res) => {
            const osOptions = res.os.map((os: { name: any; id: any; }) => ({
              text: os.name,
              value: { id: os.id }
            }));
            setOSOptions(osOptions);
          });
    }, [])

    const equals = (a: { id: any }, b: { id: any }) => a?.id === b?.id;

    //console.log(os)

    // const handleOSChange = ( ) => {
    //     // const newOSValues = [...osValues];
    //     // newOSValues[index] = value;
    //     setOSValues();
    //   };
    return (
        <Flex direction={'column'} >
            <Title size={'2'}>Заявка на бронирование сервера для тестирования
            </Title>
  <Flex m={'30px'} align="space-between" direction={'row'}>
    <FlexItem width={'20%'}>
        <Text size={"l"} bold display="block">Выберите дату начала бронирования</Text>
      <Calendar onChange={onChangeStart} value={startDay} />
    </FlexItem>
    <FlexItem width={'20%'}>
    <Text size={"l"} bold display="block">Выберите дату окончания бронирования</Text>
      <Calendar onChange={onChangeEnd} value={endDay} />
    </FlexItem>
    <FlexItem width={'60%'}>
      <Flex direction={'row'} justify="space-between" p={'50px'}> {/* Используем justify="space-between" */}
        <FlexItem width={'30%'}>
          <Block>
            <BlockContent>
              <Box width={80}>
                <TextField
                  data-testid="text-field"
                  title="Время начала бронирования"
                  type="text"
                  help="формат данных: сс:мм:чч"
                  value={startTime}
                  onChange={(startTime) => setStartTime(startTime)}
                />
              </Box>
            </BlockContent>
          </Block>
        </FlexItem>
        <FlexItem width={'30%'}>
          <Block>
            <BlockContent>
              <Box width={80}>
                <TextField
                  data-testid="text-field"
                  title="Время окончания бронирования"
                  type="text"
                   help="формат данных: сс:мм:чч"
                  value={endTime}
                  onChange={(endTime) => setEndTime(endTime)}
                />
              </Box>
            </BlockContent>
          </Block>
        </FlexItem>
        <FlexItem width={'25%'}>
            {
        <SelectField
              title="Операционная система"
              value={osValue}
              items={osOptions}
              equals={equals}
              onChange={(value) => setOSValue(value)}
            />}
        </FlexItem>
      </Flex>
    </FlexItem>
  </Flex>
  <AlertBlock data-testid="alert-block" type="info" >
  если оренда сервера проходит в течении одного календарного дня, выберете одинаковую дату начала и окончания
</AlertBlock>
<Block >
    <BlockContent>
      <Box >
        <TextAreaField
          data-testid="text-area-field"
          title="Описание"
          value={textDiscription}
          onChange={(text) => setTextDiscription(text)}
        />
      </Box>
    </BlockContent>
  </Block>
    <Flex align={'end'} pt={10} width={40}>
    <Button type ="submit" kind="brand" size="accent" text="Отправить" onClick={() => sendReservation()}/>
    </Flex>
</Flex>

      
    )
}