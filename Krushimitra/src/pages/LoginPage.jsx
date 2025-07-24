import React, { useState } from 'react'
import {Button, Card, Container, Form,Alert} from 'react-bootstrap'
import {LogIn} from 'lucide-react'

const LoginPage = ({onLogin,setCurrentPage}) => {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] =useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) =>{
    e.preventDeafault()
    setError('')
    setIsLoading(true)

    if(!email || !password){
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    setTimeout(()=>{
      const success = onLogin(email,password)
      if(!success) {
        setError('Invalid email or password')
      }
      setIsLoading(false)
    },1000)

  }


  return (
    <Container className='mt-5'>
    <div className='form-container fade-in'>
      <Card>
        <Card.Header className='text-center'>
            <LogIn size={40} className='mb-2 text-primary'/>
            <h3>Login to KrushiMitra</h3>
        </Card.Header>
      <Card.Body> 
         <h2>Welcome</h2>
        {error && <Alert variant="danger">{error}</Alert>}   

      <Form onSubmit={handleSubmit}>
        <Form.Group className='mb-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'
                value={email}
                onChange = {(e) =>setEmail(e.target.value)}
                placeholder='Enter your email'
                required
            />
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder='Enter your password'
                required
            />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          className='w-100 mb-3'
          disabled={isLoading}
        >
          {isLoading ? <span className='loading'></span>: 'Login'}
        </Button>
      </Form>

      <div className="text-center">
        <p>
            Don't have an account?{' '}
            <Button
                variant='link'
                className='p-0'
                onClick={()=> setCurrentPage('register')}
            >
                Register here
            </Button>
        </p>
      </div>
      
        </Card.Body>
      </Card>
    </div>
    
    </Container>
  )
}

export default LoginPage
