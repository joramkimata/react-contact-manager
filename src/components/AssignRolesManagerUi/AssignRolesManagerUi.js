import { useMutation } from "@apollo/client";
import { Save } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ASSIGN_ROLES, GET_USER } from "../../pages/UserDetails/graphQL";
import { GET_ALL_USERS } from "../../pages/Users/graphQL";
import { showToastTop } from "../../utils/helpers";

const AssignRolesManagerUi = ({ roles, myRoles, userUuid, closeModal }) => {
  const [rolesUuids, setRolesUuids] = useState([]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const [assignRolesx] = useMutation(ASSIGN_ROLES, {
    refetchQueries: [GET_ALL_USERS, GET_USER],
    onCompleted: (data) => {
      setLoading(false);
      showToastTop(`Successfully saved`, false);
      closeModal();
    },
    onError: (error) => {
      setLoading(false);
    },
  });

  const assignRoles = () => {
    setLoading(true);
    assignRolesx({
      variables: {
        input: {
          userUUID: userUuid,
          roleUUIDs: [...rolesUuids],
        },
      },
    });
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      if (!rolesUuids.includes(e.target.value)) {
        rolesUuids.push(e.target.value);
        setRolesUuids(rolesUuids);
      }
    } else {
      if (rolesUuids.includes(e.target.value)) {
        const index = rolesUuids.indexOf(e.target.value);
        if (index > -1) {
          rolesUuids.splice(index, 1);
          setRolesUuids(rolesUuids);
        }
      }
    }

    if (rolesUuids.length > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  useEffect(() => {
    const rolex = [];

    roles?.forEach((r) => {
      myRoles?.forEach((mr) => {
        if (r.uuid === mr.uuid) {
          rolex.push(r.uuid);
        }
      });
    });

    if (rolex.length > 0) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setRolesUuids(rolex);
  }, [roles, myRoles]);

  return (
    <>
      <Box sx={{}}>
        {loading && <LinearProgress />}

        <Divider sx={{ mt: 2, mb: 2 }} />

        <div className="row">
          {roles?.map((r, i) => {
            const myRolesUuids = myRoles?.map((r) => r.uuid) ?? [];

            return (
              <div key={i} className="col-3">
                <FormControlLabel
                  control={
                    <Checkbox
                      value={r.uuid}
                      onChange={handleChange}
                      defaultChecked={myRolesUuids.includes(r.uuid)}
                    />
                  }
                  label={`${r.name}`}
                />
              </div>
            );
          })}
        </div>
        <Divider sx={{ mt: 2, mb: 2 }} />

        <Button
          disabled={visible || loading}
          onClick={() => assignRoles()}
          variant="contained"
          color="inherit"
          startIcon={<Save />}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
};

export default AssignRolesManagerUi;
