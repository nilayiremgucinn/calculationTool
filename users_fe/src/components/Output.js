import { Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.min.css';

const DEFAULT_OUTPUT={
    output_id: 0,
    name: "",
    constant: 0,
}

const DEFAULT_OUTPUT_PAGE ={
    page_id: 0,
    title: "",
    description: "",
    image: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
    outputs:[DEFAULT_OUTPUT]
}

export default function Output(props){
    const [pageData, setPageData] = useState(DEFAULT_OUTPUT_PAGE);

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/output')
            .then(data => data.json())
            .then((newData) =>{
                setPageData(newData[0]);
            })
    }, []);

    return (
        <Box sx={{paddingTop: 25}}>
            <Stack direction='row' sx={{alignContent: 'center', justifyContent: 'center'}}>
                <Container sx={{alignContent: 'center'}}>
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
                    alignContent: 'center',
                }}>
                    <Stack spacing={5}>
                        <Typography variant="h2" component="div">
                            {pageData.title}
                        </Typography>

                        <Typography variant="subtitle1" component="div" >
                            {pageData.description}
                        </Typography>
                        {pageData.outputs.map((output, index) =>
                            <Stack sx={{ display: 'flex', alignContent: 'flex-end'}} key={index}>
                                <Typography variant="h4" component="div" >
                                    {output.name}: {(parseInt(props.totals)+output.constant)}
                                </Typography>
                            </Stack>
                        )}

                    </Stack>
                </Container>
            </Stack>
        </Box>
    );
}