import Output from "../components/Output";
import { useEffect, useState } from "react";
import { AppBar, Backdrop, Button, Container,  Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
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


export default function User(){
    const [data, setData] = useState([])
    const [pageData, setPageData] = useState(DEFAULT_INPUT_PAGE);
    const [numberOfInputsEntered, setNumberOfInputsEntered] = useState(0);
    const [numberDecided, setNumberDecided] = useState(false);
    const [inputValues, setInputValues] = useState([]);
    const [outputTotal, setOutputTotal] = useState(0);

    // useEffect(()=>{
    //     getInputPages();
    // }, []);
 
    let getInputPages = async () => {
        let response = await fetch('http://127.0.0.1:8000/api/input', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(data => data.json(
        )).then(setData(data
        ));
    
        if (response.status === 200) {
            toast.success("Input pages received.");
            if (data.length){
                setPageData(data[0]);
            }
          } else {
            toast.error("Failed to get input page");
          }
    }

    const onClickNext = (event)=> {

        const index = event.target.index;
        const value = event.target.value;
        let total = 0;
    
        let input_data = pageData.input_data;
        
        input_data[numberOfInputsEntered].array.forEach(input => {
            total += (input.coefficient * inputValues[index]) + input.constant
        });
        
        setOutputTotal(total);
        setPageData(data[numberOfInputsEntered]);
        setInputValues([]);
        setNumberOfInputsEntered(numberOfInputsEntered + 1);
    }

    const onClickPrev = (event)=> {

        const index = event.target.index;
        const value = event.target.value;
        let total = 0;
    
        let input_data = pageData.input_data;
        
        input_data[numberOfInputsEntered].array.forEach(input => {
            total -= (input.coefficient * inputValues[index]) + input.constant
        });
        
        setOutputTotal(total);
        setPageData(data[numberOfInputsEntered-1]);
        setInputValues([]);
        setNumberOfInputsEntered(numberOfInputsEntered - 1);
    }

    const changeHandler = (event) => {
        const index = event.target.index;
        const value = event.target.value;

        var input_data_ = [...inputValues];
        input_data_[index] = value;
        setInputValues(input_data_);
    }

    switch(numberDecided){
        case true: // render output
            return <Output outputTotal></Output>
        case false:
            return (
                <Container maxWidth="md" sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: { xs: 4, md: 10 },
            
                }}>

                    {pageData.input_data.map((input, index) =>
                        <Stack spacing={2}>
                            <TextField type="number" sx={{width: '%100'}} key={index} onChange={changeHandler} label={input.name} placeholder={input.placeholder} variant="outlined" />
                        </Stack>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                        <Button sx={{alignItems: "flex-start"}} onClick={onClickPrev} variant="contained">Prev</Button>
                        {numberOfInputsEntered<data.length?
                            <Button sx={{marginLeft: "auto"}} onClick={onClickNext} variant="contained">Next</Button>:
                            <Button sx={{marginLeft: "auto"}} onClick={(e) => {setNumberDecided(true)}} variant="contained">Calculate</Button>
                        }
                    </Box>
                </Container>
            )
    }



}