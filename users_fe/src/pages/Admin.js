import { Backdrop, Button, CircularProgress, Container, FormControl, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Navigate } from "react-router-dom";
import { Add, Close } from '@mui/icons-material';
import 'react-toastify/dist/ReactToastify.min.css';


const DEFAULT_INPUT={
    input_id: 0,
    name: "",
    placeholder: "",
    coefficient: 1,
}

const DEFAULT_INPUT_PAGE = {
    page_id: 0,
    title: "",
    description: "",
    image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    inputs: [DEFAULT_INPUT]
}

const DEFAULT_OUTPUT={
    output_id: 0,
    name: "",
    constant: 0,
}

const DEFAULT_OUTPUT_PAGE = {
    page_id: 0,
    title: "",
    description: "",
    image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    outputs: [DEFAULT_OUTPUT]
}

const ConfigurationMode = {
	NoConfiguration: 0,
	AddMode: 1,
	EditMode: 2,
    OutputAdd: 3,
    OutputEdit: 4,
}

export default function Admin(){
    const [numberOfInputs, setNumberOfInputs] = useState(0);
    const [numberOfEntries, setNumberOfEntries] = useState(0);
    const [confMode, setConfMode] = useState(ConfigurationMode.NoConfiguration);
    const [data, setData] = useState(DEFAULT_INPUT_PAGE);
    const [authenticated, setAuthenticated] = useState(true);
    const [loading, setLoading] = useState(false);
    const [pageArray, setPageArray] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);

    const FIELD_IDS = {
        NAME: 'name',
        PLACEHOLDER: 'placeholder',
        COEFFICIENT: 'coefficient',
        CONSTANT: 'constant',
    }

    useEffect(()=>{
        // const loggedInUser = localStorage.getItem("authenticated");
        // if (loggedInUser) {
        //     setAuthenticated(loggedInUser);
        // }
        setAuthenticated(true);
    }, [pageIndex]);

    let createInputPage = async () => {
        setNumberOfEntries(numberOfEntries + 1);
        let response = await fetch('http://127.0.0.1:8000/api/input', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 200) {
            toast.success("Input page created.");
          } else {
            toast.error("Failed to create input page. Please try again!");
          }
    }

    let createOutputPage = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/output', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.status === 200) {
            toast.success("Output page created.");
          } else {
            toast.error("Failed to create output page. Please try again!");
          }
    }

    let getInputPages = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/input', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            }).then(data => data.json());
            console.log(response);

            setPageArray(response);
            console.log(pageArray);
            if (pageArray.length){
                setData(pageArray[0]);
                console.log(data);
            }
        
            toast.success("Input pages received.");
        } catch (error) {
            toast.error("Failed to get input page");
        }
    }

    let getOutputPages = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/output', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            }).then(data => data.json());

            setData(response[0]);
            toast.success("Output pages received.");

        } catch (error) {
            toast.error("Failed to get output page");
        }
    }

    let updateInputPages = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/input', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        if (response.status === 200) {
            toast.success("Input page updated.");
          } else {
            toast.error("Failed to get input page");
          }
    }

    let updateOutputPages = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/output', {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        if (response.status === 200) {
            toast.success("Output page updated.");
          } else {
            toast.error("Failed to get output page");
          }
    }

    const addInputHandler = () => {

        let input_data_ = data.inputs.slice();
        input_data_.push(DEFAULT_INPUT);
        setData({ ...data, 'inputs': input_data_ });

    }

    const removeInputHandler = () => {

        let input_data_ = data.inputs.slice();
        input_data_.splice(input_data_.length - 1, 1);
        setData({ ...data, 'inputs': input_data_ });

    }

    const addOutputHandler = () => {

        let _data_ = data.outputs.slice();
        _data_.push(DEFAULT_OUTPUT);
        setData({ ...data, 'outputs': _data_ });

    }

    const removeOutputHandler = () => {

        let _data_ = data.outputs.slice();
        _data_.splice(_data_.length - 1, 1);
        setData({ ...data, 'outputs': _data_ });

    }

    const changeHandlerInputMode = (event) => {

        const id = event.target.id;
        const index = event.target.name;
        const value = event.target.value;
        var _data_ = [...data.inputs] ;

        switch (id) {
            case FIELD_IDS.NAME:           
                _data_[index]['name'] = value;
                setData({ ...data, 'inputs': _data_ });
                console.log(data);
                break;
            case FIELD_IDS.PLACEHOLDER:
                _data_[index]['placeholder'] = value;
                setData({ ...data, 'inputs': _data_ });
                break;
            case FIELD_IDS.COEFFICIENT:
                _data_[index]['coefficient'] = parseFloat(value);
                setData({ ...data, 'inputs': _data_ });
                break;
            default:
                break;
        }
    }

    const changeHandlerOutputMode = (event) => {

        const id = event.target.id;
        const index = event.target.name;
        const value = event.target.value;
        var _data_ = [...data.inputs] ;

        switch (id) {
            case FIELD_IDS.NAME:           
                _data_[index]['name'] = value;
                setData({ ...data, 'inputs': _data_ });
                console.log(data);
                break;
            case FIELD_IDS.CONSTANT:
                _data_[index]['constant'] = parseFloat(value);
                setData({ ...data, 'inputs': _data_ });
                break;
            default:
                break;

        }
    }
    
    const onOutputClick = () => {
        if(confMode == ConfigurationMode.AddMode){
            createInputPage();
            setData(DEFAULT_OUTPUT_PAGE);
            setConfMode(ConfigurationMode.OutputAdd);
        }
        else if(confMode == ConfigurationMode.EditMode){
            getOutputPages();
            setData(DEFAULT_OUTPUT_PAGE);
            setConfMode(ConfigurationMode.OutputEdit);
        } 
    }

    const onDoneClick = () =>{
        if(confMode == ConfigurationMode.AddMode){
            createOutputPage();
            setData(DEFAULT_INPUT_PAGE);
            setConfMode(ConfigurationMode.NoConfiguration);
        }
        else if(confMode == ConfigurationMode.EditMode){
            setData(DEFAULT_INPUT_PAGE);
            setConfMode(ConfigurationMode.NoConfiguration);
        } 

    }

    const onSubmitNumber = () => {
        if(numberOfInputs > 0){
            setConfMode(ConfigurationMode.AddMode);
        }else{
            toast.error('Number of inputs cannot be 0!');
        }  
    }

    const onContinueClick= () => {
        setConfMode(ConfigurationMode.EditMode);
        getInputPages();
        getOutputPages();
        
    }

    const onNextClick = ()=> {
        setPageIndex(pageIndex + 1);
        setPageArray(pageArray[pageIndex]);
    }

    const onPrevClick = ()=> {
        setPageIndex(pageIndex - 1);
        setPageArray(data[pageIndex]);
    }

    if (authenticated){
        if(confMode == ConfigurationMode.NoConfiguration){            
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
                                onChange={(e) => setNumberOfInputs(parseInt(e.target.value))}>                 
                            </TextField>
                        </FormControl>
                        <Box>
                            <Button sx={{ margin: 1 }} color='success' id='add-input' onClick={onSubmitNumber}>Submit</Button>
                        </Box>
                    </Paper>
                    <Paper  elevation={24} sx={{ p: 5, borderRadius: 4}} >
                        <Box>
                            <Button sx={{ margin: 1 }} color='success' id='add-input' onClick={onContinueClick}>Continue Without Submitting</Button>
                        </Box>
                    </Paper>
                </Stack>

                <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    justifyContent='flex'
                    newestOnTop={false}
                    closeOnClick
                    draggablePercent={50}
                    pauseOnFocusLoss={false}
                    draggable
                />
                </Container>
            );
        }else {
            return (
                <Container maxWidth="md" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 4, md: 10 },
            
                }}>
                    <Box sx={{ width:'%100', alignContent: "stretch", marginBottom: '10px'}}>
                        <Stack direction='row'>
                        <Button sx={{marginLeft: "auto"}} variant="contained" onClick={(e)=>{setAuthenticated(false)}}>LOGOUT</Button>
                        </Stack>
                    </Box>

                    <Box sx={{ width:'%100', alignContent: "stretch", marginBottom: '10px'}}>
                        <Stack direction='row'>
                            <Typography variant="h15" component="div" >
                                Configuration Page
                            </Typography>
                            <Button sx={{marginLeft: "auto"}} variant="outlined" onClick={(e)=>{setConfMode(ConfigurationMode.NoConfiguration);}}>Back</Button>
                        </Stack>
                    </Box>

                    <Stack spacing={3}>
            
                        <TextField multiline rows={1} value={data.title} onChange={(e) => { setData({ ...data, 'title': e.target.value }) }} placeholder="Edit title" label="Title" variant="outlined" />
                        <TextField multiline rows={10} value={data.description} onChange={(e) => { setData({ ...data, 'description': e.target.value }) }} placeholder="Edit description" label="Description" variant="outlined"/>
    
                        {((confMode===ConfigurationMode.AddMode) || (confMode===ConfigurationMode.EditMode))?
                        <div>
                            {data.inputs.map((input, index) =>
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} label="Input">
                                <Stack spacing={2}>
                                    <TextField sx={{width: '%80'}} value={input.name} name={index} onChange={changeHandlerInputMode} id={FIELD_IDS.NAME} label={`Name ${index + 1}`} variant="outlined" />
                                    <TextField sx={{width: '%100'}} value={input.placeholder} name={index} onChange={changeHandlerInputMode} id={FIELD_IDS.PLACEHOLDER} label={`Placeholder ${index + 1}`} variant="outlined" />
                                    <Stack direction='row' sx={{width: '%100'}}>
                                        <TextField type="number"  value={input.coefficient} key={'coeff'+ toString(index)} name={index} onChange={changeHandlerInputMode} id={FIELD_IDS.COEFFICIENT} label={`Coefficient ${index + 1}`} variant="filled"defaultValue={1} />
                                    </Stack>
                                </Stack>
                            </Box>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <Button color='primary' onClick={addInputHandler} endIcon={<Add />}>Add Input</Button>
                            <Button color='secondary' onClick={removeInputHandler} endIcon={<Close />}>Remove Input</Button>
                        </Box>
                        <Box sx={{  width:'%100', alignContent: "stretch"}}>
                            {(confMode == ConfigurationMode.EditMode)?
                                <Stack direction='row'>
                                    {pageIndex>0?
                                        <Button sx={{alignItems: "flex-start"}} onClick={onPrevClick} variant="contained">Prev</Button>:
                                        <div></div>
                                    }
                                    <Button sx={{marginLeft: "auto"}} onClick={(e) => updateInputPages()} variant="contained">Edit</Button>
                                    {(pageIndex+1)<pageArray.length?
                                        <Button sx={{marginLeft: "auto"}} onClick={onNextClick} variant="contained">Next</Button>:
                                        <Button sx={{marginLeft: "auto"}} onClick={onOutputClick} variant="contained">Output</Button>
                                    }
                                </Stack>:
                                <Stack direction='row'>
                                    {(numberOfEntries+1)<numberOfInputs?
                                        <Button sx={{marginLeft: "auto"}} onClick={createInputPage} variant="contained">Next</Button>:
                                        <Button sx={{marginLeft: "auto"}} onClick={onOutputClick} variant="contained">Output</Button>
                                    }
                                </Stack>
                            }
                        </Box>
                        </div>:
                        <div>
                            {data.inputs.map((input, index) =>
                                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} label="Input">
                                    <Stack spacing={2}>
                                        <TextField sx={{width: '%80'}} value={input.name} name={index} onChange={changeHandlerOutputMode} id={FIELD_IDS.NAME} label={`Name ${index + 1}`} variant="outlined" />
                                        <TextField sx={{width: '%100'}} value={input.placeholder} name={index} onChange={changeHandlerOutputMode} id={FIELD_IDS.PLACEHOLDER} label={`Placeholder ${index + 1}`} variant="outlined" />
                                        <Stack direction='row' sx={{width: '%100'}}>
                                            <TextField type="number"  value={input.coefficient} key={'coeff'+ toString(index)} name={index} onChange={changeHandlerInputMode} id={FIELD_IDS.COEFFICIENT} label={`Coefficient ${index + 1}`} variant="filled"defaultValue={1} />
                                        </Stack>
                                    </Stack>
                                </Box>
                            )}
                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                                <Button color='primary' onClick={addOutputHandler} endIcon={<Add />}>Add Output</Button>
                                <Button color='secondary' onClick={removeOutputHandler} endIcon={<Close />}>Remove Output</Button>
                            </Box>
                            <Box sx={{  width:'%100', alignContent: "stretch"}}>
                                {(confMode == ConfigurationMode.EditMode)?
                                    <Stack direction='row'>
                                        <Button sx={{marginLeft: "auto"}} onClick={(e) => updateOutputPages()} variant="contained">Edit</Button>
                                        <Button sx={{marginLeft: "auto"}} onClick={onDoneClick} variant="contained">Done</Button>
                                    </Stack>:
                                    <Stack direction='row'>
                                        <Button sx={{marginLeft: "auto"}} onClick={onDoneClick} variant="contained">Done</Button>
                                    </Stack>
                                }
                            </Box>
                        </div>
                        }          
                    </Stack>         
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress size={60} color="inherit" />
                    </Backdrop>

                    <ToastContainer
                    position="bottom-left"
                    autoClose={5000}
                    hideProgressBar={false}
                    justifyContent='flex'
                    newestOnTop={false}
                    closeOnClick
                    draggablePercent={50}
                    pauseOnFocusLoss={false}
                    draggable
                />
            
                </Container >
            )
        }
    }else{
        //redirect
        return <Navigate replace to="/login" />;
    }
    
        
}