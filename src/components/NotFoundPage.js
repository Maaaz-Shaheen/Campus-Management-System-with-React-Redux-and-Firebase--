import React from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Container, Button } from 'reactstrap';

const NotFoundPage = () => {
    return (
        <div>

            <Container fluid>
                <Jumbotron className="text-center m-5">
                    <h1 className="display-3">Error 404!!</h1>
                    <p className="lead"> Page not found!</p>
                    <p>Exploring is good and all but home is safer. Click the button to return to the dashboard.</p>
                    <p className="lead">
                        <Button tag={Link} to="/dashboard" color="primary">To home!</Button>
                    </p>
                </Jumbotron>
            </Container>

        </div>
    );
};

export default NotFoundPage;
