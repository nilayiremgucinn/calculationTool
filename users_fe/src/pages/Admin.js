import { AppBar, Backdrop, Button, Card, CardContent, CardHeader, CardMedia, Checkbox, CircularProgress, Container, FormControl, FormControlLabel, FormGroup, InputAdornment, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { Add, Close } from '@mui/icons-material';
import { toast } from 'react-toastify';

const DEFAULT_INPUT={
    name: "",
    placeholder: "",
    constant: 0,
    coefficient: 1,
    // page_id ne yapicam bilemiyorum
}

const DEFAULT_INPUT_PAGE ={
    title: "",
    description: "",
    image_url: "",
    input_data:[DEFAULT_INPUT]
}

export default function Admin(){
    const [numberOfInputs, setNumberOfInputs] = useState(0);
    const [numberOfEntries, setNumberOfEntries] = useState(0);
    const [numberDecided, setNumberDecided] = useState(false);
    const [data, setData] = useState(DEFAULT_INPUT_PAGE);
    const [loading, setLoading] = useState(false);

    const FIELD_IDS = {
        NAME: 'name',
        PLACEHOLDER: 'placeholder',
        COEFFICIENT: 'coefficient',
        CONSTANT: 'constant',
    }

    useEffect(()=>{
        console.log('Mounted', numberDecided);
    }, [numberDecided])

    let createInputPage = async (data) => {
        setNumberOfEntries(numberOfEntries + 1);
        let response = await fetch('http://127.0.0.1:8000/api/input', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if (response.status === 200) {
            toast.success("Input page created.");
          } else {
            toast.error("Failed to create input page");
          }
    }

    const addInputHandler = () => {

        let input_data_ = data.input_data.slice();
        input_data_.push(DEFAULT_INPUT);

        setData({ ...data, input_data: input_data_ });

    }
    const removeInputHandler = () => {

        let input_data_ = data.input_data.slice();
        input_data_.splice(input_data_.length - 1, 1);
        setData({ ...data, input_data: input_data_ });

    }

    const changeHandler = (event) => {

        const id = event.target.id;
        const index = event.target.index;
        const value = event.target.value;

        switch (id) {
            case FIELD_IDS.NAME:
                var input_data_ = [...data.input_data];
                input_data_[index]['name'] = value;
                setData({ ...data, input_data: input_data_ });
                break;
            case FIELD_IDS.PLACEHOLDER:
                var input_data_ = [...data.input_data];
                input_data_[index]['placeholder'] = value;
                setData({ ...data, input_data: input_data_ });
                break;
            case FIELD_IDS.COEFFICIENT:
                    var input_data_ = [...data.input_data];
                    input_data_[index]['coefficient'] = parseFloat(value);
                    setData({ ...data, input_data: input_data_ });
                    break;
            case FIELD_IDS.CONSTANT:
                    var input_data_ = [...data.input_data];
                    input_data_[index]['constant'] = parseFloat(value);
                    setData({ ...data, input_data: input_data_ });
                    break;

        }
    }
    
    const onClickedDone = () => {
        createInputPage();
        setData(DEFAULT_INPUT_PAGE);
    }

    switch(numberDecided){
        case true:
            return (
                <Container maxWidth="md" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 4, md: 10 },
            
                }}>
                    <Box sx={{ width:'%100', alignContent: "stretch", marginBottom: '10px'}}>
                        <Stack direction='row'>
                        <Typography variant="h15" component="div" >
                            Configuration Page
                        </Typography>
                        <Button sx={{marginLeft: "auto"}} variant="contained" onClick={(e)=>{setNumberDecided(false)}}>Back</Button>
                        </Stack>
                    </Box>
                    
                    <Stack spacing={3}>
            
                        <TextField multiline rows={1} onChange={(e) => { setData({ ...data, title: e.target.value }) }} placeholder="Edit title" label="Title" variant="outlined" />
                        <TextField multiline rows={10} onChange={(e) => { setData({ ...data, description: e.target.value }) }} placeholder="Edit description" label="Description" variant="outlined"/>
    
                        {data.input_data.map((input, index) =>
                            <Stack spacing={2}>
                                <TextField sx={{width: '%100'}} key={'name'+ toString(index)} index={index} onChange={changeHandler} id={FIELD_IDS.NAME} label={`Name ${index + 1}`} variant="outlined" />
                                <TextField sx={{width: '%100'}} key={'desc'+ toString(index)}index={index} onChange={changeHandler} id={FIELD_IDS.PLACEHOLDER} label={`Placeholder ${index + 1}`} variant="outlined" />
                                <TextField type="number" sx={{width: '%100'}} key={'coeff'+ toString(index)} index={index} onChange={changeHandler} id={FIELD_IDS.COEFFICIENT} label={`Coefficient ${index + 1}`} variant="outlined" defaultValue={1} />
                                <TextField type="number" sx={{width: '%100'}} key={'cons'+ toString(index)} index={index} onChange={changeHandler} id={FIELD_IDS.CONSTANT} label={`Constant ${index + 1}`} variant="outlined" defaultValue={0} />
                            </Stack>
                        )}
            
            
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button color='primary' onClick={addInputHandler} endIcon={<Add />}>Add Input</Button>
                            <Button color='secondary' onClick={removeInputHandler} endIcon={<Close />}>Remove Input</Button>
                        </Box>
            
                        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                            {numberOfEntries<numberOfInputs?
                                <Button sx={{marginLeft: "auto"}} onClick={createInputPage} variant="contained">Next</Button>:
                                <Button sx={{marginLeft: "auto"}} onClick={onClickedDone} variant="contained">Done</Button>
                            }
                        </Box>
            
                    </Stack>
            
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress size={60} color="inherit" />
                    </Backdrop>
            
                </Container >
            )
        case false:
            return (
                <Container maxWidth="md" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 4, md: 20 },
            
                }}
                >
                <Stack spacing={4} alignItems='center'>
                    <Paper  elevation={24} sx={{ p: 5, borderRadius: 4}} >
                        <FormControl>
                            <TextField sx={{ maxWidth: 300 }} 
                                label='Number of Input Pages' 
                                onChange={(e) => {setNumberOfInputs(parseInt(e.target.value))}}>                 
                            </TextField>
                        </FormControl>
                        <Box>
                            <Button sx={{ margin: 1 }} color='success' id='add-input' onClick={(e) => setNumberDecided(true)}>Submit</Button>
                        </Box>
                    </Paper>
                </Stack>
                </Container>
            );
    }
        
}