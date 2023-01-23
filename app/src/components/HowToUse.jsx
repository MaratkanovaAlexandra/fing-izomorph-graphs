import React from 'react';
import { Box, Typography} from "@mui/material";

export const HowToUse = () => {
 return (
  <Box sx={{p: 2}}>
    <Typography variant='h5'>Здравствуйте Уважаемый Пользователь!!</Typography>
    <Typography variant='subtitle1'>
      Мы рады приветствовать вас в нашем приложение.
      Пользоваться нашим приложением очень просто. 
      Вам необходимо ввести длинну и ребра двух графов.
      В первом графе будет осушетвляться поиск второго графа.
    </Typography>

    <Typography variant='subtitle1'>
      Помните что если одно из полей загорерлось красным, это значит что в поле совершина ошибка.
    </Typography>
    
  </Box>
 )
}