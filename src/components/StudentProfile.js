import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Input, Container, Card, Button, CardHeader, CardBody } from 'reactstrap';
import database from '../firebase/firebase';

class StudentProfile extends React.Component {

    state = {
        edit: false,
        ...this.props.userData,
    };

    inputHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    editAction = (updatedObj) => {
        const updatedObjToUpdate = {
            ...updatedObj,
        };
        delete updatedObjToUpdate.edit;
        console.log(updatedObjToUpdate)
        database.ref(`student/${this.props.userData.key}`).update(updatedObjToUpdate);
        this.toggleEdit();
    };

    toggleEdit = () => {
        this.setState((prevState) => ({
            edit: !prevState.edit,
        }));
    };

    render() {
        console.log(this.state)
        return (
            <Container className="py-5">
                <Col sm={{ size: 10, offset: 1 }} md={{ size: 10, offset: 1 }}>
                    <Card outline color="primary">
                        <CardHeader className="text-center" style={{ backgroundColor: '#0275d8', color: '#FFFFFF' }}>{this.props.case} User Data</CardHeader>
                        <CardBody >
                            <Row>
                                <Col>Name : </Col>
                                <Col>{
                                    (!this.state.edit) ? (
                                        this.state.userName
                                    ) : (
                                            <Input value={this.state.userName} onChange={this.inputHandler} type="text" name="userName" id="userName" placeholder="Please enter your full name" required />

                                        )
                                }
                                </Col>
                            </Row>
                            <Row>
                                <Col>Email : </Col>
                                <Col>{
                                    (!this.state.edit) ? (
                                        this.state.userEmail
                                    ) : (
                                            <Input value={this.state.userEmail} onChange={this.inputHandler} type="text" name="userEmail" id="userEmail" placeholder="Please enter your full email" required />

                                        )
                                }
                                </Col>
                            </Row>
                            <Row>
                                <Col>Contact : </Col>
                                <Col>{
                                    (!this.state.edit) ? (
                                        this.state.contact
                                    ) : (
                                            <Input value={this.state.contact} onChange={this.inputHandler} type="text" name="contact" id="contact" placeholder="Please enter your full contact" required />
                                        )
                                }
                                </Col>
                            </Row>
                            <Row>
                                <Col>Qualification : </Col>
                                <Col>{
                                    (!this.state.edit) ? (
                                        this.state.qualification
                                    ) : (
                                            <Input value={this.state.qualification} onChange={this.inputHandler} type="textarea" name="qualification" id="qualification" placeholder="Please enter your full qualifications" required />
                                        )
                                }
                                </Col>
                            </Row>
                            <Row>
                                <Col>Roll Number : </Col>
                                <Col>{
                                    (!this.state.edit) ? (
                                        this.state.rollNum
                                    ) : (
                                            <Input value={this.state.rollNum} onChange={this.inputHandler} type="number" name="rollNum" id="rollNum" placeholder="Please enter your full roll number" required />
                                        )
                                }
                                </Col>
                            </Row>
                            <Row>
                                <Col>Section : </Col>
                                <Col>{
                                    (!this.state.edit) ? (
                                        this.state.section
                                    ) : (
                                            <Input value={this.state.section} onChange={this.inputHandler} type="text" name="section" id="section" placeholder="Please enter your section" required />
                                        )
                                }
                                </Col>
                            </Row>
                            <Row>
                                <Col>Recent Grade : </Col>
                                <Col>{
                                    (!this.state.edit) ? (
                                        this.state.recentGrade
                                    ) : (
                                            <Input value={this.state.recentGrade} onChange={this.inputHandler} type="text" name="recentGrade" id="recentGrade" placeholder="Please enter your full roll number" required />
                                        )
                                }
                                </Col>
                            </Row>

                            {
                                (!this.state.edit) ? (
                                    <Button color='info' outline className="float-right" onClick={this.toggleEdit}>Edit</Button>

                                ) : (
                                        <Button color='success' outline className="float-right" onClick={()=> this.editAction(this.state)}>Save</Button>
                                    )
                            }
                        </CardBody>
                    </Card>
                </Col>
            </Container>
        )
    };
};
const mapStateToProps = (state) => {
    return {
        userData: state.auth.authUserData,
    };
};

export default connect(mapStateToProps)(StudentProfile);