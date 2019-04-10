import React from "react";
import "./OrganizationForm.scss"
import Banner from "./Banner";
import * as organizationService from "../services/organization-service";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faEdit } from '@fortawesome/free-solid-svg-icons'


const initialValues = {
    id: 0,
    name: '',
    url: '',
    logo: '',
    mission: '',
    description: '',
    street: '',
    suite: '',
    city: '',
    state: '',
    zip: '',
    latitude: '',
    longitude: '' ,
    phone: '',
    email: ''
}

class OrganizationView extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.id = props.match.params.id || 0;
        this.state = {
            org: initialValues,
        }
    }

    componentDidMount(){
        if(this.id){
            organizationService.get(this.id)
            .then(resp => {
                this.id = resp.id;
                this.setState({org: resp});
            })
        }
    }

    createDescription = function(description){
        return {__html: description}
    }
    
    render(){
        const {org} = this.state;
        const descr = '<div>' + org.description + '</div>';
        return (
            <React.Fragment>
                <Banner titleUpper="Organizations" titleLower="Involved" imageName="city" />
                <div style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "1em"}} >
                    <h1 >{org.name}</h1>
                    <div>
                        <a 
                            href={org.url} 
                            target="_blank"
                            rel="noopener noreferrer" style={{color: "blue", textDecoration: "underline"}}>
                            {org.url}
                        </a>
                    </div>
                    
                    <blockquote style={{width: "80%", fontSize: "1.2em"}}><em>{org.mission}</em></blockquote>
                    <div style={{width: "90%"}} dangerouslySetInnerHTML={this.createDescription(descr)}></div>
                    <div  style={{margin: "1em 0 0 0"}}>
                        {`${org.street} ${org.suite}`}
                    </div>
                    <div  style={{margin: "0 0 0.5em 0"}}>
                        {`${org.city}, ${org.state}  ${org.zip}`}
                    </div>
                    <div style={{margin: "0.5em"}}><FontAwesomeIcon icon={faPhone} style={{marginRight: "0.5em"}}/>{org.phone}</div>
                    <div style={{margin: "0.5em"}}><FontAwesomeIcon icon={faEnvelope}  style={{marginRight: "0.5em"}}/>{org.email}</div>
                <a href={`/organizations/${org.id}`} style={{color: "green"}}><FontAwesomeIcon icon={faEdit}/></a>
                </div>
            </React.Fragment>
        )
    }

}

export default OrganizationView