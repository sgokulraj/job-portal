import { Button, Spinner } from "react-bootstrap";
import "./Job.css";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase-config/firebase-config";

const skills = [
  "JavaScript",
  "Python",
  "MongoDB",
  "React.js",
  "Angular",
  "Node.js",
  "Django",
];
function Jobs() {
  const [skillsReq, setSkillsReq] = useState([]);
  const [skillsErr, setSkillsErr] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(skillsReq);

  function addSkill(skill) {
    if (skillsReq.includes(skill)) {
      let newSkill = skillsReq.filter((s) => s !== skill);
      setSkillsReq(newSkill);
    } else {
      let newSkill = [...skillsReq];
      newSkill.push(skill);
      setSkillsReq(newSkill);
    }
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  useEffect(() => {
    setLoading(false);
    reset();
  }, [isSubmitSuccessful, reset]);

  const validation = {
    title: {
      required: {
        value: true,
        message: "* required",
      },
    },
    type: {
      required: {
        value: true,
        message: "required",
      },
    },
    companyName: {
      required: {
        value: true,
        message: "required",
      },
    },
    companyUrl: {
      required: {
        value: true,
        message: "required",
      },
    },
    location: {
      required: {
        value: true,
        message: "required",
      },
    },
    experience: {
      required: {
        value: true,
        message: "required",
      },
    },
    description: {
      required: {
        value: true,
        message: "required",
      },
    },
  };
  return (
    <div className="jobContainer">
      <h2>Post Job</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          if (skillsReq.length) {
            setSkillsErr(false);
            setLoading(true);
            let jobDetails = {
              ...data,
              skills: skillsReq,
              postedOn: serverTimestamp(),
            };
            console.log(jobDetails);
            const newJobRef = doc(collection(db, "jobs"));
            await setDoc(newJobRef, jobDetails);
          } else {
            setSkillsErr(true);
          }
        })}
      >
        <div className="row">
          <div className="form-floating mb-3 col-6">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="title"
              placeholder="Job Title *"
              {...register("title", validation.title)}
            />
            <label htmlFor="floatingInput" className="mx-1">
              Job Title *
            </label>
            <p className="err">{errors.title && errors.title.message}</p>
          </div>

          <div className="form-floating col-6">
            <select
              className="form-select"
              id="floatingSelect"
              name="type"
              aria-label="Floating label select example"
              {...register("type", validation.type)}
            >
              {/* <option defaultValue="None">Choose Job Type</option> */}
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
            </select>
            <label htmlFor="floatingSelect" className="mx-1">
              Job Type *
            </label>
            <p className="err">{errors.type && errors.type.message}</p>
          </div>
          <div className="form-floating mb-3 col-6">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              name="companyName"
              placeholder="Comapany Name *"
              {...register("companyName", validation.companyName)}
            />
            <label htmlFor="floatingInput" className="mx-1">
              Company Name *
            </label>
            <p className="err">
              {errors.companyName && errors.companyName.message}
            </p>
          </div>
          <div className="form-floating mb-3 col-6">
            <input
              type="url"
              className="form-control"
              id="floatingInput"
              name="companyUrl"
              placeholder="Company URL *"
              {...register("companyUrl", validation.companyUrl)}
            />
            <label htmlFor="floatingInput" className="mx-1">
              Company URL *
            </label>
            <p className="err">
              {errors.companyUrl && errors.companyUrl.message}
            </p>
          </div>
          <div className="form-floating col-6">
            <select
              className="form-select"
              id="floatingSelect"
              name="location"
              aria-label="Floating label select example"
              {...register("location", validation.location)}
            >
              {/* <option defaultValue="None">Choose Job Location</option> */}
              <option value="In Office">In Office</option>
              <option value="Remote">Remote</option>
            </select>
            <label htmlFor="floatingSelect" className="mx-1">
              Job Location *
            </label>
            <p className="err">{errors.location && errors.location.message}</p>
          </div>
          <div className="form-floating mb-3 col-6">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              name="experience"
              placeholder="Experience in Yrs *"
              {...register("experience", validation.experience)}
            />
            <label htmlFor="floatingInput" className="mx-1">
              Experience in Yrs *
            </label>
            <p className="err">
              {errors.experience && errors.experience.message}
            </p>
          </div>
          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              placeholder="Job Description *"
              name="description"
              id="floatingTextarea"
              style={{ height: "100px" }}
              {...register("description", validation.description)}
            ></textarea>
            <label htmlFor="floatingTextarea" className="mx-1">
              Job Description *
            </label>
            <p className="err">
              {errors.description && errors.description.message}
            </p>
          </div>
          <div>
            <p>Skills *</p>
            {skills.map((skill) => {
              return (
                <p
                  key={skill}
                  className="skillJob"
                  onClick={() => addSkill(skill)}
                >
                  {skill}{" "}
                </p>
              );
            })}
            {skillsErr && <p className="err">choose atleast one skill</p>}
          </div>
          <div className="text-end m-4 p-5">
            <Button
              type="submit"
              className="px-4"
              style={{ width: "100px" }}
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="grow" size="sm" style={{ color: "blueviolet" }} />
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Jobs;
