import { useQuery } from "@apollo/client";
import { ExpandMoreRounded, InfoOutlined, ListAlt } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { Divider, Typography } from "antd";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AssignRolesManagerUi from "../../components/AssignRolesManagerUi/AssignRolesManagerUi";
import BackBtn from "../../components/BackBtn/BackBtn";
import ModalContainerUi from "../../components/ModalContainerUi/ModalContainerUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { GET_USER } from "./graphQL";

const UserDetails = () => {
  const [opened, setOpened] = useState(false);
  const { uuid } = useParams();
  const { loading, data } = useQuery(GET_USER, {
    variables: {
      uuid,
    },
  });

  return (
    <>
      <TitleBoxUi
        loading={loading}
        icon={<InfoOutlined />}
        title="User Details"
      >
        <BackBtn />
      </TitleBoxUi>
      {data && (
        <>
          <Paper sx={{ mt: 2, padding: 2, mb: 2 }}>
            <div className="row">
              <div className="col-4">
                <Typography variant="h6">Full Name</Typography>
                <Divider />
                <Chip label={data.getUser.fullName} />
              </div>
              <div className="col-4">
                <Typography variant="h6">Email</Typography>
                <Divider />
                <Chip label={data.getUser.email} />
              </div>
              <div className="col-4">
                <Typography variant="h6">Username</Typography>
                <Divider />
                <Chip label={data.getUser.username} />
              </div>
            </div>
          </Paper>
          <TitleBoxUi
            loading={loading}
            title={`${data.getUser.roles?.length} ROLES`}
          >
            <Button
              onClick={() => setOpened(true)}
              color="inherit"
              variant="outlined"
              startIcon={<ListAlt />}
            >
              Assign Roles
            </Button>
          </TitleBoxUi>
          <Divider />
          {data.getUser.roles.length === 0 && (
            <Alert severity="error" sx={{ mt: 2 }}>
              No Roles assigned to this user yet!
            </Alert>
          )}
          {data.getUser.roles.length > 0 &&
            data.getUser.roles.map((r, i) => (
              <Accordion expanded key={i}>
                <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                  <Typography>{`${i + 1}. ${r?.name}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ ml: 3 }}>
                    <div className="row">
                      {r.permissions.map((p, i) => (
                        <div key={i} className="col-3">
                          <FormControlLabel
                            control={<Checkbox disabled defaultChecked />}
                            label={`${p.name}`}
                          />
                        </div>
                      ))}
                    </div>
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          <ModalContainerUi
            visible={opened}
            top={400}
            width={800}
            title={`Assign Roles`}
            handleSubmit={() => null}
            onSubmit={() => null}
            onCancel={() => setOpened(false)}
          >
            <AssignRolesManagerUi
              myRoles={data.getUser.roles}
              roles={data.getRoles}
              closeModal={() => setOpened(false)}
              userUuid={data.getUser.uuid}
            />
          </ModalContainerUi>
        </>
      )}
    </>
  );
};

export default UserDetails;
