
export default function Output(total){
    

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
                </Container>
            </Stack>
        </Box>
    );
}