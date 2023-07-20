import { Form, Button, Spinner } from "react-bootstrap";
import { format } from "date-fns";
import "./Home.css";
import { useState, useEffect } from "react";
import { db } from "./firebase-config/firebase-config";
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import ViewJob from "./Viewjob";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadSearch, setLoadSearch] = useState(false);
  const [search, setSearch] = useState(false);
  const [filter, setFilter] = useState({
    type: "Full Time",
    location: "In Office",
  });

  function handleChange(e) {
    let name = e.currentTarget.name;
    let value = e.currentTarget.value;
    setFilter((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  }
  const fetchData = async () => {
    setSearch(false);
    const q = query(collection(db, "jobs"), orderBy("postedOn", "desc"));
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    let tempJobs = [];
    querySnapshot.forEach((doc) => {
      tempJobs.push({
        ...doc.data(),
        id: doc.id,
        postedOn: doc.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = async () => {
    setSearch(true);
    setLoadSearch(true);
    const q = query(
      collection(db, "jobs"),
      where("location", "==", filter.location),
      where("type", "==", filter.type),
      orderBy("postedOn", "desc")
    );
    const querySnapshot = await getDocs(q);
    // console.log(querySnapshot);
    let tempJobs = [];
    querySnapshot.forEach((doc) => {
      tempJobs.push({
        ...doc.data(),
        id: doc.id,
        postedOn: doc.data().postedOn.toDate(),
      });
    });
    setJobs(tempJobs);
    setLoadSearch(false);
  };

  return (
    <section className="homeBg">
      <div className="homeContainer">
        <h2>List of Jobs Posted</h2>
        <div className="filter">
          <div>
            <Form.Select
              className="workType"
              name="type"
              value={filter.type}
              onChange={handleChange}
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </Form.Select>
          </div>
          <div>
            <Form.Select
              className="workType"
              name="location"
              value={filter.location}
              onChange={handleChange}
            >
              <option value="In Office">In Office</option>
              <option value="Remote">Remote</option>
            </Form.Select>
          </div>
          <Button variant="primary" onClick={filtered}>
            {loadSearch ? (
              <Spinner
                animation="grow"
                size="sm"
                style={{ color: "blueviolet" }}
              />
            ) : (
              "Search"
            )}
          </Button>
        </div>
        <main>
          {loading && (
            <div className="text-center">
              <div
                className="spinner-grow"
                style={{ color: "blueviolet" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {search && (
            <div className="d-flex justify-content-center">
              <button onClick={fetchData} className="filterBtn">
                Clear filters
              </button>
            </div>
          )}
          {jobs.map((job) => {
            return (
              <div key={job.id} className="container jobList">
                {/* //remove container class */}
                <div className="row">
                  <div className="col text-start">
                    <p>{job.title}</p>
                    <p id="company">{job.companyName}</p>
                  </div>
                  <div className="col text-center">
                    {job.skills.map((skill) => {
                      return (
                        <p key={skill} className="skill">
                          {skill}{" "}
                        </p>
                      );
                    })}
                  </div>
                  <div className="col text-end">
                    <p>
                      {format(job.postedOn, "dd-MM-yyyy")} | {job.type} |{" "}
                      {job.location}
                    </p>
                    <ViewJob job={job} />
                  </div>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </section>
  );
}

export default Home;
