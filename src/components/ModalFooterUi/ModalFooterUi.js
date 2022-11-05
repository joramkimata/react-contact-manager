import { Save } from "@mui/icons-material";
import { Button, CircularProgress, Divider } from "@mui/material";
import { Box } from "@mui/system";
import { Space } from "antd";
import React from "react";

const ModalFooterUi = ({ onCancel, loading = false }) => {
  return (
    <>
      <Divider sx={{ mt: 3 }} />
      <div className="d-flex flex-row-reverse">
        <Space size="middle">
          <Button
            onClick={onCancel}
            color="error"
            size="medium"
            variant="contained"
          >
            Cancel
          </Button>

          <Box sx={{ m: 1, position: "relative" }}>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              startIcon={<Save />}
              size="medium"
              sx={{ backgroundColor: "#434670" }}
            >
              Save
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </Space>
      </div>
    </>
  );
};

export default ModalFooterUi;
