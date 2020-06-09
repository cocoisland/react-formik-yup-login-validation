import React from 'react';
import {Formik, Form } from 'formik';
import * as Yup from 'yup';
import {FormikField, FormikSelect} from './FormikMaterialUi';
import Button from '@material-ui/core/Button';

const invalidEmail = [
    'test@gmail.com',
    'nobody@abc.com'
];

const lowerCaseRegex = /(?=.*[a-z])/ ;
const upperCaseRegex = /(?=.*[A-Z])/ ;
const numericRegex = /(?=.*[0-9])/ ;

const signInSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Minimum 4 characters')
        .required('Name required'),
    email: Yup.string()
        .lowercase()
        .email('Must be a valid email')
        .notOneOf(invalidEmail, 'Email already taken!')
        .required('Email required'),
    password: Yup.string()
        .matches(lowerCaseRegex, 'one lowercase required!')
        .matches(upperCaseRegex, 'one uppercase required!')
        .matches(numericRegex, 'one number required!')
        .min(8, 'Minimum 8 characters required!')
        .required('Password required'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password')], 'password not the same')
        .required('Confirm password required'),
    position: Yup.string()
        .required('Must choose a role')
})

const selectItems = [
    {label:'Choose a role', value:''},
    {label:'Front End', value:'front_end'},
    {label:'Back End', value:'back_end'},
    {label:'Dev Ops', value:'devOps'},
    {label:'QA', value:'qa'}
]

const LoginPage = () => {
    //formik Form handlesubmit perform preventDefault
    const handleSubmit = (values) => {
        console.log(values.name,values.email, values.password, values.position)
        alert(JSON.stringify(values));
    }

    return (
        <div className='LoginPage' >
            <h1>Sign Up</h1>
            <Formik 
                initialValues={{name:'', email:'', password:'', passwordConfirm:'', position:''}}
                onSubmit={handleSubmit} 
                validationSchema={signInSchema}
            >
            { ({ isValid, dirty, handleReset }) => (
                <Form>
        {/* 
        isValid - props from Formik wrapper which return true if validationSchema passed.
        dirty - props from Formik wrapper which return true if initialValues has been visited.
        formik Field replace input onChange
        */}
                <FormikField name='name' label='Name' required={true}/>
                <FormikField name='email' label='Email' required={true} />
                <FormikField name='password' label='Password' required={true} type='password' />
                <FormikField name='passwordConfirm' label='PasswordConfirm' required={true} type='password' />
                
                <FormikSelect name='position' label='Position' required={true} items={selectItems} />

                 <Button variant='contained' color='primary'
                    disabled={!isValid || !dirty} type='submit'>
                        Submit
                </Button>
                <span> </span>
                <Button variant='contained' onClick={handleReset} type='button'>Reset</Button>
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default LoginPage;