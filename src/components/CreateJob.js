import React from 'react';
import { connect } from 'react-redux';
import { Alert, Form, Col, FormGroup, Label, Input, Container, Card, Button, CardHeader, CardBody } from 'reactstrap';
import LoaderGif from '../images/loader.gif';
import {startCreateJobAction} from '../actions/jobs';
import {history} from '../routers/AppRouter';

class CreateJob extends React.Component {
    state = {
        jobTitle: '',
        jobDescription: '',
        vacancies: '',
    };

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        const jobObj = {
            ...this.props.authUserData,
            ...this.state,
        };
        this.props.createJob(jobObj);
        history.push('/viewJobs');
    }

    render() {
        return (
            <Container className="py-5">
                <Col sm={{ size: 8, offset: 2 }} md={{ size: 8, offset: 2 }}>
                    <Card outline color="primary">
                        <CardHeader className="text-center" style={{ backgroundColor: '#0275d8', color: '#FFFFFF' }}>{this.props.case} Create Job</CardHeader>
                        <CardBody>
                            <Form onSubmit={this.handleOnSubmit}>
                                <FormGroup>
                                    <Label for="jobTitle">Job Title</Label>
                                        <Input value={this.state.jobTitle} onChange={this.inputHandler} type="text" name="jobTitle" id="jobTitle" placeholder="Please enter Job Title" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="jobDescription">Job Description</Label>
                                    <Input value={this.state.jobDescription} onChange={this.inputHandler} type="textarea" name="jobDescription" id="jobDescription" placeholder="Please enter short description" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="vacancies">Number of vacancies</Label>
                                    <Input value={this.state.vacancies} min="0" onChange={this.inputHandler} type="number" name="vacancies" id="vacancies" placeholder="Please enter vacancies" required />
                                </FormGroup>
                                
                                {
                                    this.props.hasErrored ? (
                                        <Alert color="danger">
                                            {this.props.error.message}
                                        </Alert>
                                    ) : undefined
                                }

                                {
                                    this.props.isProcessing ? (
                                        <img className="loader" src={LoaderGif} alt="A loader" />
                                    ) : undefined
                                }

                                <Button color="primary" block>
                                    Create Job
                                </Button>
                            </Form>

                        </CardBody>
                    </Card>
                </Col>
            </Container>
        )
    };
}


const mapStateToProps = (state) => ({
    authUserData : state.auth.authUserData,
    // hasErrored: state.auth.hasErrored,
    // isProcessing: state.auth.isProcessing,
    // error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
    createJob : (jobObj) => dispatch(startCreateJobAction(jobObj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateJob);