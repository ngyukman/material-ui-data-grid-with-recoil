import * as React from 'react';
import { DataGridPro, GridColDef, GridRenderCellParams, useGridApiContext, useGridApiRef } from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { useRecoilValue, useRecoilCallback } from 'recoil';
import { userListInitialState, userSelectorFamily } from './GridState';

const columns: GridColDef[] = [
  { field: 'id' },
  { field: 'username', width: 150 },
  { field: 'age', width: 80, type: 'number', renderCell: (params: GridRenderCellParams) => (<EditableCell { ...params } fieldName='age' />)
  }
];

function EditableCell(props: GridRenderCellParams & { fieldName: string }) {
    const context = useGridApiContext();
    const {id, value, fieldName} = props;

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        context.current.updateRows([{ id, [fieldName]: parseInt(e.target.value, 10)}]);
    }, [context, id, fieldName]);

    const updateRow = useRecoilCallback(({snapshot, set}) => async (newRow: any) => {
        const currentValue: any = await snapshot.getPromise(userSelectorFamily(newRow.id));
        if (currentValue[fieldName] !== newRow[fieldName]) {
            set(userSelectorFamily(newRow.id), _ => newRow);
        }
      }, [fieldName]);

    const onBlur = React.useCallback((e: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        updateRow(context.current.getRow(id));
    }, [context, updateRow, id]);
    return (
        <TextField value={value} onChange={onChange} onBlur={onBlur}  />
    );
}

export default function UpdateRowsApiRef() {
  const apiRef = useGridApiRef();
  const users = useRecoilValue(userListInitialState);


  console.log('re-render grid');

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ height: 400, mt: 1 }}>
        <DataGridPro
            rows={users}
            apiRef={apiRef} 
            columns={columns}
        />
      </Box>
    </Box>
  );
}