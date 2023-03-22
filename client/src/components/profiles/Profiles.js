import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  const [searchValue, setSearchValue] = useState("");
  const [profilesByValue, setProfilesByValue] = useState([]);

  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const filterProfiles = () => {
    setProfilesByValue([]);
    profiles.map((profile) => {
      if (
        profile.user.name.toLowerCase().search(searchValue.toLowerCase()) !== -1
      ) {
        if (
          !profilesByValue.find((profileByValue) => profileByValue === profile)
        ) {
          setProfilesByValue((prev) => [...prev, profile]);
        }
      }
    });
  };

  useEffect(() => {
    filterProfiles();
  }, [searchValue]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <input
            className="search"
            placeholder="Find developer"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {searchValue !== "" ? (
            <div className="profiles">
              {profilesByValue.length > 0 ? (
                profilesByValue.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          ) : (
            <div className="profiles">
              {profiles.length > 0 ? (
                profiles.map((profile) => (
                  <ProfileItem key={profile._id} profile={profile} />
                ))
              ) : (
                <h4>No profiles found...</h4>
              )}
            </div>
          )}
        </Fragment>
      )}
    </section>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
