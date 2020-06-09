import React  from 'react';
import {ErrorMessage, Field} from 'formik';
import {TextField,
    InputLabel, MenuItem, FormHelperText, FormControl, Select
 } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    fieldStyles: {
        margin: '10px',
    },
    selectStyles: {
        margin: '10px'
    }
})

const FormikField = ({name,label, required,type='text'}) => {
    const classes= useStyles()
    return (
        <div className={classes.fieldStyles} >
    {/* 
material-ui styling Formik-Field
(TextField, helperText, fullWidth, required(adding * in helperText-label)
Formik Field include onChange handler and pass value to onSubmit, resulting
no useState hook needed.
    */}
            <Field
                required = {required}
                autoComplete='off'
                as={TextField}
                label={label}
                name={name}
                type={type}
                fullWidth
                helperText={<ErrorMessage name={name} />}
            />
        </div>
    
    )
}

/*
Field inheritance - value, name, onChange, onBlur
ReactNode as children from react
*/
const MaterialUISelectField = ({errStr, label, children, required,
        value, name, onChange, onBlur}) => {
    return (
        <FormControl fullWidth>
            <InputLabel  required={required} >{label}</InputLabel>
            <Select name={name} onChange={onChange} onBlur={onBlur} value={value}>
                {children}
            </Select>
            <FormHelperText>{errStr}</FormHelperText>
        </FormControl>
    )
}
const FormikSelect = ({name, label, items, required}) => {
    const classes = useStyles()
    return (
        <div className={classes.selectStyles} >
            <Field name={name} 
                as={MaterialUISelectField} 
                required={required}
                label={label}
                errStr={<ErrorMessage name={name} />}
            >
                {items.map(item => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Field>
        </div>
    )
}

export { FormikField, FormikSelect}
 