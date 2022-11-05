import { ExpandMoreRounded } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const RolePermissionsManagerUi = ({ permissionsGroups, getPermissions }) => {
  const [permissions, setPermissions] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      if (!permissions.includes(e.target.value)) {
        permissions.push(e.target.value);
        setPermissions(permissions);
        getPermissions(permissions);
      }
    } else {
      if (permissions.includes(e.target.value)) {
        const index = permissions.indexOf(e.target.value);
        if (index > -1) {
          permissions.splice(index, 1);
          setPermissions(permissions);
          getPermissions(permissions);
        }
      }
    }
  };

  useEffect(() => {
    const permissions = [];

    permissionsGroups.forEach((g) => {
      g.permissions.forEach((p) => {
        if (p.belongToThisRole) {
          permissions.push(p);
        }
      });
    });

    setPermissions(permissions.map((p) => p.uuid));
  }, [permissionsGroups]);

  return (
    <>
      {permissionsGroups.map((g, i) => (
        <>
          <Accordion expanded>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}>
              <Typography>{`${i + 1}. ${g?.permissionGroupName}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ ml: 3 }}>
                <div className="row">
                  {g.permissions.map((p, i) => (
                    <div className="col-3">
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={p.uuid}
                            onChange={handleChange}
                            defaultChecked={p.belongToThisRole}
                          />
                        }
                        label={`${p.name}`}
                      />
                    </div>
                  ))}
                </div>
              </Box>
            </AccordionDetails>
          </Accordion>
        </>
      ))}
    </>
  );
};

export default RolePermissionsManagerUi;
