import React from 'react';
import { Container, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const DashboardPage = (props) => {
    return (
        <Container className="text-center">
            {
                (props.userType !== "student") ? (
                    <div>
                        <Button color="info" block className="py-5 my-5" tag={Link} to='/viewStudents'>
                            View Students
                        </Button>
                        <Button color="info" block className="py-5 my-5" tag={Link} to='/viewJobs'>
                            View Jobs
                        </Button>
                        <Button color="info" block className="py-5 my-5" tag={Link} to='/createJob'>
                            Create Job
                        </Button>
                    </div>
                ) : (
                        <div>

                            <Button color="info" block className="py-5 my-5" tag={Link} to='/viewJobs'>
                                View Jobs
                            </Button>
                            <Button color="info" block className="py-5 my-5" tag={Link} to='/studentProfile'>
                                View Profile
                            </Button>
                        </div>
                    )
            }
        </Container>
    )
};

const mapStateToProps = (state) => {
    return {
        userType: state.auth.userType,
    }
};

export default connect(mapStateToProps)(DashboardPage);