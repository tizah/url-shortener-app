import React, { useState, useEffect} from 'react'
import axios from "axios";
import {TextField, Button, Container} from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MouseIcon from '@material-ui/icons/Mouse';
import Badge from '@material-ui/core/Badge';




import './App.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 700,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];



function App() {

  const classes = useStyles();

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000/api/url';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';


  const [url, setUrl] = useState('');
  const [data, setData] = useState();

  useEffect( () => {

    const getAllUrls =  async () => {
      const result = await axios.get('/');
      return result;
    }
    getAllUrls().then(x => { setData(x.data)})
  }, [data]);


  const handle_submit = () => {
   axios.post('shorten', {longUrl: url});
    setUrl('');
  }

  return (
    <div className="App">
      simple url shortener <br/>
      <Container maxWidth="xl">
      <TextField fullWidth id="outlined-basic" label="Enter Url" variant="outlined" onChange={event => setUrl(event.target.value)} />
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<SaveIcon />}
        onClick={handle_submit}
      >
        Save
      </Button>
     
       <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Long Url</StyledTableCell>
            <StyledTableCell align="right">Short Url</StyledTableCell>
            <StyledTableCell align="right">N0 of Access (clicks)</StyledTableCell>
          </TableRow>
          </TableHead>
        <TableBody>
{
  data && data.map((x, index) => (
    <StyledTableRow key={index}>
 <StyledTableCell  scope="row">
                {x.longUrl}
              </StyledTableCell>
              <StyledTableCell align="right"><a href={x.shortUrl} target='_blank'>{x.shortUrl}</a></StyledTableCell>
              <StyledTableCell align="right">
              <Badge color="secondary" badgeContent={x.clickCount} showZero>
  <MouseIcon />
</Badge>
              </StyledTableCell>

    </StyledTableRow>
  ))  
}
        </TableBody>
        </Table>
    </TableContainer>
    </Container>
    </div>
  );
}

export default App;
