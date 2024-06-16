import {useEffect, useState} from "react";
import {User} from "../types/user";
import axios from "axios";
import {getJwtToken} from "../auth/auth";
import { useParams } from 'react-router-dom';

const UserPage = () => {
    const { id } = useParams();

    const [profileData, setProfileData] = useState<User>({
        id: 0,
        email: "",
        password: "",
        username: "",
        age: 0,
        gender: "",
        experience: "",
        education: "",
        preferences: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {

            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
                    headers: {
                        Authorization: 'Bearer ' + getJwtToken(),
                    },
                });
                setProfileData(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="profile-page">
            <h1>User Profile</h1>
            {profileData ? (
                <div className="profile-details">
                    <h2><strong>Username:</strong> {profileData.username}</h2>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>Age:</strong> {profileData.age}</p>
                    <p><strong>Gender:</strong> {profileData.gender}</p>
                    <p><strong>Experience:</strong> {profileData.experience}</p>
                    <p><strong>Education:</strong> {profileData.education}</p>
                    <p><strong>Preferences:</strong> {profileData.preferences}</p>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
}


export default UserPage;