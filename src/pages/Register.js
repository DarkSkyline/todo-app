import { useState } from "react";
import { useMutation } from '@apollo/client/react/hooks/useMutation'
import gql from 'graphql-tag'

function Register(){
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const onChangeUsername = (event) => {
        setValues({...values,[event.target.name]: event.target.value});
    }

    const onSubmit = (event) => {
        event.preventDefault();
    }

    const [addUser, { loading}] = useMutation(REGISTER_USER, {
        update(proxy, result){
            console.log(result)
        },
        variables: {
            username: values.username
        }
    })

    return (
        <div>
            <h1>Register Page</h1>
            <input type="text" onChange={onChangeUsername} value={values.username} placeholder="Username" name="username" /><br/>
            <input type="password" value={values.password} placeholder="Password" name="password" /><br />
            <input type="password" value={values.confirmPassword} placeholder="Confirm Password" name="confirmPassword" /><br />
            <button type="submit">Register</button>
        </div>
    );
}

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                password: $password
                passwordConfirm: $passwordConfirm
            }
        ) {
            id username createdAt token
        }
    }
`

export default Register;