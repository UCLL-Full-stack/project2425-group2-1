// pages/[id].tsx
import { GetServerSideProps } from 'next';
import MemberService from '@/services/MemberService';
import { Member } from '@/types';
import { Container, Box, Typography, Card, CardContent, Avatar, List, ListItem, ListItemText, Divider, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';

type MemberPageProps = {
  member: Member | null;
  error: string | null;
};

const PageContainer = styled(Container)(({ theme }) => ({
  backgroundColor: '#f0f2f5',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  width: '100%',
  maxWidth: 600,
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  marginBottom: theme.spacing(2),
  backgroundColor: '#3f51b5',
}));

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(dateString));
};

const MemberPage = ({ member, error }: MemberPageProps) => {
  if (!member && !error) {
    return (
      <PageContainer maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography color="error">{error}</Typography>
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <StyledAvatar alt={member?.username} src="/static/images/avatar/1.jpg" />
        <Typography variant="h4" gutterBottom>{member?.username}</Typography>
        <StyledCard>
          <CardContent>
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Email" secondary={member?.email} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Phone Number" secondary={member?.phoneNumber} />
              </ListItem>
            </List>
            <Typography variant="h6" gutterBottom>Profile</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Name" secondary={member?.profile.name} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Surname" secondary={member?.profile.surname} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Height" secondary={`${member?.profile.height} cm`} />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText primary="Weight" secondary={`${member?.profile.weight} kg`} />
              </ListItem>
            </List>
            <Typography variant="h6" gutterBottom>Payments</Typography>
            <List>
              {member?.payment.map((payment, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`Amount: $${payment.amount}`}
                    secondary={`Date: ${formatDate(payment.date.toString())} | Due Date: ${formatDate(payment.dueDate.toString())} | Status: ${payment.paymentStatus ? 'Paid' : 'Unpaid'}`}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </StyledCard>
      </Box>
    </PageContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const member = await MemberService.getMemberById(Number(id));
    return {
      props: {
        member,
        error: null,
      },
    };
  } catch (error) {
    return {
      props: {
        member: null,
        error: (error as Error).message,
      },
    };
  }
};

export default MemberPage;