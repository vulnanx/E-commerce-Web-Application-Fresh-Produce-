"use client";
import AdminNavBar from "@/components/AdminNavBar";
import Footer from "@/components/Footer"
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function AccountPage() {
  const { userId } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      // No user id yet, maybe show loading or do nothing
      setLoading(false);
      setError("You must be logged in as admin to view accounts.");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getAllUsers?uid=${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (Array.isArray(data)) {
          const filteredUsers = data.map((user) => ({
            uid: user._id,
            email: user.email,
          }));
          setAccounts(filteredUsers);
          setError(null);
        } else if (data.message) {
          setError(data.message);
          setAccounts([]);
        } else {
          setError("Unexpected response format");
          setAccounts([]);
        }
      } catch (err) {
        setError(err.message);
        setAccounts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [userId]);

  if (loading) return <div className="p-6">Loading users...</div>;
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>;

  return (
    <div className="bg-[#ECEDE4] w-full min-h-[100vh]">
      <AdminNavBar />
      <div className="flex justify-center my-8">
        <div className="w-[60vw] bg-white border border-gray-300 rounded-md shadow-md p-6">
          {/* Header */}
          <div className="flex mb-4 text-xl font-extrabold text-gray-900">
            <div className="w-1/2">Account Number</div>
            <div className="w-1/2">Email</div>
          </div>

          {/* User Rows */}
          {accounts.length === 0 ? (
            <div>No users found.</div>
          ) : (
            accounts.map(({ uid, email }) => (
              <div key={uid} className="flex mb-4 items-center space-x-6">
                <div className="flex-1 font-bold text-lg text-gray-800">{uid}</div>
                <div className="flex-1 font-bold text-lg text-gray-800">{email}</div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
