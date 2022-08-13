import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import ProfileAddressForm from './ProfileAddress';
const Profile = (props) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [imageUploaded, setImageUploaded] = useState(false);
    const handleEdit = e => {
        e.preventDefault();
        setShowEditForm(true);
    };
    const loadFile = e =>{
        e.preventDefault();
        var image = document.getElementById("output");
        image.src = URL.createObjectURL(e.target.files[0]);
        setImageUploaded(true)
    }
    const handleDeleteProfileImage = e =>{
        e.preventDefault();
        var image = document.getElementById("output");
        image.src = "";
        props.deleteProfilePicture();
        setImageUploaded(false);
    };
    const handleUpload = e =>{
        e.preventDefault();
        var image = document.getElementById("output");
        props.updateProfilePicture(image.src);
        setImageUploaded(false);
    };
    const handleSubmit = formValues => {
        props.updateProfileAddress(formValues);
        setShowEditForm(false);
    };
    useEffect(() => {
        // code to run on component mount
        props.getProfileDetails();
    }, []);
    if (props.profileDetailsUpdateRequired && !props.loading) {
        props.getProfileDetails();
    }
    return (
        <div>
            {!props.loading && props.userProfile ?
                <div className='mt-5 d-flex container'>
                    <div className='p-2 mt-5 w-30'>
                        <div className='p-2 m-5'>
                                <div className="profile-pic">
                                    <label className="-label" htmlFor="file">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera" viewBox="0 0 16 16">
  <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
  <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg>
                                        <span>Change Image</span>
                                    </label>
                                    <input id="file" type="file" onChange={loadFile} />
                                    {props.userProfile.profile.profileImage ?
                            
                                    <img alt='profileImage' src={props.userProfile.profile.profileImage} id="output" width="200" />
                                    :
                                    <img alt='profileImage' className='avatar avatar-128 bg-light rounded-circle text-white p-2'
                            src='https://raw.githubusercontent.com/twbs/icons/main/icons/person-fill.svg' id="output" width="200" />
                                    }
                                </div>
                        </div>
                        <div className='p-2 mt-5'>
                            <button type='button' onClick ={handleDeleteProfileImage} className='btn text-white btn-warning' disabled={!props.userProfile.profile.profileImage ? true : false}>Delete Image</button>
                            <button type='button' onClick ={handleUpload} className='ms-5 btn btn-primary' disabled={!imageUploaded ? true: false}>Upload</button>
                        </div>
                    </div>
                    <div className='p-2 mt-5 w-50'>
                        <div className='card-body m-5'>
                            <div className='mt-5 d-flex'>
                                <div className='w-50'>
                                    <span className='card-text'>First Name</span>
                                    <h5 className='card-title'>{props.userProfile.profile.firstName}</h5>
                                </div>
                                <div className='w-50'>
                                    <span className='card-text'>Last Name</span>
                                    <h5 className='card-title'>{props.userProfile.profile.lastName}</h5>
                                </div>
                            </div>
                            <div className='mt-3'>
                                <span className='card-text'>Email</span>
                                <h5 className='card-title'>{props.userProfile.profile.email}</h5>
                            </div>
                            <div className='mt-3'>
                                <span className='card-text'>Phone</span>
                                <h5 className='card-title'>5021234567</h5>
                            </div>
                            <div className='mt-3'>
                                <span className='card-text'>Interests</span>
                                <h5 className='card-title'>Apple, Samsung, Laptops</h5>
                            </div>
                            {!showEditForm ?
                                <div className='mt-5 d-flex'>
                                    <div className='w-50'>
                                        <span className='card-text'>Address</span>
                                        {
                                            props.userProfile.profile.address.streetAddress ?
                                                <h5 className='card-title'> {props.userProfile.profile?.address?.streetAddress},{props.userProfile.profile?.address?.city},{props.userProfile.profile?.address?.state}</h5>
                                                : <h5 className='card-title'> - </h5>
                                        }
                                    </div>
                                    <div className='w-50'>
                                        <button type='button' className='btn btn-primary float-end' onClick={handleEdit}>Edit</button>
                                    </div>
                                </div>
                                :
                                <ProfileAddressForm userProfile={props.userProfile} handleSubmit={handleSubmit} />}
                        </div>
                    </div>
                </div> : ''}
        </div>)
};
function mapState(state) {
    const { loading } = state.userProfileDetails;
    const { userProfile, profileDetailsUpdateRequired } = state.userProfileDetails;
    return { loading, userProfile, profileDetailsUpdateRequired };
}

const actionCreators = {
    getProfileDetails: userActions.getUserProfile,
    updateProfileAddress: userActions.updateProfileAddress,
    updateProfilePicture: userActions.updateProfilePicture,
    deleteProfilePicture: userActions.deleteProfilePicture,
};

const connectedProfile = connect(mapState, actionCreators)(Profile);
export { connectedProfile as Profile };