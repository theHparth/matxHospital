import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box } from '@mui/system'
import {
    Breadcrumb,
    SimpleCard,
    Heading,
    SecondaryHeading,
    ThirdHeading,
    ContainerTable,
    StyledTable,
    SearchBox,
    DateChoose,
    MyAlert,
} from 'app/components'
import {
    IconButton,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Icon,
    TablePagination,
} from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

const ExpandedPenal = ({ firstHeader, secondHeader, thirdHeader }) => {
    return (
        <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
            <Heading>{firstHeader}</Heading>
            <SecondaryHeading>{secondHeader}</SecondaryHeading>
            <ThirdHeading>{thirdHeader}</ThirdHeading>
        </AccordionSummary>
    )
}

const AccordionComponent = ({
    index,
    index2,
    firstHeaderData,
    secondHeaderData,
    thirdHeaderData,
    tableFirstColumn,
    tableSecondColumn,
    tableThirdColumn,
    tableForthColumn,
    tableFifthColumn,
    tableSixthColumn,
    tableFirstInside,
    tableSecondInside,
    tableThirdInside,
    tableForthInside,
    tableFifthInside,
}) => {
    // for penal expand
    const [expanded, setExpanded] = React.useState(false)
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }
    return (
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
                <Heading>{firstHeaderData}</Heading>
                <SecondaryHeading>{secondHeaderData}</SecondaryHeading>
                <ThirdHeading>{thirdHeaderData}</ThirdHeading>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: '#F5F5F5' }}>
                <StyledTable>
                    <TableHead
                        style={{
                            backgroundColor: '#EBF5FB',
                        }}
                    >
                        <TableRow>
                            {tableFirstColumn && (
                                <TableCell>{tableFirstColumn}</TableCell>
                            )}
                            {tableSecondColumn && (
                                <TableCell>{tableSecondColumn}</TableCell>
                            )}
                            {tableThirdColumn && (
                                <TableCell>{tableThirdColumn}</TableCell>
                            )}
                            {tableForthColumn && (
                                <TableCell>{tableForthColumn}</TableCell>
                            )}
                            {tableFifthColumn && (
                                <TableCell>{tableFifthColumn}</TableCell>
                            )}
                            {tableSixthColumn && (
                                <TableCell>{tableSixthColumn}</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={index2}>
                            {tableFirstInside && (
                                <TableCell>{tableFirstInside}</TableCell>
                            )}
                            {tableSecondInside && (
                                <TableCell>{tableSecondInside}</TableCell>
                            )}
                            {tableThirdInside && (
                                <TableCell>{tableThirdInside}</TableCell>
                            )}
                            {tableForthInside && (
                                <TableCell>{tableForthInside}</TableCell>
                            )}
                            {tableFifthInside && (
                                <TableCell>{tableFifthInside}</TableCell>
                            )}
                        </TableRow>
                    </TableBody>
                </StyledTable>
            </AccordionDetails>
        </Accordion>
    )
}

export { ExpandedPenal, AccordionComponent }
