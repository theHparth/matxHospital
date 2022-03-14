import {
    Card,
    Grid,
    Button,
    Checkbox,
    CircularProgress,
    FormControlLabel,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { Paragraph, Span } from 'app/components/Typography'

// import useAuth from 'app/hooks/useAuth'

import { useAppContext } from '../../../contexts/JWTAuthContext'
import { Alert } from '../../../components'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const JwtLogin = () => {
    const navigate = useNavigate()

    const [values, setValues] = useState(initialState)
    const { user, isLoading, showAlert, displayAlert, setupUser } =
        useAppContext()

    // const [loading, setLoading] = useState(false)
    // const [userInfo, setUserInfo] = useState({
    //     // email: 'jason@ui-lib.com',
    //     // password: 'dummyPass',
    //     email: 'z@gmail.com',
    //     password: 'zzzzzz',
    // })
    // const [message, setMessage] = useState('')
    // const { login } = useAuth()

    // const handleChange = ({ target: { name, value } }) => {
    //     let temp = { ...userInfo }
    //     temp[name] = value
    //     setUserInfo(temp)
    // }

    // const { palette } = useTheme()
    // const textError = palette.error.main
    // const textPrimary = palette.primary.main

    // const handleFormSubmit = async (event) => {
    //     setLoading(true)
    //     try {
    //         await login(userInfo.email, userInfo.password)
    //         navigate('/')
    //     } catch (e) {
    //         console.log(e)
    //         setMessage(e.message)
    //         setLoading(false)
    //     }
    // }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        if (isMember) {
            setupUser({
                currentUser,
                endPoint: 'login',
                alertText: 'Login Successful! Redirecting...',
            })
        } else {
            setupUser({
                currentUser,
                endPoint: 'register',
                alertText: 'User Created! Redirecting...',
            })
        }
    }

    useEffect(() => {
        if (user) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [user, navigate])

    return (
        <JWTRoot>
            <Card className="card">
                <Grid container>
                    <Grid item lg={5} md={5} sm={5} xs={12}>
                        <JustifyBox p={4} height="100%">
                            <IMG
                                src="/assets/images/illustrations/dreamer.svg"
                                alt=""
                            />
                        </JustifyBox>
                    </Grid>
                    <Grid item lg={7} md={7} sm={7} xs={12}>
                        <ContentBox>
                            <ValidatorForm onSubmit={onSubmit}>
                                <h3>
                                    {values.isMember ? 'Login' : 'Register'}
                                </h3>
                                {!values.isMember && (
                                    <TextValidator
                                        sx={{ mb: 3, width: '100%' }}
                                        variant="outlined"
                                        size="small"
                                        label="Name"
                                        onChange={handleChange}
                                        type="email"
                                        name="name"
                                        value={values.name}
                                        validators={['required', 'isEmail']}
                                        errorMessages={[
                                            'this field is required',
                                            'email is not valid',
                                        ]}
                                    />
                                )}
                                <TextValidator
                                    sx={{ mb: 3, width: '100%' }}
                                    variant="outlined"
                                    size="small"
                                    label="Email"
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={[
                                        'this field is required',
                                        'email is not valid',
                                    ]}
                                />
                                <TextValidator
                                    sx={{ mb: '12px', width: '100%' }}
                                    label="Password"
                                    variant="outlined"
                                    size="small"
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    value={values.password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                {/* {showAlert && <Alert />} */}

                                {showAlert && (
                                    <Paragraph>
                                        <Alert />
                                    </Paragraph>
                                )}

                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={isLoading}
                                            type="submit"
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </FlexBox>
                                {/* <Button
                                    sx={{ color: textPrimary }}
                                    onClick={() =>
                                        navigate('/session/forgot-password')
                                    }
                                >
                                    Forgot password?
                                </Button> */}
                            </ValidatorForm>
                        </ContentBox>
                    </Grid>
                </Grid>
            </Card>
        </JWTRoot>
    )
}

export default JwtLogin
