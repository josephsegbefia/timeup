import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

const VerifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken");

  useEffect(() => {
    if (user?.isVerified) {
      setTimeout(() => {
        return navigate("/login");
      }, 3000);
    } else {
      if (emailToken) {
        setIsLoading(true);
        axios
          .post(`${API_URL}/auth/verify-email`, { emailToken })
          .then((response) => {
            console.log("res", response.data);
            setIsLoading(false);
            updateUser(response.data);
          })
          .catch((error) => {
            setError(error);
          });
      }
    }
  }, [emailToken]);

  return (
    <div>
      {isLoading ? (
        <div>
          <p>Loading....</p>
        </div>
      ) : (
        <div>
          {user?.isVerified ? (
            <div>
              <p>Email is verified</p>
            </div>
          ) : (
            <div>
              {error.error ? (
                <div>
                  <p>Email is not verified</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
