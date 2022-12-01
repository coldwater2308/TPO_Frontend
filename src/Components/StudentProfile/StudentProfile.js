import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import KeyPair from "../KeyPair/KeyPair";
import Page from "../Page/Page";
import { useProfile } from "./StudentProfile.hooks";

function StudentProfile() {
  const { data } = useProfile();
  const linkStack = useHistory();
  const [isEditMode, setIsEditMode] = useState(true);
  console.log(data);
  return (
    <Page
      heading={"Profile"}
      actionText="Edit Profile"
      onAction={() => linkStack.push("/student/edit-profile")}
    >
          <Card>
        <KeyPair label="Name" value={data?.name} />
      </Card>
      <Card>
        <KeyPair label="email" value={data?.email} />
      </Card>
      <Card>
        <KeyPair label="Roll Number" value={data?.rollNo} />
      </Card>
      <Card>
        <KeyPair label="Phone Number" value={data?.phoneNo} />
      </Card>
      <Card>
        <KeyPair label="Batch" value={2019} />
      </Card>
      <Card>
        <KeyPair label="Batch" value={data?.branchId?.code} />
      </Card>
      <Card>
        <KeyPair label="Phone Number" value={data?.phoneNo} />
      </Card>
      {/* <Card>
        <KeyPair label="Phone Number" value={data?.phoneNo} />
      </Card> */}
  

  
    </Page>
  );
}

export default StudentProfile;
