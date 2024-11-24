import './App.css';
import { cache, themes, fonts, reset, CacheProvider, ThemeProvider, Global } from '@qiwi/pijma-desktop'
import React from 'react'
import { Flex, FlexItem, Box, Block, TextField, PasswordField, Button,Title, Card, HeaderMenu } from '@qiwi/pijma-desktop'
import {auth} from './api/api'
import { getProtected } from './api/api'
import { useEffect } from 'react'
import { Reservation } from './pages/reservation'
import {GainAccess} from './pages/gainAccess'


  function App() {
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')
  const [selectTab, setSelectTab] = React.useState(0)


  const getToken = () => {
    auth(login, password)
  .then(res => {
    const accessToken = res.token;
    localStorage.setItem('token', accessToken)
    console.log(accessToken)
    window.location.href = '/'
  })
  }

  // React.useEffect(() => {
  //   getProtected().then(res => {
  //     console.log(res)
  //    })
  // } , [login])
 

console.log((!localStorage.getItem('token')))
  const handleTabClick = (index: number) => {
    setSelectTab(index)
  };
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={themes.orange}>
        <Global styles={[reset, fonts]} />
        {(!localStorage.getItem('token')) && <Flex direction='column' align='center' justify='center' style={{ height: '100vh' }}>
      <FlexItem align='center' width={'600px'}>
        <Flex pl={'55px'}>
        <Title size={'2'} >Авторизация</Title>
        </Flex>
        <Block>
          <Box style={{ padding: '40px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <TextField title='Логин' type='text' value={login} onChange={(login) => setLogin(login)} />
            <PasswordField title='Пароль' name='password' viewed={false} value={password} onChange={(password) => setPassword(password)} />
                <Flex pl={'80px'} width={'420px'}>
            <Button type='button' kind='brand' size='normal' text='Войти' onClick={getToken} />
            </Flex>
          </Box>
        </Block>
      </FlexItem>
    </Flex>}
        {localStorage.getItem('token') && (
          < >
          <Card style={{ width: '100%', backgroundColor: '#fff', padding: '20px', height: '80px' }}>
            <HeaderMenu
              children={[
                { title: 'Бронирование', active: selectTab === 0, onClick: () => handleTabClick(0) },
                { title: 'Активные сессии', active: selectTab === 1, onClick: () => handleTabClick(1) },
                
              ]}
            />
          </Card>
{selectTab === 1 ? (
  <GainAccess/>
) : (
  <Reservation/>
)}
</>
)}
</ThemeProvider>
</CacheProvider>
  )
}

export default App;
