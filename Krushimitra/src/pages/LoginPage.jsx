import React from 'react'
import {Button, Card, Container, Form} from 'react-bootstrap'
import {LogIn} from 'lucide-react'

function LoginPage() {
  return (
    <Container className='mt-5'>
    <div>
      <Card>
        <Card.Header className='text-center'>
            <LogIn size={40} className='mb-2 text-primary'/>
            <h3>Login to KrushiMitra</h3>
        </Card.Header>
      <Card.Body>     

      <Form >
        <Form.Group className='mb-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                type='email'


                placeholder='Enter your email'
                required
            
            />
        </Form.Group>

        <Form.Group className='mb-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                type='password'


                placeholder='Enter your password'
                required
            />
        </Form.Group>

        <Button
          variant='primary'
          type='submit'
          className='w-100 mb-3'
        >

        </Button>
      </Form>

      <div className="text-center">
        <p>
            Don't have an account?{' '}
            <Button
                variant='link'
                className='p-0'
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
