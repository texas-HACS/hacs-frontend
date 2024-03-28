import React, { useEffect, useState } from "react";
import config from "../../_config";
import OfficerEdit from "./OfficerEdit";
import MemberOfTheWeekEdit from "./MemberOfTheWeekEdit";
import EventEdit from "./EventEdit";
import JobEdit from "./JobEdit";
import ScholarshipEdit from "./ScholarshipEdit";
import SignInLinkEdit from "./SignInLinkEdit";
import SliderEdit from "./SliderEdit";
import useEffectNoInitialRender from "../../hooks/useEffectNoInitialRender";
import EventAPI from "../../api/event";
import JobAPI from "../../api/job";
import QRCodeManager from "../QRCode/QRCodeManager";
import ScholarshipAPI from "../../api/scholarship";
import FamiliaEdit from "./FamiliaEdit";
import PointSystemEdit from "./PointSystemEdit";
import InstagramEdit from "./InstagramEdit";
import SponsorEdit from "./SponsorEdit";
import PackageEdit from "./PackageEdit";

// import SliderApi from "../../api/slider"; // not working would need to check heroku!

function AdminPanel(props) {
  const [data, setData] = useState(props.data);
  const [uData, setUData] = useState(null);
  const [opps, setOpps] = useState(props.opportunities);
  const [uOpps, setUOpps] = useState(null);
  const [events, setEvents] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [scholarships, setScholarships] = useState(null);
  const [images, setImages] = useState(null);
  const [selected, setSelected] = useState(null);

  // Redundant? We already get this info from the props passed in. Might be to allow updates to show
  useEffect(() => {
    fetch(config.url + "/siteContent", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // probably still not used
  useEffect(() => {
    fetch(config.url + "/opportunities", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          data = { jobs: {} };
        }
        setOpps(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // these assign the data from the api to the corresponding variables
  useEffect(() => {
    events ?? EventAPI.list().then((eData) => setEvents(eData));
  }, []);

  useEffect(() => {
    jobs ?? JobAPI.list().then((jData) => setJobs(jData));
  }, []);

  useEffect(() => {
    scholarships ??
      ScholarshipAPI.list().then((sData) => setScholarships(sData));
  }, []);

  useEffect(() => {
    images ??
      // SliderApi.list().then((iData) => setImages(iData));
      setImages({...data.slider});
  }, []);

  // These useEffects are used to update the data stored in firebase when changes are made
  useEffectNoInitialRender(() => {
    if (uData == null) {
      return;
    }

    props.user
      .getIdToken(true)
      .then((idToken) => {
        fetch(config.url + "/siteContent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify(uData),
        });
      })
      .then(() => {
        setUData(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [uData]);

  useEffectNoInitialRender(() => {
    if (images == null) {
      return;
    }

    setData({...data, slider: images});
    setUData({...data, slider: images});
  }, [images])
  // probably not used since replaced by api files
  useEffectNoInitialRender(() => {
    if (uOpps == null) {
      return;
    }

    props.user
      .getIdToken(true)
      .then((idToken) => {
        fetch(config.url + "/opportunities", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: idToken,
          },
          body: JSON.stringify(uOpps),
        });
      })
      .then(() => {
        setUOpps(null);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [uOpps]);

  // these functions will update the frontend when changes are made and saved
  const updateOfficer = (officerData) => {
    let updating = { ...data };
    updating.officers[officerData.uid] = officerData;
    setData(updating);
    setUData(updating);
  };

  const deleteOfficer = (uid) => {
    let updating = { ...data };
    if (updating.officers?.[uid] != null) {
      delete updating.officers[uid];
    }
    setData(updating);
    setUData(updating);
  };

  const updateSignInLink = (linkData) => {
    let updating = { ...data };
    updating.redirects.signInLink = linkData;
    setData(updating);
    setUData(updating);
  };

  const updateMemberOfTheWeek = (linkData) => {
    let updating = { ...data };
    updating.memberOfTheWeek = linkData;
    setData(updating);
    setUData(updating);
  };

  // not used
  const updateOpp = (oppType, oppData) => {
    let updating = { ...opps };
    if (!updating[oppType]) {
      updating[oppType] = {};
    }
    updating[oppType][oppData.uid] = oppData;
    setOpps(updating);
    setUOpps(updating);
  };

  // not used
  const deleteOpp = (oppType, uid) => {
    let updating = { ...opps };
    if (updating[oppType]?.[uid] != null) {
      delete updating[oppType][uid];
    }
    setOpps(updating);
    setUOpps(updating);
  };

  const updateFamilia = (familiaData) => {
    let updating = {...data};
    if (updating.familiasContent.familias !== undefined) {
      updating.familiasContent.familias[familiaData.uid] = familiaData
    } else {
      let uid = familiaData.uid
      let familias = {}
      familias[uid] = familiaData
      updating.familiasContent = {...updating.familiasContent, familias:{...familias}}
    }
    setData(updating);
    setUData(updating);
  }

  const deleteFamilia = (uid) => {
    let updating = {...data};
    if (updating.familiasContent?.familias?.[uid] != null) {
      delete updating.familiasContent.familias[uid];
    }
    setData(updating);
    setUData(updating);
  }

  const updatePoints = (pointData) => {
    let updating = {...data};
    updating.familiasContent.points[pointData.uid] = pointData;
    setData(updating);
    setUData(updating);
  }

  const deletePoints = (uid) => {
    let updating = {...data};
    if (updating.familiasContent.points?.[uid] != null) {
      delete updating.familiasContent.points[uid];
    }
    setData(updating);
    setUData(updating);
  }

  const updateBonus = (bonusData) => {
    let updating = {...data};
    updating.familiasContent.bonus = bonusData;
    setData(updating);
    setUData(updating);
  }

  const updatePosts = (postData) => {
    let updating = {...data};
    updating.posts[postData.uid] = postData;
    setData(updating);
    setUData(updating);
  }

  const updateSponsor = (sponsorData) => {
    let updating = {...data};
    console.log(sponsorData);
    if (updating.sponsorContent.sponsors !== undefined) {
      updating.sponsorContent.sponsors[sponsorData.uid] = sponsorData
    } else {
      let uid = sponsorData.uid
      let sponsors = {}
      sponsors[uid] = sponsorData
      updating.sponsorContent = {...updating.sponsorContent, sponsors:{...sponsors}}
      console.log(updating);
    }
    setData(updating);
    setUData(updating);
  }

  const deleteSponsor = (uid) => {
    let updating = {...data};
    if (updating.sponsorContent?.sponsors?.[uid] != null) {
      delete updating.sponsorContent.sponsors[uid];
    }
    setData(updating);
    setUData(updating);
  }

  const updatePackage = (packageData) => {
    let updating = {...data};
    console.log(packageData);
    if (updating.sponsorContent.packages !== undefined) {
      updating.sponsorContent.packages[packageData.uid] = packageData
    } else {
      let uid = packageData.uid
      let packages = {}
      packages[uid] = packageData
      updating.sponsorContent = {...updating.sponsorContent, packages:{...packages}}
      console.log(updating);
    }
    setData(updating);
    setUData(updating);
  }

  const deletePackage = (uid) => {
    let updating = {...data};
    if (updating.sponsorContent?.packages?.[uid] != null) {
      delete updating.sponsorContent.packages[uid];
    }
    setData(updating);
    setUData(updating);
  }

  const submitSignout = () => {
    props.signoutUser();
  };

  // setting up the various elements that allow editing on the admin page
  const signInLinkEdit =
    data.redirects.signInLink !== undefined ? (
      <SignInLinkEdit
        data={data.redirects.signInLink}
        handleUpdate={updateSignInLink}
      />
    ) : null;

  const officersEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Officers</h2>
      {data.officers !== undefined
        ? Object.keys(data.officers)
            ?.sort((a_uid, b_uid) => {
              return data.officers[a_uid].order - data.officers[b_uid].order
            })
            .map((uid) => (
              <OfficerEdit
                id={uid}
                key={uid}
                data={data.officers[uid]}
                handleUpdate={updateOfficer}
                handleDelete={deleteOfficer}
              />
            ))
        : null}
      <OfficerEdit
        addNew
        handleUpdate={updateOfficer}
        handleDelete={deleteOfficer}
        data={{}}
      />
    </div>
  );

  const memberOfTheWeekEdit =
    data.memberOfTheWeek !== undefined ? (
      <MemberOfTheWeekEdit
        data={data.memberOfTheWeek}
        handleUpdate={updateMemberOfTheWeek}
      />
    ) : null;

  const instagramEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Instagram Feed</h2>
      {data.posts !== undefined
        ? Object.keys(data.posts)
          .sort((a, b) => {
            return new Date(data.posts[b].date) - new Date(data.posts[a].date)
          })
          .map((uid) => (
            <InstagramEdit
              id={uid}
              key={uid}
              data={data.posts[uid]}
              handleUpdate={updatePosts}
            />
          ))
        : null
      } 
    </div>
  );

  const familiasEdit = (
    <div className="admin-group">
    <h2 className="admin-group-title">Familias</h2>
    {data.familiasContent.familias !== undefined
      ? Object.keys(data.familiasContent.familias)
          .map((uid) => (
            <FamiliaEdit
              id={uid}
              key={uid}
              data={data.familiasContent.familias[uid]}
              handleUpdate={updateFamilia}
              handleDelete={deleteFamilia}
            />
          ))
      : null}
    <FamiliaEdit
      addNew
      handleUpdate={updateFamilia}
      handleDelete={deleteFamilia}
      data={{}}
    />  
    <h2 className="admin-group-title">Point System</h2> 
    {data.familiasContent.points !== undefined 
      ? Object.keys(data?.familiasContent?.points)
        .map((uid) => (
          <PointSystemEdit
            id={uid}
            key={uid}
            data={data?.familiasContent?.points[uid]}
            handleUpdate={updatePoints}
            handleDelete={deletePoints}
          />
        ))
    : null}
    <PointSystemEdit
      bonus
      id={"bonus"}
      key={"bonus"}
      data={data?.familiasContent?.bonus}
      handleUpdate={updateBonus}
    />
    <PointSystemEdit
      addNew
      handleUpdate={updatePoints}
      handleDelete={deletePoints}
      data={{}}
    />
  </div>
  );

  const sponsorEdit = (
    <div className="admin-group">
    <h2 className="admin-group-title">Sponsors</h2>
    {data.sponsorContent.sponsors !== undefined
      ? Object.keys(data.sponsorContent.sponsors)
          .map((uid) => (
            <SponsorEdit
              id={uid}
              key={uid}
              data={data.sponsorContent.sponsors[uid]}
              handleUpdate={updateSponsor}
              handleDelete={deleteSponsor}
            />
          ))
      : null}
    <SponsorEdit
      addNew
      handleUpdate={updateSponsor}
      handleDelete={deleteSponsor}
      data={{}}
    />  
    <h2 className="admin-group-title">Sponsor Packages</h2> 
    {data.sponsorContent.packages !== undefined
      ? Object.keys(data.sponsorContent.packages)
          .map((uid) => (
            <PackageEdit
              id={uid}
              key={uid}
              data={data.sponsorContent.packages[uid]}
              handleUpdate={updatePackage}
              handleDelete={deletePackage}
            />
          ))
      : null}
    <PackageEdit
      addNew
      handleUpdate={updatePackage}
      handleDelete={deletePackage}
      data={{}}
    />
  </div>
  );
      
  var eventsEdit, jobsEdit, scholarshipsEdit, sliderEdit;

  const rerenderEvents = (data) => setEvents({ ...events, [data.uid]: data });
  const deleteEvent = (uid) => {
    let updatedEvents = { ...events };
    delete updatedEvents[uid];
    setEvents(updatedEvents);
  };
  eventsEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Events</h2>
      {events
        ? Object.keys(events)
            .map((uid) => events[uid])
            .sort((a, b) => {
              // Sort in descending order of date
              return new Date(b.startTime) - new Date(a.startTime);
            })
            .map((e) => (
              <EventEdit
                id={e.uid}
                key={e.uid}
                data={e}
                user={props.user}
                handleUpdate={rerenderEvents}
                handleDelete={deleteEvent}
              />
            ))
        : null}
      <EventEdit addNew user={props.user} handleUpdate={rerenderEvents} />
    </div>
  );

  const rerenderScholarhsips = (data) =>
    setScholarships({ ...scholarships, [data.uid]: data });
  const deleteScholarship = (uid) => {
    let updatedScholarships = { ...scholarships };
    delete updatedScholarships[uid];
    setScholarships(updatedScholarships);
  };
  scholarshipsEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Scholarship Opportunities</h2>
      {scholarships
        ? Object.keys(scholarships)
            .map((uid) => scholarships[uid])
            .sort((a, b) => {
              return new Date(b.startTime) - new Date(a.startTime);
            })
            .map((s) => (
              <ScholarshipEdit
                id={s.uid}
                key={s.uid}
                data={s}
                user={props.user}
                handleUpdate={rerenderScholarhsips}
                handleDelete={deleteScholarship}
              />
            ))
        : null}
      <ScholarshipEdit
        addNew
        user={props.user}
        handleUpdate={rerenderScholarhsips}
      />
    </div>
  );

  const rerenderJobs = (data) => setJobs({ ...jobs, [data.uid]: data });
  const deleteJob = (uid) => {
    let updatedJobs = { ...jobs };
    delete updatedJobs[uid];
    setJobs(updatedJobs);
  };
  jobsEdit = (
    <div className="admin-group">
      <h2 className="admin-group-title">Job Postings</h2>
      {jobs
        ? Object.keys(jobs)
            .map((uid) => jobs[uid])
            .sort((a, b) => {
              return new Date(b.startTime) - new Date(a.startTime);
            })
            .map((j) => (
              <JobEdit
                id={j.uid}
                key={j.uid}
                data={j}
                user={props.user}
                handleUpdate={rerenderJobs}
                handleDelete={deleteJob}
              />
            ))
        : null}
      <JobEdit addNew user={props.user} handleUpdate={rerenderJobs} />
    </div>
  );

  const rerenderImages = (data, newImage) => {
    if (newImage &&  data.order > Object.keys(images).length) {
      setImages({...images, [data.uid]: data})
    } else {
      let imgs = {...images}
      let sorted = Object.keys(images)
        .map((uid) => images[uid])
        ?.sort((a_uid, b_uid) => {
          return a_uid?.order - b_uid?.order
        })
      let count = 1;
      for (let item of sorted) {
        if (data.uid != item.uid) {
          if (count == data.order) {
            count += 1;
          }
          item.order = count;
          count += 1;
          setImages({...imgs, [item.uid]: item})
        }
      }
      setImages({...imgs, [data.uid]: data})
    }

  };
  const deleteImage = (uid) => {
    let updatedImages = {...images};
    delete updatedImages[uid];
    let count = 1;
    let sorted = Object.keys(updatedImages)
    .map((uid) => updatedImages[uid])
    ?.sort((a_uid, b_uid) => {
      return a_uid?.order - b_uid?.order
    })
    for (let item of sorted) {
      if (item.order != count) {
        item.order = count;
        setImages({...updatedImages, [item.uid]: item})
      }
      count += 1;
    }
    setImages({...updatedImages})
    setSelected(null)
  };
  const handleSelect = (e) => {
    let uid = e.target.id;
    if (!selected) {
      setSelected(images[uid]);
      e.target.style.filter = "brightness(50%)";
    } else if (selected?.uid == uid) {
      setSelected(null);
      e.target.style.filter = "brightness(100%)";
    } else {
      document.getElementById(selected.uid).style.filter = "brightness(100%)";
      setSelected(images[uid]);
      e.target.style.filter = "brightness(50%)";
    }
  }
  sliderEdit =
  <div className="admin-group">
  <h2 className="admin-group-title" style={{marginBottom:0}}>Image Slider</h2>
  <div className="flex-row carousel">
  {images
    ? Object.keys(images)
      ?.map((uid) => images[uid])
      ?.sort((a_uid, b_uid) => {
        return a_uid?.order - b_uid?.order
      })
      ?.map((i) => (
      // will need to adjust sizing
        <div>
          <p style={{textAlign:"center"}}>{i.order + ". " + i.alt}</p>
          <img src={i?.image?.url} alt={i?.alt} id={i?.uid} key={i?.uid} className="image" onClick={handleSelect}/>
        </div>
      ))
    : null}
  </div>
  {selected
    ? <SliderEdit
            id={selected?.uid}
            key={selected?.uid}
            data={selected}
            user={props.user}
            handleUpdate={rerenderImages}
            handleDelete={deleteImage}
          />
    : null
  }
  <SliderEdit addNew user={props.user} handleUpdate={rerenderImages} />
  </div>

  return (
    <div className="admin-panel">
      {signInLinkEdit}
      {/* TODO: Add ability to drag and drop ordering to enforce indices. */}
      {officersEdit}
      {memberOfTheWeekEdit}
      {instagramEdit}
      {familiasEdit}
      {sponsorEdit}
      {sliderEdit}
      <div className="opportunities-edit flex-row">
        {eventsEdit}
        {jobsEdit}
        {scholarshipsEdit}
        {/* move position of slider edit to look nicer */} 
      </div>
      <div className="button-container flex-row">
        <button className="btn btn-primary" onClick={submitSignout}>
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
