import Output from "../components/Output";
import { useEffect, useState } from "react";
import { Button, Container,  Stack, TextField , Typography} from "@mui/material";
import { Box } from "@mui/system";
import { toast } from 'react-toastify';
import { TabContainer } from "react-bootstrap";

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
    const [data, setData] = useState([])
    const [pageData, setPageData] = useState(DEFAULT_INPUT_PAGE);
    const [numberOfInputsEntered, setNumberOfInputsEntered] = useState(0);
    const [readyToCalculate, setReadyToCalculate] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [outputTotal, setOutputTotal] = useState(0);
    const [loading, setLoading] = useState(false);

 
    let getInputPages = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/input', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            }).then(data => data.json());

            setData(response);
            console.log(data);
            if (data.length){
                setPageData(data[0]);
            }
        
            toast.success("Input pages received.");
        } catch (error) {
            toast.error("Failed to get input page");
        }
    }

    const onClickNext = (event)=> {
        setLoading(true);

        const index = event.target.index;
        const value = event.target.value;
        let total = 0;
    
        let input_data = pageData.inputs;
        
        input_data[numberOfInputsEntered].array.forEach(input => {
            total += (input.coefficient * inputValues[index]) + input.constant
        });
        
        setOutputTotal(total);
        setPageData(data[numberOfInputsEntered]);
        setInputValues([]);
        setNumberOfInputsEntered(numberOfInputsEntered + 1);
        setLoading(false);
    }

    const onClickPrev = (event)=> {
        setLoading(true);

        const index = event.target.index;
        const value = event.target.value;
        let total = 0;
    
        let input_data = pageData.inputs;
        
        input_data[numberOfInputsEntered].array.forEach(input => {
            total -= (input.coefficient * inputValues[index]) + input.constant
        });
        
        setOutputTotal(total);
        setPageData(data[numberOfInputsEntered-1]);
        setInputValues([]);
        setNumberOfInputsEntered(numberOfInputsEntered - 1);
        setLoading(false);
    }

    const changeHandler = (event) => {
        const index = event.target.index;
        const value = event.target.value;

        var input_data_ = [...inputValues];
        input_data_[index] = value;
        setInputValues(input_data_);
    }

    useEffect(()=>{
        getInputPages();
        console.log(pageData);
    }, [loading]);

    switch(readyToCalculate){
        case true: // render output
            return <Output outputTotal key='output'></Output>
        case false:
            return (
                <Box sx={{paddingTop: 25}}>
                    <Stack direction='row' alignItems='center' justifyContent='center'>
                        <Container alignItems='center'>
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
                        alignItems: 'center',
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
                                        <TextField type="number" sx={{width: '%100'}} key={input.input_id} onChange={changeHandler} label={input.name} placeholder={input.placeholder} variant="outlined" />
                                    </Stack>
                                )}
                            </Stack>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end', marginBottom: "auto"}} key='buttons'>
                                {numberOfInputsEntered>0?
                                    <Button sx={{alignItems: "flex-start"}} onClick={onClickPrev} variant="contained">Prev</Button>:
                                    <div></div>
                                }    
                                {numberOfInputsEntered+1<data.length?
                                    <Button sx={{marginLeft: "auto"}} onClick={onClickNext} variant="contained">Next</Button>:
                                    <Button sx={{marginLeft: "auto"}} onClick={(e) => {setReadyToCalculate(true)}} variant="contained">Calculate</Button>
                                }
                            </Box>
                        </Container>
                    </Stack>
                </Box>
            )
    }



}   