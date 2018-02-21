import React from 'react';
import { Container, Table, Button } from 'reactstrap';
import LoadingPage from './LoadingPage';
import { connect } from 'react-redux';
import { startGetJobs } from '../actions/jobs';
import database from '../firebase/firebase';


class ViewJobs extends React.Component {
    state = {
        loaded: false,
    }

    componentDidMount() {
        this.props.getJobsFromFB();
        this.setState(() => ({
            loaded: true,
        }))
    }

    removeJob(key) {
        database.ref(`jobs/${key}`).remove();
    };


    render() {
        return (
            this.state.loaded ? (
                <Container>
                    <Table className="py-3">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Job Title</th>
                                <th>Job Description</th>
                                <th>No of Vacancies</th>
                                <th>Employer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.jobsArray.map((data, i) => {
                                    return (
                                        <tr key={data.key}>
                                            <th scope="row">{i + 1}</th>
                                            <td>{data.jobTitle}</td>
                                            <td>{data.jobDescription}</td>
                                            <td>{data.vacancies}</td>
                                            <td>{data.companyName}</td>
                                            <td>{
                                                (this.props.userType === 'admin' || this.props.currentUser === data.userEmail) ? (
                                                    <Button color='danger' onClick={() => this.removeJob(data.key)}>
                                                        Delete
                                                    </Button>
                                                ) : (
                                                        <Button color='primary'>
                                                            Apply
                                                    </Button>
                                                    )}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            ) : (
                    <LoadingPage />
                )
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getJobsFromFB: () => dispatch(startGetJobs()),
    }
};


const mapStateToProps = (state) => {
    return {
        jobsArray: state.jobs.jobs,
        userType: state.auth.userType,
        currentUser: state.auth.authUserData.userEmail,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewJobs);