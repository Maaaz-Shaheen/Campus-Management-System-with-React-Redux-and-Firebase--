import React from 'react';
import { connect } from 'react-redux';
import { Alert, Form, Col, FormGroup, Label, Input, Container, Card, Button, CardHeader, CardFooter, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { startSignupAction, resetAuthStateAction, startLoginAction } from '../actions/auth';
import LoaderGif from '../images/loader.gif';

class UserAuthForm extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.case === "Student Signup") {
            this.state = {
                userName: '',
                userEmail: '',
                userPassword: '',
                rollNum: '',
                section : '',
                qualification : '',
                recentGrade : '',
                contact : '',
            }
        }
        else if (this.props.case === "Company Signup") {
            this.state = {
                companyName: '',
                userEmail: '',
                userPassword: '',
            };
        }
        else if (this.props.case === 'Admin Signup') {
            this.state = {
                userEmail: '',
                userPassword: '',
            };
        }
        else if (this.props.case === 'Login') {
            this.state = {
                userEmail: '',
                userPassword: '',
            };
        }
    };


    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleOnSubmit = (e) => {
        e.preventDefault();
        if (this.props.case === "Student Signup") {
            this.props.startSignupAction(this.state, 'student');
        }
        else if (this.props.case === "Company Signup") {
            this.props.startSignupAction(this.state, 'company');
        }
        else if (this.props.case === "Admin Signup") {
            this.props.startSignupAction(this.state, 'admin');
        }
        else if (this.props.case === 'Login') {
            this.props.loginAction(this.state);
        }
    }

    render() {
        return (
            <Container className="py-5">
                <Col sm={{ size: 8, offset: 2 }} md={{ size: 6, offset: 3 }}>
                    <Card outline color="primary">
                        <CardHeader className="text-center" style={{ backgroundColor: '#0275d8', color: '#FFFFFF' }}>{this.props.case} Form</CardHeader>
                        <CardBody >

                            <Form onSubmit={this.handleOnSubmit}>
                                <FormGroup>
                                    <Label for="userEmail">Email</Label>
                                    <Input value={this.state.userEmail} onChange={this.inputHandler} type="email" name="userEmail" id="userEmail" placeholder="Please enter email" required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="userPassword">Password</Label>
                                    <Input value={this.state.userPassword} onChange={this.inputHandler} type="password" name="userPassword" id="userPassword" placeholder="Please enter password" required />
                                </FormGroup>


                                {/* Signup fields!! */}

                                {
                                    this.props.case === "Student Signup" ? (
                                        <div>
                                            <FormGroup>
                                                <Label for="userName">Name :</Label>
                                                <Input value={this.state.userName} onChange={this.inputHandler} type="text" name="userName" id="userName" placeholder="Please enter your full name" required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="rollNum">Roll Number</Label>
                                                <Input value={this.state.rollNum} onChange={this.inputHandler} type="text" name="rollNum" id="rollNum" placeholder="Please enter your roll number" required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="contact">Contact</Label>
                                                <Input value={this.state.contact} onChange={this.inputHandler} type="number" name="contact" id="contact" placeholder="Please enter your contact number" required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="section">Section</Label>
                                                <Input value={this.state.section} onChange={this.inputHandler} type="text" name="section" id="section" placeholder="Please enter your section" required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="qualification">Qualification's</Label>
                                                <Input value={this.state.qualification} onChange={this.inputHandler} type="textarea" name="qualification" id="qualification" placeholder="Please enter your qualifications" required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="recentGrade">Most Recent Grade</Label>
                                                <Input value={this.state.recentGrade} onChange={this.inputHandler} type="text" name="recentGrade" id="recentGrade" placeholder="Please enter your most recent grade" required />
                                            </FormGroup>
                                        </div>
                                    ) : undefined
                                }

                                {
                                    this.props.case === "Company Signup" ? (
                                        <FormGroup>
                                            <Label for="companyName">Company Name </Label>
                                            <Input value={this.state.companyName} onChange={this.inputHandler} type="text" name="companyName" id="companyName" placeholder="Please enter your company name" required />
                                        </FormGroup>
                                    ) : undefined
                                }

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

                                <Button color="primary" className="float-right">
                                    {this.props.case}
                                </Button>
                            </Form>

                        </CardBody>
                        <CardFooter style={{ backgroundColor: '#0275d8', color: '#FFFFFF' }} className="text-center">
                            {
                                (this.props.case === "Student Signup" || this.props.case === "Company Signup" || this.props.case === "Admin Signup") ? (<Link to="/" onClick={this.props.resetAuthState} className="text-white">Already have an account? Login here!</Link>) : undefined
                            }

                            {
                                this.props.case === "Login" ? (<Link to="/signup" onClick={this.props.resetAuthState} className="text-white">Don't have an account? Signup here!</Link>) : undefined
                            }
                        </CardFooter>
                    </Card>
                </Col>
            </Container>
        )
    };
}


const mapStateToProps = (state) => ({
    hasErrored: state.auth.hasErrored,
    isProcessing: state.auth.isProcessing,
    error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
    startSignupAction: (userObj, userType) => dispatch(startSignupAction(userObj, userType)),
    loginAction: (userObj) => dispatch(startLoginAction(userObj)),
    resetAuthState: () => dispatch(resetAuthStateAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAuthForm);