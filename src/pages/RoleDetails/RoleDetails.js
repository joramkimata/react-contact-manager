import { useQuery } from "@apollo/client";
import { ArrowBack, Info } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Divider } from "antd";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import FAB from "../../components/FAB/FAB";
import RolePermissionsManagerUi from "../../components/RolePermissionsManagerUi/RolePermissionsManagerUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { GET_ROLE } from "../Roles/graphQL";

const RoleDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const { loading, data } = useQuery(GET_ROLE, {
    variables: {
      uuid,
    },
    fetchPolicy: "network-only",
  });

  return (
    <>
      <TitleBoxUi
        title={data && data.getRole.name}
        icon={data ? <Info /> : null}
      >
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBack />
        </IconButton>
      </TitleBoxUi>
      {loading && <LinearProgress />}

      {data && (
        <>
          <Paper elevation={5} sx={{ padding: 2, mt: 2, mb: 2 }}>
            <div className="row">
              <div className="col-6">
                <Typography variant="h6">Name</Typography>
                <Divider />
                <Chip label={data.getRole.name} />
              </div>
              <div className="col-6">
                <Typography variant="h6">Display Name</Typography>
                <Divider />
                <Chip label={data.getRole.displayName} />
              </div>
            </div>
          </Paper>

          <RolePermissionsManagerUi
            permissionsGroups={
              data.getAllPermissionsGroupedByPermissionGroupName
            }
            getPermissions={(perms) => console.log(perms)}
          />

          <FAB onClick={() => alert()} title="Assign Permissions" />
        </>
      )}
    </>
  );
};

export default RoleDetails;
