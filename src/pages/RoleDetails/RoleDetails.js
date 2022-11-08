import { useMutation, useQuery } from "@apollo/client";
import { ArrowBack, Info } from "@mui/icons-material";
import {
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Divider } from "antd";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FAB from "../../components/FAB/FAB";
import HasPermissionUi from "../../components/HasPermissionUi/HasPermissionUi";
import RolePermissionsManagerUi from "../../components/RolePermissionsManagerUi/RolePermissionsManagerUi";
import TitleBoxUi from "../../components/TitleBoxUi/TitleBoxUi";
import { promptBox, showToastTop } from "../../utils/helpers";
import { ASSIGN_PERMISSIONS, GET_ALL_ROLES, GET_ROLE } from "../Roles/graphQL";

const RoleDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [permx, setPermx] = useState([]);
  const [isSubmit, setSubmit] = useState(false);

  const { loading, data } = useQuery(GET_ROLE, {
    variables: {
      uuid,
    },
    fetchPolicy: "network-only",
  });

  const [assignPerms] = useMutation(ASSIGN_PERMISSIONS, {
    refetchQueries: [GET_ALL_ROLES],
    onCompleted: (data) => {
      showToastTop(`Successfully updated`, false);
      setSubmit(false);
    },
    onError: (error) => {
      setSubmit(false);
    },
  });

  const assignPermissions = () => {
    promptBox(() => {
      setSubmit(true);
      assignPerms({
        variables: {
          input: {
            roleUUID: uuid,
            permissionUUIDs: permx,
          },
        },
      });
    }, ``);
  };

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
          <HasPermissionUi permission={"VIEW_PERMISSIONS"}>
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

            {isSubmit && <LinearProgress />}
            <RolePermissionsManagerUi
              permissionsGroups={
                data.getAllPermissionsGroupedByPermissionGroupName
              }
              getPermissions={(perms) => setPermx(perms)}
            />
          </HasPermissionUi>

          <HasPermissionUi permission={"ASSIGN_ROLE_PERMISSIONS"}>
            <FAB onClick={assignPermissions} title="Assign Permissions" />
          </HasPermissionUi>
        </>
      )}
    </>
  );
};

export default RoleDetails;
