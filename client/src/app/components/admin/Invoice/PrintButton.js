import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

import AutoGenerateInvoice from './AutoGenerateInvoice'

const PrintButton = () => {
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <div>
            <AutoGenerateInvoice ref={componentRef} />
            <button onClick={handlePrint}>Print this out!</button>
        </div>
    )
}

export default PrintButton
