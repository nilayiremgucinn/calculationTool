import { Backdrop, Button, CircularProgress, Container, FormControl, Paper, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { Navigate } from "react-router-dom";
import { Add, Close } from '@mui/icons-material';
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

export default function Output(totals){
    const [pageData, setPageData] = useState(DEFAULT_OUTPUT_PAGE);

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

                        {pageData.outputs.map((output, index) =>
                            <Typography variant="subtitle2" component="div" key='description' >
                                {totals[index]}
                            </Typography>
                        )}
                    </Stack>
                </Container>
            </Stack>
        </Box>
    );
}