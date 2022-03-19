import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function VendorInfo({changeModal, data}) {
    console.log("vendor info",data);
  return (
    <div style={{ height: 250, width: '100%' }}>
      <DataGrid
        columns={[{ field: 'key' }, {field: 'value'}]}
        rows={[
          { id: 1, key: 'React', value: "adjbvdfv" },
          { id: 2, key: 'MUI', value: "adjbvdfv" },
        ]}
      />
       <div style={{display: "flex", width: "200px", justifyContent: "space-between", margin: "auto"}}>
        <button onClick={changeModal}>Close</button>
        <button>Print</button>
        </div>
    </div>
  );
}
