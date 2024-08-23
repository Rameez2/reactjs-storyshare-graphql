import { useState } from "react";
import { useMutation,gql } from '@apollo/client';
import styles from "../../styles/profile/changePassword.module.css";

const UPDATE_USER = gql`
mutation updateUser(
  $currentPassword: String
  $password: String
) {
  updateUser(
    currentPassword: $currentPassword
    password: $password
  ) {
    _id
    username
    email
  }
}

`;

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [updateUser, { loading, error }] = useMutation(UPDATE_USER);
    const token = localStorage.getItem("token");
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get user ID from localStorage or context

        try {
            const { data } = await updateUser({
                variables: { 
                    currentPassword, 
                    password: newPassword 
                },
                context: {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                },
            });

            if (data.updateUser) {
                // Optionally reset form fields
                setCurrentPassword('');
                setNewPassword('');
            }
        } catch (err) {
            console.error("Error updating password:", err);
            alert('Failed to update password, Please try again later.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Change Password</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required={true}
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required={true}
                />
                <button type="submit" disabled={loading}>Change Password</button>
            </form>
            {error && <p>Error: {error.message}</p>}
        </div>
    );
}
