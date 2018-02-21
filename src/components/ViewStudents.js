import React from 'react';
import { Container, Row, Col, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import LoadingPage from './LoadingPage';
import { connect } from 'react-redux';
import { startGetStudents } from '../actions/students';

class ViewStudents extends React.Component {
    state = {
        loaded: false,
        modal: false,
        modalStudent: '',
    }

    componentDidMount() {
        this.props.getStudentsFromFB();
        this.setState(() => ({
            loaded: true,
        }))
    };


    toggle = () => {
        this.setState(() => ({
            modal: !this.state.modal
        }));
    }
    openModal = (i) => {
        const modalStudent = this.props.studentsArray[i];
        this.setState(()=>({
            modal: !this.state.modal,          
            modalStudent,
        }))
    };


    render() {
        console.log(this.state.modalStudent)
        return (
            this.state.loaded ? (
                <Container>
                    <Table className="py-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student Name</th>
                                <th>Student Email</th>
                                <th>Student Roll Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.studentsArray.map((data, i) => {
                                    return (
                                        <tr key={data.key}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{data.userName}</td>
                                            <td>{data.userEmail}</td>
                                            <td>{data.rollNum}</td>
                                            <td><Button color='primary' onClick={() => this.openModal(i)}>View Student</Button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Student Name</ModalHeader>
                        <ModalBody>
                            <Row>
                                <Col sm={3}>Name</Col>
                                <Col sm={9}>{this.state.modalStudent.userName}</Col>
                            </Row>
                            <Row>
                                <Col sm={3}>Roll Number</Col>
                                <Col sm={9}>{this.state.modalStudent.rollNum}</Col>
                            </Row>
                            <Row>
                                <Col sm={3}>Section </Col>
                                <Col sm={9}>{this.state.modalStudent.section}</Col>
                            </Row>
                            <Row>
                                <Col sm={3}>Email</Col>
                                <Col sm={9}>{this.state.modalStudent.userEmail}</Col>
                            </Row>
                            <Row>
                                <Col sm={3}>Qualification</Col>
                                <Col sm={9}>{this.state.modalStudent.qualification}</Col>
                            </Row>
                            <Row>
                                <Col sm={3}>Contact</Col>
                                <Col sm={9}>{this.state.modalStudent.contact}</Col>
                            </Row>
                            <Row>
                                <Col sm={3}>Recent Grade</Col>
                                <Col sm={9}>{this.state.modalStudent.recentGrade}</Col>
                            </Row>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='info' onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </Container>
            ) : (
                    <LoadingPage />
                )
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getStudentsFromFB: () => dispatch(startGetStudents()),
    }
};


const mapStateToProps = (state) => {
    return {
        studentsArray: state.studentsData.students,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewStudents);