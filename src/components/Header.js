import React from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogoutAction } from '../actions/auth';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink as BSNavLink,
    Container,
} from 'reactstrap';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <div>
                <Navbar color="primary" dark expand="md">
                    <Container>
                        <NavbarBrand to="/dashboard" exact={true} tag={NavLink}>Campus Recruitment System</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <BSNavLink to="/dashboard" exact={true} tag={NavLink}> Dashboard</BSNavLink>
                                </NavItem>
                                {
                                    (this.props.userType === 'student') ?
                                        (
                                            <NavItem>
                                                <BSNavLink to="/studentProfile" exact={true} tag={NavLink}> View Profile</BSNavLink>
                                            </NavItem>
                                        ) :
                                        undefined
                                }

                                {
                                    (this.props.userType === 'company') ?
                                        (
                                            <NavItem>
                                                <BSNavLink to="/createJob" exact={true} tag={NavLink}> Create Job</BSNavLink>
                                            </NavItem>
                                        ) :
                                        undefined
                                }

                                {
                                    (this.props.userType === 'company' || this.props.userType === 'admin') ?
                                        (
                                            <NavItem>
                                                <BSNavLink to="/viewStudents" exact={true} tag={NavLink}> View Students</BSNavLink>
                                            </NavItem>
                                        ) :
                                        undefined
                                }
                                
                                <NavItem>
                                    <BSNavLink to="/viewJobs" exact={true} tag={NavLink}> View Jobs</BSNavLink>
                                </NavItem>
                                <NavItem>
                                    <BSNavLink href='' onClick={this.props.startLogoutAction}> Logout </BSNavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startLogoutAction: () => dispatch(startLogoutAction()),
    };
};


const mapStateToProps = (state) => {
    return {
        userType: state.auth.userType,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Header);








