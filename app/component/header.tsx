'use client'
import { AppBar, Box, Button, Typography } from "@mui/material";

type Props = {
  onSave: () => void;
};

export default function Header({ onSave }: Props) {
  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{
        backgroundColor: 'white',
      }}>

      {/* topic */}
      <Box
        maxHeight={'64px'}
        padding={'12px'}
        pl={'24px'}
        borderBottom={'1px solid #C2C9D1'}
      >
        <Typography
          fontFamily={'Prompt'}
          fontSize={24}
          fontWeight={500}
          textTransform={'titlecase'}
          color="black"
        >
          🦊 Foxbith Questionnaire
        </Typography>
      </Box>

      {/* button */}
      <Box
        maxWidth={'100%'}
        height={'73px'}
        padding={'12px'}
        pr={'24px'}
        display={'flex'}
        gap={'12px'}
        justifyContent={'end'}
        borderBottom={'1px solid #C2C9D1'}
      >
        <Button
          variant="outlined"
          sx={{
            maxWidth: '89px',
            maxHeight: '48px',
            borderColor: '#FF5C00',
            color: '#FF5C00',
            ":hover": { backgroundColor: 'white' }
          }}
        >
          <Typography
            fontFamily={'Prompt'}
            fontSize={14}
            fontWeight={500}
            textTransform={'uppercase'}
          >
            Cancel
          </Typography>
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: '180px',
            maxHeight: '48px',
            backgroundColor: '#FF5C00',
            boxShadow: '0px 0px',
            ":hover": {
              boxShadow: '0px 0px',
              backgroundColor: 'rgb(206, 75, 0)',
            }

          }}
          onClick={() => onSave?.()}
        >
          <Typography
            fontFamily={'Prompt'}
            fontSize={14}
            fontWeight={500}
            textTransform={'uppercase'}
          >
            Save
          </Typography>
        </Button>
      </Box>
    </AppBar>
  )
}
