import Output from "../components/Output";
import { useEffect, useState } from "react";
import { Backdrop, Button, CircularProgress, Container,  Stack, TextField , Typography} from "@mui/material";
import { Box } from "@mui/system";

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
    const [data, setData] = useState([]);
    const [pageData, setPageData] = useState(DEFAULT_INPUT_PAGE);
    const [loading, setLoading] = useState(true);


    const onClickNext = ()=> {

        let index = 0;
        let total = 0;
    
        let input_data = pageData.inputs;
        console.log(inputValues);
        input_data.forEach(input => {
            total += (input.coefficient * inputValues[index]);
            index += 1;
        });
        
        setOutputTotal((outputTotal + total));
        console.log(total);
        console.log('dusuk yuzde', outputTotal);
        setNumberOfInputsEntered(numberOfInputsEntered + 1);
        setPageData(data[numberOfInputsEntered+1]);
        setInputValues(Array(pageData.inputs.length).fill(0));
    }

    const onClickPrev = ()=> {
        let index = 0;
        let total = 0;
    
        let input_data = pageData.inputs;
        
        input_data.forEach(input => {
            total += (input.coefficient * inputValues[index]);
            index += 1;
        });
        
        setOutputTotal(outputTotal - total);
        setPageData(data[numberOfInputsEntered-1]);
        setInputValues([]);
        setNumberOfInputsEntered(numberOfInputsEntered - 1);
    }

    const changeHandler = (event) => {
        const index = event.target.tabIndex;
        const value = event.target.value;

        var input_data_ = [...inputValues];
        input_data_[parseInt(index)] = parseInt(value);
        setInputValues(input_data_);
    }

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/input')
            .then(data => data.json())
            .then((newData) =>{
                console.log(newData);
                setData(newData);
                setPageData(newData[0]);
            });
        setInputValues(Array(pageData.inputs.length).fill(0));
        setLoading(false);
    }, []);

    switch(readyToCalculate){
        case true: // render output
            return( <Output totals={outputTotal} key='output'></Output>)
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

                                <Typography variant="subtitle2" component="div">
                                    {pageData.description}
                                </Typography>

                                {pageData.inputs.map((input, index) =>
                                    <Stack spacing={2} key={index} >
                                        <TextField type="number" sx={{width: '%100'}} tabIndex={index} onChange={changeHandler} label={input.name} placeholder={input.placeholder} variant="outlined" />
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
                                    <Button sx={{marginLeft: "auto"}} onClick={(e) => {setReadyToCalculate(true); console.log(outputTotal);}} variant="contained">Calculate</Button>
                                }
                            </Box>
                        </Container>
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress size={60} color="inherit" />
                        </Backdrop> 
                    </Stack>
                </Box>
            )
        default:
            break;
    }
}
