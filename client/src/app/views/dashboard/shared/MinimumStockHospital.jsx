import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, useTheme } from '@mui/system'
import {
    SimpleCard,
    Heading,
    SecondaryHeading,
    ContainerTable,
    StyledTable,
    StockAlert,
} from 'app/components'
import {
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
} from '@mui/material'
import React, { useEffect } from 'react'
// import
import { hospitalMinimumTheresold } from 'app/redux/actions/admin/HospitalActions'
import { useDispatch, useSelector } from 'react-redux'
const AllStockOutTrueStatus = () => {
    const { palette } = useTheme()
    const bgError = palette.error.main
    const bgSecondary = palette.secondary.main

    const [rowsPerPage, setRowsPerPage] = React.useState(10)
    const [page, setPage] = React.useState(0)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }
    // for panel setup
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    // important
    let { minimumThresold = [] } = useSelector((state) => state.hospitalList)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(hospitalMinimumTheresold())
        setExpanded(false)
    }, [dispatch])

    console.log('minimumThresold', minimumThresold)
    return (
        <ContainerTable>
            <SimpleCard>
                <Box width="100%">
                    <AccordionSummary
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <SecondaryHeading>Hospital Name</SecondaryHeading>
                    </AccordionSummary>
                    {/* data print start from here*/}
                    {minimumThresold
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((subscriber, index) => (
                            <Accordion
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                key={index}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2bh-content"
                                    id="panel2bh-header"
                                >
                                    <Heading> {subscriber._id}</Heading>
                                </AccordionSummary>
                                <AccordionDetails
                                    style={{ backgroundColor: '#F5F5F5' }}
                                >
                                    <StyledTable>
                                        <TableHead
                                            style={{
                                                backgroundColor: '#EBF5FB',
                                            }}
                                        >
                                            <TableRow>
                                                <TableCell>
                                                    Stock Name
                                                </TableCell>
                                                <TableCell>Total Qty</TableCell>
                                                <TableCell>
                                                    Minimum required quantity
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {subscriber.belowLimit.map(
                                                (subscriber, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>
                                                            {
                                                                subscriber.stock_name
                                                            }
                                                        </TableCell>
                                                        <TableCell>
                                                            {subscriber.totalQtyUser ? (
                                                                <StockAlert
                                                                    bgcolor={
                                                                        bgSecondary
                                                                    }
                                                                >
                                                                    {
                                                                        subscriber.totalQtyUser
                                                                    }{' '}
                                                                    available
                                                                </StockAlert>
                                                            ) : (
                                                                <StockAlert
                                                                    bgcolor={
                                                                        bgError
                                                                    }
                                                                >
                                                                    out of stock
                                                                </StockAlert>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            {
                                                                subscriber.minimumLimit
                                                            }
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </StyledTable>
                                </AccordionDetails>
                            </Accordion>
                        ))}

                    <TablePagination
                        sx={{ px: 2 }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={minimumThresold.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Box>
            </SimpleCard>
        </ContainerTable>
    )
}

export default AllStockOutTrueStatus

// import React from 'react'
// import { useTheme } from '@mui/system'
// import { Timeline } from '@mui/lab'
// import RecentUpdateCard from './RecentUpdateCard'
// import { Card, useMediaQuery } from '@mui/material'

// const RecentUpdates = () => {
//     const theme = useTheme()
//     const isMobile = useMediaQuery(theme.breakpoints.down('xs'))

//     return (
//         <Card
//             elevation={3}
//             sx={{ mx: 'auto', maxWidth: 900, p: !isMobile && 5 }}
//         >
//             <Timeline align="left">
//                 {updateList.map((notification, ind) => (
//                     <RecentUpdateCard
//                         notification={notification}
//                         isLastIndex={ind === updateList.length - 1}
//                         isFirstIndex={ind === 0}
//                         key={ind}
//                     />
//                 ))}
//             </Timeline>
//         </Card>
//     )
// }

// const updateList = [
//     {
//         title: 'What is Lorem Ipsum?',
//         subtitle:
//             "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//         timestamp: '2020/09/15',
//     },
//     {
//         title: 'Why do we use it?',
//         subtitle:
//             "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//         timestamp: '2020/08/1',
//     },
//     {
//         title: 'Where can I get some?',
//         subtitle:
//             "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//         timestamp: '2020/07/05',
//     },
//     {
//         title: 'Where does it come from?',
//         subtitle:
//             "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
//         timestamp: '2020/05/12',
//     },
// ]
// export default RecentUpdates
