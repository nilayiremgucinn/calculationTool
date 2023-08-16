import Output from "../components/Output";
import { useEffect, useState } from "react";
import { Button, Container,  Stack, TextField , Typography} from "@mui/material";
import { Box } from "@mui/system";
import { toast, ToastContainer} from 'react-toastify';

const DEFAULT_INPUT={
    input_id: 0,
    name: "",
    placeholder: "",
    coefficient: 1,
}

const DEFAULT_INPUT_PAGE ={
    page_id: 0,
    title: "",
    description: "",
    image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    inputs:[DEFAULT_INPUT]
}


export default function User(){
    const [numberOfInputsEntered, setNumberOfInputsEntered] = useState(0);
    const [readyToCalculate, setReadyToCalculate] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [outputTotal, setOutputTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([])
    const [pageData, setPageData] = useState(DEFAULT_INPUT_PAGE);


    const onClickNext = ()=> {
        setLoading(true);

        let index = 0;
        let total = 0;
    
        let input_data = pageData.inputs;
        console.log(inputValues)
        input_data.forEach(input => {
            total += (input.coefficient * inputValues[index]);
            index += 1;
        });
        
        setOutputTotal(total);
        console.log(total);
        setNumberOfInputsEntered(numberOfInputsEntered + 1);
        console.log(numberOfInputsEntered);
        setPageData(data[numberOfInputsEntered]);
        setInputValues([]);
        setLoading(false);
    }

    const onClickPrev = ()=> {
        setLoading(true);

        let index = 0;
        let total = 0;
    
        let input_data = pageData.inputs;
        
        input_data.array.forEach(input => {
            total -= (input.coefficient * inputValues[index]);
            index += 1;
        });
        
        setOutputTotal(total);
        setPageData(data[numberOfInputsEntered-1]);
        setInputValues([]);
        setNumberOfInputsEntered(numberOfInputsEntered - 1);
        setLoading(false);
    }

    const changeHandler = (event) => {
        const index = event.target.key;
        const value = event.target.value;

        var input_data_ = [...inputValues];
        input_data_.push(parseInt(value));
        setInputValues(input_data_);
    }

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/input')
            .then(data => data.json())
            .then((data_arr) => {
                setData(data_arr);
                setPageData(data_arr[0]);
            });
    }, []);

    switch(readyToCalculate){
        case true: // render output
            return <Output outputTotal key='output'></Output>
        case false:
            return (
                <Box sx={{paddingTop: 25}}>
                    <Stack direction='row' justifyContent='center'>
                        <Container>
                            <img 
                                src={pageData.image}
                                alt="new"
                            />
                        </Container>
                        <Container maxWidth="md" height="%100" sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            p: { xs: 4, md: 10 },
                            justifyContent: 'center',
                        }}>
                            <Stack spacing={5}>
                                <Typography variant="h3" component="div">
                                    {pageData.title}
                                </Typography>

                                <Typography variant="subtitle2" component="div" key='description' >
                                    {pageData.description}
                                </Typography>

                                {pageData.inputs.map((input, index) =>
                                    <Stack spacing={2} key='inputs' >
                                        <TextField type="number" sx={{width: '%100'}} key={index} onChange={changeHandler} label={input.name} placeholder={input.placeholder} variant="outlined" />
                                    </Stack>
                                )}
                            </Stack>
                            <Box sx={{ display: 'flex', alignContent: 'flex-end', marginBottom: "auto"}} key='buttons'>
                                {numberOfInputsEntered>0?
                                    <Button sx={{alignContent: "flex-start"}} onClick={onClickPrev} variant="contained">Prev</Button>:
                                    <div></div>
                                }    
                                {numberOfInputsEntered+1<data.length?
                                    <Button sx={{marginLeft: "auto"}} onClick={onClickNext} variant="contained">Next</Button>:
                                    <Button sx={{marginLeft: "auto"}} onClick={(e) => {setReadyToCalculate(true)}} variant="contained">Calculate</Button>
                                }
                            </Box>
                        </Container>
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
                </Box>
            )
    }
}   