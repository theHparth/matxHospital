import {
    FormRow,
    FormRowSelect,
    Alert,
    HospitalContainer,
} from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import HospitalReport from './HospitalReport'

const AddJob = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        handleChange,
        clearValues,
        address,
        contect,
        email,
        pincode,
        addHospital,
        editHospital,
    } = useAppContext()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!address || !pincode || !contect || !email) {
            displayAlert()
            return
        }
        if (isEditing) {
            editHospital()
            return
        }
        addHospital()
    }

    // const handleHospitalInput = (e) => {
    //     const name = e.target.name
    //     const value = e.target.value
    //     handleChange({ name, value })
    // }

    return (
        <Wrapper>
            <Wrapper>
                <form className="form">
                    <h3>{isEditing ? 'edit Hospital' : 'add Hospital'}</h3>
                    {showAlert && <Alert />}
                    <div className="form-center">
                        {/* position */}
                        <FormRow
                            type="text"
                            name="address"
                            value={address}
                            handleChange={handleHospitalInput}
                        />
                        {/* company */}
                        <FormRow
                            type="text"
                            name="contect"
                            value={contect}
                            handleChange={handleHospitalInput}
                        />
                        {/* location */}
                        <FormRow
                            type="email"
                            labelText="Email"
                            name="email"
                            value={email}
                            handleChange={handleHospitalInput}
                        />
                        <FormRow
                            type="text"
                            labelText="Pincode"
                            name="pincode"
                            value={pincode}
                            handleChange={handleHospitalInput}
                        />

                        {/* btn container */}
                        <div className="btn-container">
                            <button
                                type="submit"
                                className="btn btn-block submit-btn"
                                onClick={handleSubmit}
                                disabled={isLoading}
                            >
                                submit
                            </button>
                            <button
                                className="btn btn-block clear-btn"
                                onClick={(e) => {
                                    e.preventDefault()
                                    clearValues()
                                }}
                            >
                                clear
                            </button>
                        </div>
                    </div>
                </form>
            </Wrapper>
            <Wrapper>
                {/*  hospitalReport */}
                <div>
                    <HospitalContainer />
                </div>
            </Wrapper>
        </Wrapper>
    )
}

export default AddJob
