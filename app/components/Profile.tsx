import React from 'react'

const Profile = ({profileImagePath,firstName,lastName,email}) => {
  return (
    <>
             <div className='personal-main'>
              <img src={profileImagePath} alt="Profile" className="w-20 h-20 rounded-full object-cover" />
              <div>
                <h5>{firstName} {lastName}</h5>
                <p>{email}</p>
              </div>
            </div>
    </>
  )
}

export default Profile
