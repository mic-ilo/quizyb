import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./model/providers/authprovider";
import AuthGuard from "./components/AuthGuard";

//controller
import HomepageController from "./controller/HomepageController";
import AuthController from "./controller/AuthController";
import UserController from "./controller/UserController";
import PlayerDashboardController from "./controller/PlayerDashboardController";
import BuilderDashboardController from "./controller/BuilderDashboardController";
import BuilderQuizFormController from "./controller/BuilderQuizFormController";
import UserProfileController from "./controller/UserProfileController";
import PlayerQuizPageController from "./controller/PlayerQuizPageController";

//routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageController />,
  },
  {
    path: "/login",
    element: <AuthController />,
  },
  {
    path: "/signup",
    element: <UserController />,
  },
  {
    path: "/userprofile",
    element: (
      <AuthGuard>
        <UserProfileController />,
      </AuthGuard>
    ),
  },
  {
    path: "/player/dashboard",
    element: (
      <AuthGuard>
        <PlayerDashboardController />, 
      </AuthGuard>
    ),
  },
  {
    path: "/builder/dashboard",
    element: (
      <AuthGuard>
        <BuilderDashboardController />,
      </AuthGuard>
    ),
  },
  {
    path: "/builder/quizform",
    element: (
      <AuthGuard>
        <BuilderQuizFormController />,
      </AuthGuard>
    ),
  },
  {
    path: "/player/quizpage",

    element: (
      <AuthGuard>
        <PlayerQuizPageController />,
      </AuthGuard>
    ),
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;
