'use client'
import { Box, Button, Container, FormControl, Grid, IconButton, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { ContentCopy, DeleteOutline, Done } from "@mui/icons-material";
import Header from "../component/header";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Form() {
    const randomId = () => Math.floor(Math.random() * 1000)

    //formik
    const formik = useFormik({
        initialValues: {
            name: '',
            question: [
                {
                    id: randomId(),
                    question: '',
                    choice: [
                        { id: randomId(), text: '' },
                        { id: randomId(), text: '' }
                    ],
                    correct: null
                }
            ]
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Please fill in this option'),
            question: Yup.array().of(
                Yup.object({
                    question: Yup.string().required('Please fill in this option'),
                    choice: Yup.array().of(
                        Yup.object({
                            text: Yup.string().required('Please fill in this option')
                        })
                    ),
                    correct: Yup.number().nullable().required('required')
                })
            )
        }),
        onSubmit: (values) => {
            const payload = {
                name: values.name,
                questions: values.question
            };
            alert(JSON.stringify(payload, null, 2));
        }
    });

    //question
    const addQuestion = () => {
        const newQuestion =
        {
            id: randomId(),
            question: '',
            choice: [
                { id: randomId(), text: '' },
                { id: randomId(), text: '' }
            ],
            correct: null as number | null
        }

        formik.setFieldValue('question', [...formik.values.question, newQuestion]);
    }

    const deleteQuestion = (questionId: number) => {
        if (formik.values.question.length <= 1) return
        formik.setFieldValue(
            'question',
            formik.values.question.filter(q => q.id !== questionId)
        );
    }

    const duplicateQuestion = (questionId: number) => {
        const question = [...formik.values.question];
        const q = question.find(q => q.id === questionId);
        if (!q) return;

        const choice = q.choice.map(c => ({
            id: randomId(), text: c.text
        }));
        const duplicate = { ...q, id: randomId(), choice };
        formik.setFieldValue('question', [...question, duplicate]);
    };

    //choice
    const addChoice = (questionId: number) => {
        const newQuestion = formik.values.question.map(q =>
            q.id === questionId ? { ...q, choice: [...q.choice, { id: randomId(), text: '' }] } : q
        );
        formik.setFieldValue('question', newQuestion);
    }

    const deleteChoice = (questionId: number, choiceId: number) => {
        const question = formik.values.question.find(q => q.id === questionId);
        if (!question) return;
        if (question.choice.length <= 1) return;

        formik.setFieldValue(
            'question',
            formik.values.question.map(q =>
                q.id === questionId ? { ...q, choice: q.choice.filter(c => c.id !== choiceId) } : q
            )
        );
    }


    return (
        <Grid
            height={'100%'}
            bgcolor={'#F3F4F6'}
        >
            <Header onSave={formik.handleSubmit} />

            <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                my={'24px'}
                paddingX={'24px'}
                width={'100%'}
            >
                <Grid
                    container
                    maxWidth={'1392px'}
                    width={'100%'}
                    alignItems={'center'}
                >
                    <Box
                        bgcolor={'white'}
                        width={'100%'}
                        display={'flex'}
                        flexDirection={'column'}
                        borderRadius={'8px'}
                        boxShadow={'0px 4px 8px #081D1F1A'}
                    >
                        <Box
                            padding={{ xs: '16px', sm: '20px', md: '24px' }}
                            gap={{ xs: '16px', sm: '18px', md: '20px' }}
                            display={'flex'}
                            flexDirection={'column'}
                            borderBottom={'1px solid #C2C9D1'}
                        >
                            <Typography
                                fontFamily={'Prompt'}
                                fontWeight={400}
                                fontSize={{ xs: 18, sm: 19, md: 20 }}
                                color='black'
                            >
                                Questionnaire Detail
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                variant="outlined"
                                label='Name'
                                name="name"
                                error={Boolean(formik.touched.name && formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        </Box>

                        {/* question box */}
                        {formik.values.question.map((q, index) => (
                            <Box key={q.id}>
                                <Box
                                    padding={'24px 24px 0px 24px'}
                                    display={'flex'}
                                    flexDirection={'column'}
                                    gap={{ xs: '16px', sm: '18px', md: '20px' }}
                                >

                                    {/* question */}
                                    <Typography
                                        fontFamily={'Prompt'}
                                        fontWeight={400}
                                        fontSize={{ xs: 18, sm: 19, md: 20 }}
                                        color='black'
                                    >
                                        Question {index + 1}
                                    </Typography>
                                    <TextField
                                        required
                                        fullWidth
                                        variant="outlined"
                                        label='Question'
                                        name={`question[${index}].question`}
                                        onChange={formik.handleChange}
                                        value={formik.values.question[index].question}
                                        error={Boolean((formik.touched.question && formik.errors.question?.[index] as any)?.question)}
                                        helperText={(formik.touched.question && formik.errors.question?.[index] as any)?.question}
                                    />
                                    {/* choice */}
                                    < FormControl fullWidth>
                                        <RadioGroup
                                            name={`question[${index}].correct`}
                                            value={formik.values.question[index].correct ?? ''}
                                            onChange={formik.handleChange}
                                        >
                                            {q.choice.map((choice, c) => (
                                                <Box
                                                    display={'flex'}
                                                    alignItems={'center'}
                                                    ml={0}
                                                    mt={'24px'}
                                                    gap={'24px'}
                                                    key={choice.id}
                                                >
                                                    {/* radio */}
                                                    <Box
                                                        position={'relative'}
                                                        width={24}
                                                        height={24}
                                                        borderRadius={'50%'}
                                                        display={'flex'}
                                                        alignItems={'center'}
                                                        sx={{
                                                            justifyContent: 'center',
                                                            '&:has(.Mui-checked)': {
                                                                backgroundColor: '#00C62B',
                                                            },
                                                        }}
                                                    >
                                                        <Radio
                                                            checkedIcon={<Done />}
                                                            value={choice.id}
                                                            sx={{
                                                                '&.Mui-checked': {
                                                                    color: 'white',
                                                                },
                                                            }}
                                                        />
                                                    </Box>

                                                    {/* description */}
                                                    <Box
                                                        display="flex"
                                                        alignItems="center"
                                                        gap="16px"
                                                        flexGrow={1}
                                                    >
                                                        <TextField
                                                            required
                                                            fullWidth
                                                            variant="outlined"
                                                            label="Description"
                                                            name={`question[${index}].choice[${c}].text`}
                                                            value={formik.values.question[index].choice[c]?.text || ''}
                                                            onChange={formik.handleChange}
                                                            error={Boolean(
                                                                formik.touched.question?.[index]?.choice?.[c]?.text &&
                                                                (formik.errors.question?.[index] as any)?.choice?.[c]?.text
                                                            )}
                                                            helperText={
                                                                // error
                                                                (formik.touched.question?.[index]?.choice?.[c]?.text &&
                                                                    (formik.errors.question?.[index] as any)?.choice?.[c]?.text)
                                                                    ? (formik.errors.question?.[index] as any)?.choice?.[c]?.text
                                                                    // radio select
                                                                    : parseInt(formik.values.question[index].correct ?? '', 10) === choice.id
                                                                        ? "This answer is correct"
                                                                        : ""
                                                            }
                                                        />
                                                        <IconButton
                                                            onClick={() => deleteChoice(q.id, choice.id)}
                                                            sx={{ width: '24px', height: '24px', color: 'black' }}
                                                        >
                                                            <DeleteOutline />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>

                                    {/* Add choise */}
                                    <Box
                                        pb={'8px'}
                                        borderBottom={'1px solid #C2C9D1'}
                                    >
                                        <Button
                                            variant="text"
                                            sx={{
                                                height: '48px',
                                                borderColor: '#FF5C00',
                                                color: '#FF5C00',
                                                ":hover": { backgroundColor: 'transparent' }
                                            }}
                                            startIcon={<AddIcon />}
                                            onClick={() => addChoice(q.id)}
                                        >
                                            <Typography
                                                fontFamily={'Prompt'}
                                                fontSize={14}
                                                fontWeight={500}
                                                textTransform={'uppercase'}
                                            >
                                                Add Choice
                                            </Typography>
                                        </Button>
                                    </Box>
                                </Box>

                                {/* Option */}
                                <Box
                                    display={'flex'}
                                    gap={'24px'}
                                    py={'24px'}
                                    pl={'24px'}
                                    borderBottom={'1px solid #C2C9D1'}
                                >
                                    <Button
                                        variant="text"
                                        sx={{
                                            height: '48px',
                                            borderColor: 'black',
                                            color: 'black',
                                            ":hover": { backgroundColor: 'transparent' }

                                        }}
                                        startIcon={<ContentCopy />}
                                        onClick={() => duplicateQuestion(q.id)}
                                    >
                                        <Typography
                                            fontFamily={'Prompt'}
                                            fontSize={14}
                                            fontWeight={500}
                                            textTransform={'uppercase'}
                                        >
                                            Duplicate
                                        </Typography>
                                    </Button>

                                    <Button
                                        variant="text"
                                        sx={{
                                            height: '48px',
                                            borderColor: 'black',
                                            color: 'black',
                                            ":hover": { backgroundColor: 'transparent' }
                                        }}
                                        startIcon={<DeleteOutline />}
                                        onClick={() => deleteQuestion(q.id)}
                                    >
                                        <Typography
                                            fontFamily={'Prompt'}
                                            fontSize={14}
                                            fontWeight={500}
                                            textTransform={'uppercase'}
                                        >
                                            Delete
                                        </Typography>
                                    </Button>
                                </Box>

                            </Box>
                        ))}
                        {/* Add question */}
                        <Box
                            padding={{ xs: '16px', sm: '20px', md: '24px' }}
                            display={'flex'}
                            flexDirection={'column'}
                            gap={{ xs: '16px', sm: '18px', md: '20px' }}
                        >
                            <Button
                                variant="outlined"
                                sx={{
                                    maxWidth: '100%',
                                    height: '48px',
                                    borderColor: '#FF5C00',
                                    color: '#FF5C00',
                                    ":hover": { backgroundColor: '#FF5C00', color: 'white' }
                                }}
                                startIcon={<AddIcon />}
                                onClick={addQuestion}
                            >
                                <Typography
                                    fontFamily={'Prompt'}
                                    fontSize={14}
                                    fontWeight={500}
                                    textTransform={'uppercase'}
                                >
                                    Add Question
                                </Typography>
                            </Button>
                        </Box>
                    </Box>
                </Grid >
            </Box >
        </Grid>

    )
}
