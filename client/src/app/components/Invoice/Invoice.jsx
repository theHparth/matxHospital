import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import { Container } from "@material-ui/core";

// import "./styles.css"

export default function Invoice({changeModal, data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Example data (invoice items)
  const invoiceItems = [
    {
      qty: 1,
      price: 84.99,
      subtotal: 84.99,
      currency: "USD",
      name: "Gaming Headset"
    },
    {
      qty: 2,
      price: 99.99,
      subtotal: 199.98,
      currency: "USD",
      name: "Gaming Controller"
    },
    {
      qty: 1,
      price: 19.99,
      subtotal: 19.99,
      currency: "USD",
      name: "USB PowerPort"
    },
    {
      qty: 5,
      price: 5.08,
      subtotal: 25.4,
      currency: "USD",
      name: "Smartphone Screen Protector"
    },
    {
      qty: 1,
      price: 21.99,
      subtotal: 21.99,
      currency: "USD",
      name: "Leather Belt"
    }
  ];

  const reducer = (acc, value) => acc + value;

  console.log("jisoo", Object.keys(invoiceItems[0]));
  console.log("lisa", invoiceItems.map((item) => item.name).sort());

  return (
    <Container maxWidth="md">
      <h2 style={{ textAlign: "center" }}>Invoice</h2>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{Object.keys(invoiceItems[0])[4]}</TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[0]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[1]}
                </TableCell>
                <TableCell align="right">
                  {Object.keys(invoiceItems[0])[2]}
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {invoiceItems
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((item) => item.subtotal > 0)
                .sort((a, b) => (a.name > b.name ? 1 : -1))
                .map((item) => {
                  return (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell align="right">{item.qty} </TableCell>
                      <TableCell align="right">
                        {" "}
                        {(item.price * 0.84).toFixed(2)}{" "}
                      </TableCell>
                      <TableCell align="right">
                        {(item.subtotal * 0.84).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">
                  <strong>Total Amount in EUR</strong>
                </TableCell>
                <TableCell align="right">
                  {invoiceItems
                    .map((item) => item.subtotal * 0.84)
                    .reduce((acc, value) => acc + value)
                    .toFixed(2)}{" "}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={invoiceItems.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        <div style={{display: "flex", width: "200px", justifyContent: "space-between", margin: "auto"}}>
        <button onClick={changeModal}>No</button>
        <button>Print</button>
        </div>
        
      </Paper>
    </Container>
  );
}
