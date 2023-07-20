import { Navigate } from "react-router-dom";
import { auth } from "./firebase-config/firebase-config";

function Protected({ children }) {
 
  const isSignedIn = auth.currentUser;

  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  } 
  
  return children;
}
export default Protected;