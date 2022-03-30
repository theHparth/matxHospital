import React, { useState } from 'react'
import { styled, useTheme } from '@mui/system'
import { Icon, IconButton } from '@mui/material'
import { topBarHeight } from 'app/utils/constant'

const SearchContainer = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 1100,
    zIndex: 9,
    paddingRight: '90px',
    alignItems: 'center',
    height: topBarHeight,
}))

const SearchInput = styled('input')(({ theme }) => ({
    width: '100%',
    fontSize: '1rem',
    paddingLeft: '20px',
    height: 'calc(100% - 25px)',
}))

const SearchBox = () => {
    return (
        <div>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Search here..."
                    autoFocus
                />
            </SearchContainer>
            {/* )} */}
        </div>
    )
}

export { SearchBox, SearchInput, SearchContainer }
