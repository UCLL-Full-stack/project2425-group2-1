import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import Head from 'next/head';
import Header from "@/components/header";

const NotImplementedPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Implemented</title>
      </Head>
      <Header />
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            This page has not been implemented yet. It has to do with continuing stories :)
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default NotImplementedPage;