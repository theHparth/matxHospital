import React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, styled } from '@mui/system'
import { Icon } from '@mui/material'

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
}))

const SecondaryHeading = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    // color: theme.palette.text.secondary,
}))
const ThirdHeading = styled(Typography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    // color: theme.palette.text.thirdaly,
}))

const SearchIcon = styled(Icon)(() => ({
    marginLeft: 500,
    // marginBottom: '4px',
    verticalAlign: 'middle',
}))

export { Heading, SecondaryHeading, ThirdHeading, SearchIcon }

// export default function ControlledExpansionPanels() {
//     const [expanded, setExpanded] = React.useState(false)
//     const handleChange = (panel) => (event, isExpanded) => {
//         setExpanded(isExpanded ? panel : false)
//     }

//     return (
//         <Box width="100%">
//             <Accordion
//                 expanded={expanded === 'panel1'}
//                 onChange={handleChange('panel1')}
//             >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel1bh-content"
//                     id="panel1bh-header"
//                 >
//                     <Heading>General settings</Heading>
//                     <SecondaryHeading>I am an expansion panel</SecondaryHeading>
//                     <ThirdHeading>third one</ThirdHeading>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Nulla facilisi. Phasellus sollicitudin nulla et quam
//                         mattis feugiat. Aliquam eget maximus est, id dignissim
//                         quam.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             {/* //////////////////////// */}
//             <Accordion
//                 expanded={expanded === 'panel2'}
//                 onChange={handleChange('panel2')}
//             >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel2bh-content"
//                     id="panel2bh-header"
//                 >
//                     <Heading>Users</Heading>
//                     <SecondaryHeading>
//                         You are currently not an owner
//                     </SecondaryHeading>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Donec placerat, lectus sed mattis semper, neque lectus
//                         feugiat lectus, varius pulvinar diam eros in elit.
//                         Pellentesque convallis laoreet laoreet.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion
//                 expanded={expanded === 'panel3'}
//                 onChange={handleChange('panel3')}
//             >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel3bh-content"
//                     id="panel3bh-header"
//                 >
//                     <Heading>Advanced settings</Heading>
//                     <SecondaryHeading>
//                         Filtering has been entirely disabled for whole web
//                         server
//                     </SecondaryHeading>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Nunc vitae orci ultricies, auctor nunc in, volutpat
//                         nisl. Integer sit amet egestas eros, vitae egestas
//                         augue. Duis vel est augue.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//             <Accordion
//                 expanded={expanded === 'panel4'}
//                 onChange={handleChange('panel4')}
//             >
//                 <AccordionSummary
//                     expandIcon={<ExpandMoreIcon />}
//                     aria-controls="panel4bh-content"
//                     id="panel4bh-header"
//                 >
//                     <Heading>Personal data</Heading>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                     <Typography>
//                         Nunc vitae orci ultricies, auctor nunc in, volutpat
//                         nisl. Integer sit amet egestas eros, vitae egestas
//                         augue. Duis vel est augue.
//                     </Typography>
//                 </AccordionDetails>
//             </Accordion>
//         </Box>
//     )
// }
