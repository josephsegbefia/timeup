import { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Message } from "semantic-ui-react";
import axios from "axios";

const API_URL = "https://timeapp-w9z5.onrender.com";

const VerifyEmail = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const emailToken = searchParams.get("emailToken");

  useEffect(() => {
    (async () => {
      if (user?.isVerified) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        if (emailToken) {
          setIsLoading(true);
          axios
            .post(`${API_URL}/auth/verify-email`, { emailToken })
            .then((response) => {
              setIsLoading(false);
              updateUser(response.data);
              navigate("/login");
            })
            .catch((error) => {
              setError(error);
            });
        }
      }
    })();
  }, [emailToken, user]);

  return (
    <div>
      {isLoading ? (
        <Message positive>
          <p>Loading....</p>
        </Message>
      ) : (
        <div>
          {user?.isVerified ? (
            <Message positive>
              <p>Email is verified</p>
            </Message>
          ) : (
            <div>
              {error.error ? (
                <Message negative>
                  <p>Email is not verified</p>
                </Message>
              ) : null}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
