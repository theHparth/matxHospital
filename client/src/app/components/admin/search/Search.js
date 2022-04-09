import React, { useState } from 'react'
import { styled, useTheme } from '@mui/system'
import { Icon, IconButton } from '@mui/material'
import { topBarHeight } from 'app/utils/constant'

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 25,
    left: 1135,
    zIndex: 9,
    width: '24.5%',
    // display: 'flex',
    paddingRight: '90px',
    alignItems: 'center',
    height: topBarHeight,
    // background: theme.palette.primary.main,
    // color: theme.palette.text.primary,
    // '&::placeholder': {
    //     color: theme.palette.text.primary,
    // },
}))

const SearchInput = styled('input')(({ theme }) => ({
    width: '100%',
    // border: 'none',
    // outline: 'none',
    fontSize: '1rem',
    paddingLeft: '10px',
    height: 'calc(100% - 25px)',
    // background: theme.palette.primary.main,
    // color: theme.palette.text.primary,
    // '&::placeholder': {
    //     color: theme.palette.text.primary,
    // },
}))

const SearchBox = ({ onSearch, onSearchValueChange }) => {
    const [open, setOpen] = useState(true)
    const toggle = () => {
        setOpen(!open)
    }
    const { palette } = useTheme()
    const textColor = palette.text.primary
    const iconStyle = { color: textColor }
    const onSearchProps = (value) => {
        onSearch(value)
    }

    return (
        <React.Fragment>
            {!open && (
                <SearchContainer>
                    <IconButton onClick={toggle}>
                        <Icon sx={iconStyle}>search</Icon>
                    </IconButton>
                </SearchContainer>
            )}

            {open && (
                <SearchContainer>
                    <SearchInput
                        type="text"
                        value={onSearchValueChange}
                        placeholder="Search here..."
                        autoFocus
                        onChange={(e) => onSearchProps(e.target.value)}
                    />
                    {/* <IconButton
                        onClick={toggle}
                        sx={{ mx: 2, verticalAlign: 'middle' }}
                    >
                        <Icon sx={{ color: textColor }}>close</Icon>
                    </IconButton> */}
                </SearchContainer>
            )}
        </React.Fragment>
        // <div>
        //     <SearchContainer>
        //         <SearchInput
        //             type="text"
        //             placeholder="Search here..."
        //             autoFocus
        //         />
        //     </SearchContainer>
        //     {/* )} */}
        // </div>
    )
}

export { SearchBox, SearchInput, SearchContainer }
