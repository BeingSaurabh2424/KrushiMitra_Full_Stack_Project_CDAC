import React, { useState } from 'react'
import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'

function FarmerDashboard() {
    const [selectedTab, setSelectedTab] = useState('overview')
    const [showProductModal, setShowProductModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [alert, setAlert] = useState(null)

    const [productForm, setProductForm] = useState({
        name: '',
        category: '',
        price: '',
        unit: '',
        description: '',
        image: ''
    })

    return (
        <div>
            <div className='dashboard-header'>
                <Container>
                    <h2>Farmer Dashboard</h2>
                    <p>Welcome back, ! Manage your products and track orders.</p>
                </Container>

                <Container>
                    {alert && (
                        <Alert variant={alert.type} className='fade-in'>
                            {alert.message}
                        </Alert>
                    )}

                    {/* Navigation Tabs */}

                    <div className="mb-4">
                        <Button
                            variant={selectedTab === 'overview' ? 'primary' : 'outline-primary'}
                            className="me-2 mb-2"

                        >
                            OverView
                        </Button>
                        <Button>
                            My Products
                        </Button>
                        <Button
                            variant={selectedTab === 'orders' ? 'primary' : 'outline-primary'}
                            className='me-2 mb-2'
                        >
                            Orders
                        </Button>
                    </div>



                    {/* Product Modal    */}
                    <Modal show={showProductModal} size='lg'>
                        <Modal.Header closeButton>
                            <Modal.Title>{editingProduct ? 'Edit Product ' : 'Add New Product'}</Modal.Title>
                        </Modal.Header>
                        <Form>
                            <Modal.Body>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Product Name *</Form.Label>
                                            <Form.Control
                                                type='text'
                                                value={productForm.name}

                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Category *</Form.Label>
                                            <Form.Select
                                                value={productForm.category}

                                                required
                                            >
                                                <option value="">Select Category</option>
                                                <option value="Vegetables">Vegetables</option>
                                                <option value="Fruits">Fruits</option>
                                                <option value="Grains">Grains</option>
                                                <option value="Dairy">Dairy</option>
                                                <option value="Spices">Spices</option>
                                                <option value="Others">Others</option>

                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group className='mb-3'>
                                            <Form.Label>Price(₹) *</Form.Label>
                                            <Form.Control
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                value={productForm.price}

                                                required
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Unit *</Form.Label>
                                            <Form.Select
                                                value={productForm.unit}

                                                required
                                            >
                                                <option value="">Select Unit</option>
                                                <option value="kg">Kilogram (kg)</option>
                                                <option value="gram">Gram (g)</option>
                                                <option value="liter">Liter</option>
                                                <option value="piece">Piece</option>
                                                <option value="dozen">Dozen</option>
                                                <option value="bundle">Bundle</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        value={productForm.description}

                                        placeholder="Describe your product..."
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control
                                        type="url"
                                        value={productForm.image}

                                        placeholder="https://example.com/image.jpg (optional)"
                                    />
                                    <Form.Text className="text-muted">
                                        Leave empty to use default image
                                    </Form.Text>
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" >
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                    {editingProduct ? 'Update Product' : 'Add Product'}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </Container>

            </div>

        </div>
    )
}

export default FarmerDashboard
