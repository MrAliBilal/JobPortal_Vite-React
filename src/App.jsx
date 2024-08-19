import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  json
} from "react-router-dom"

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import NotFoundPage from "./pages/NotFoundPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";





const App = () => {

  const addjob = async (newJob) => {
    const res = await fetch ('api/jobs', {
      method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },

        body: JSON.stringify(newJob),
    });
    return;
  }

  const deleteJob = async (id) => {
    const res = await fetch (`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  } 

  const updateJob = async (job) => {
    const res = await fetch (`/api/jobs/${job.id}`, {
      method: 'PUT',
        headers: {
          'Content-Type' : 'application/json',
        },

        body: JSON.stringify(job),
    });
    return;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout/>}>
        <Route index element={< HomePage />} />
        <Route path="/jobs" element = {<JobsPage/>}/>
        <Route path="/jobs/:id" element = {<JobPage deleteJob= { deleteJob } />} loader={jobLoader} />
        <Route path="*" element = {<NotFoundPage/>}/>
        <Route path="/add-job" element = {<AddJobPage addJobSubmit = {addjob} />}  />
        <Route path="/edit-job/:id" element = {<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App