import React from 'react';
import { Row, Container, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const SigunupPage = () => {
    return (
        <Container className="p-5">
            <Row className="p-5">
                <Button color="primary" block className="text-white" tag={Link} to="/studentSignup" >Student</Button>
            </Row>
            <Row className="p-5">
                <Button color="info" block className="text-white" tag={Link} to="/CompanySignup">Company</Button>
            </Row>
            <Row className="p-5">
                <Button color="warning" block className="text-white" tag={Link} to="/adminSignup">Admin</Button>
            </Row>
        </Container>
    );
};

export default SigunupPage;